import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(private oneSignal: OneSignal) {
    
  }

  init() {
    this.oneSignal.startInit('2f4bca6b-b91e-4f14-b653-384c34774481', '26412989148');

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
