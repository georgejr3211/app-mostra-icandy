import { Component, OnInit, NgZone } from '@angular/core';
import {
  GoogleMap,
  GoogleMapOptions,
  Environment,
  GoogleMaps, GoogleMapsEvent, LatLng, GoogleMapsAnimation, GoogleMapsMapTypeId, Marker, Geocoder, ILatLng
} from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { LocalizacoesPedidosService } from 'src/app/providers/services/localizacoes-pedidos.service';

declare const google: any;

@Component({
  selector: 'app-local-entrega',
  templateUrl: './local-entrega.page.html',
  styleUrls: ['./local-entrega.page.scss'],
})
export class LocalEntregaPage implements OnInit {

  map: GoogleMap;
  googleAutoComplete = new google.maps.places.AutocompleteService();
  googleDirectionsService = new google.maps.DirectionsService();
  geocoder = new google.maps.Geocoder();
  loading: any;
  search: string;
  searchResults = new Array<any>();
  originMaker: Marker;
  destination: any;

  localUsuario;
  constructor(
    private geolocation: Geolocation,
    private ngZone: NgZone,
    private navCtrl: NavController,
    private localizacaoPedidoService: LocalizacoesPedidosService,
    private loadingCtrl: LoadingController
  ) {
    console.log(this.googleAutoComplete);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde...' });
    await this.loading.present();

    Environment.setEnv({
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyCONimGXbVJHJVAvK7bJzaqU4RyXt0PVg4',
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyCONimGXbVJHJVAvK7bJzaqU4RyXt0PVg4'
    })
    const mapOptions: GoogleMapOptions = {
      mapType: GoogleMapsMapTypeId.ROADMAP,

      controls: {
        'compass': false,
        'myLocationButton': false,
        'myLocation': true,   // (blue dot)
        'indoorPicker': true,
        'zoom': false,          // android only
        'mapToolbar': true,     // android only
      },

      gestures: {
        scroll: true,
        tilt: true,
        zoom: true,
        rotate: true
      },
      draggable: false
    };

    this.map = GoogleMaps.create('map', mapOptions);
    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.currentPosition();
    } catch (error) {
      console.log(error);
    }
  }

  async currentPosition() {
    try {
      this.map.clear();
      this.localUsuario = null;

      this.geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(res => {

          const loc = new LatLng(res.coords.latitude, res.coords.longitude);

          this.map.moveCamera({
            target: loc,
            zoom: 18,
            tilt: 10
          });

          this.localUsuario = {
            latitude: res.coords.latitude,
            longitude: res.coords.longitude
          };

          this.originMaker = this.map.addMarkerSync({ position: loc, animation: GoogleMapsAnimation.BOUNCE, draggable: true });
          this.loading.dismiss();

        });
    } catch (error) {
      console.log(error)
    } finally {
    }

  }

  searchChanged() {
    if (!this.search.trim().length) return;

    this.googleAutoComplete.getPlacePredictions({ input: this.search }, res => {
      this.ngZone.run(() => {
        this.searchResults = res;
      });
    });

  }

  onConfirmar() {
    localStorage.setItem('user/localizacao', JSON.stringify(this.localUsuario));
    this.localizacaoPedidoService.addLocalizacao(this.localUsuario);
    this.navCtrl.back();
    // this.modalCtrl.dismiss({ localUsuario: this.localUsuario });
  }


}
