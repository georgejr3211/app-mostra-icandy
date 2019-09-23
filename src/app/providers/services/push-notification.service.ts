import { Injectable } from '@angular/core';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private oneSignal: OneSignal) { }

  init() {
    this.oneSignal.startInit('61f5011f-5ec8-4a73-9cc1-1aef1b298b0c', '26412989148');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened

    });

    this.oneSignal.endInit();
  }

  sendMessage(userId, message) {
    this.oneSignal.getIds()
      .then(data => {
        // '01d17a8c-2988-43a9-b549-c163cfe9fc27', 
        // const userId = data.userId;
        this.oneSignal.postNotification({
          include_player_ids: [userId],
          contents: {
            en: message
          }
        });
      });
  }
}


