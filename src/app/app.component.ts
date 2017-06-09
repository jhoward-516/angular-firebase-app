import { Component } from '@angular/core';

import {initializeApp, database} from "firebase";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCJp5pUKFJH0FsbhHw2mwXlqGmn0vwA6cE",
      authDomain: "angular-firebase-app-39f22.firebaseapp.com",
      databaseURL: "https://angular-firebase-app-39f22.firebaseio.com",
      projectId: "angular-firebase-app-39f22",
      storageBucket: "angular-firebase-app-39f22.appspot.com",
      messagingSenderId: "145967499776"
    };

    initializeApp(config);

    let root = database().ref();

    root.on('value', function (snap) {
      console.log(snap.val());
    });

  }
}



