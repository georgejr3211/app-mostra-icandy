import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushNotificationService } from './providers/services/push-notification.service';
import { Environment } from '@ionic-native/google-maps/ngx';

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
    private push: PushNotificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(9999, () => { });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.push.init();
    });
  }


}
