import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleMap, Marker, Environment, GoogleMapOptions, GoogleMapsMapTypeId, GoogleMaps, GoogleMapsEvent, LatLng, GoogleMapsAnimation } from '@ionic-native/google-maps/ngx';
import { NavController, NavParams } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-localizacao-usuario',
  templateUrl: './localizacao-usuario.page.html',
  styleUrls: ['./localizacao-usuario.page.scss'],
})
export class LocalizacaoUsuarioPage implements OnInit {
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
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe(data => {
      if (!data) { return; }
      this.currentPosition(data.latitude, data.longitude);
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
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
        'mapToolbar': true     // android only
      },

      gestures: {
        scroll: true,
        tilt: true,
        zoom: true,
        rotate: true
      },
      draggable: true
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY);
  }

  currentPosition(latitude, longitude) {
    this.map.clear();
    this.localUsuario = null;

    const loc = new LatLng(latitude, longitude);

    this.map.moveCamera({
      target: loc,
      zoom: 18,
      tilt: 10
    });

    this.localUsuario = {
      latitude: latitude,
      longitude: longitude
    };

    this.originMaker = this.map.addMarkerSync({ position: loc, animation: GoogleMapsAnimation.BOUNCE, draggable: true });
  }

  onConfirmar() {
    this.navCtrl.back();
  }

}
