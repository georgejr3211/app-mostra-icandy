import { Injectable } from '@angular/core';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private oneSignal: OneSignal) { }

  init() {
    this.oneSignal.startInit('80472705-93cd-4b34-a70c-6eff60c736bb', '26412989148');
    console.log('init');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      console.log('testando');
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      console.log('testando 2');

    });

    this.oneSignal.endInit();
  }
}


