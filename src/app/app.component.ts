import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushNotificationService } from './providers/services/push-notification.service';
import { Environment } from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: PushNotificationService,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {
    this.askToTurnOnGPS();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(9999, () => { });
    this.platform.ready().then(() => {

      this.geolocation.getCurrentPosition();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.push.init();
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      console.log('can', canRequest);
      // if (canRequest) {
      // the accuracy option will be ignored by iOS
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => this.geolocation.getCurrentPosition(),
        error => console.log('Error requesting location permissions', error)
      );
      // }

    });
  }



}
