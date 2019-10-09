import { Component, OnInit, NgZone } from '@angular/core';
import {
  GoogleMap,
  GoogleMapOptions,
  LocationService,
  Environment,
  GoogleMaps, GoogleMapsEvent, LatLng, GoogleMapsAnimation, GoogleMapsMapTypeId, Marker, Geocoder, ILatLng
} from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

  constructor(
    private geolocation: Geolocation,
    private ngZone: NgZone,
  ) {
    console.log(this.googleAutoComplete);
  }

  ngOnInit() {
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
        'compass': true,
        'myLocationButton': true,
        'myLocation': true,   // (blue dot)
        'indoorPicker': true,
        'zoom': true,          // android only
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
    this.currentPosition();
  }

  currentPosition() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then(res => {

        const loc = new LatLng(res.coords.latitude, res.coords.longitude);

        this.map.moveCamera({
          target: loc,
          zoom: 15,
          tilt: 10
        });

        this.originMaker = this.map.addMarkerSync({ position: loc, animation: GoogleMapsAnimation.BOUNCE, draggable: true });
      });
  }

  searchChanged() {
    if (!this.search.trim().length) return;

    this.googleAutoComplete.getPlacePredictions({ input: this.search }, res => {
      this.ngZone.run(() => {
        this.searchResults = res;
      });
    });

  }

  async goToAddress(item) {
    this.map.clear();

    this.search = '';
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: item.description
    }, (results, status) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const loc = new LatLng(lat, lng);

        this.map.moveCamera({
          target: loc,
          zoom: 15,
          tilt: 10
        });

        this.originMaker = this.map.addMarkerSync({ position: loc, animation: GoogleMapsAnimation.DROP, draggable: true });
      }
    });

  }

}
