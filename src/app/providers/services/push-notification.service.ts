import { Injectable } from '@angular/core';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private oneSignal: OneSignal) { }

  init() {
    this.oneSignal.startInit('71f90043-e77c-4037-a62a-bcce5f50e60d', '26412989148');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened

    });

    this.oneSignal.endInit();
  }
}


