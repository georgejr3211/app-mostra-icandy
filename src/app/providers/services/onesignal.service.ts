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
    console.log('bateu aqui');
    this.oneSignal.startInit('1dc75a2b-ca7e-4491-88c5-31f80d73f522', '26412989148');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      console.log('sub 1');

      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      console.log('sub 2');

      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}
