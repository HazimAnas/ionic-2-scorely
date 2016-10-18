import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    const fbConf = {
    apiKey: "AIzaSyCgus8xLyN6gz-Nzr0y81_1XXWP02Vf_sE",
    authDomain: "scorely-9029a.firebaseapp.com",
    databaseURL: "https://scorely-9029a.firebaseio.com",
    storageBucket: "scorely-9029a.appspot.com",
    messagingSenderId: "66757883024"
};
firebase.initializeApp(fbConf);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
