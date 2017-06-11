import { Component } from '@angular/core';

import {initializeApp, database} from "firebase";

import { firebaseConfig } from "../environments/firebase.config";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/app.css']
})
export class AppComponent {
  title = 'app';

  courses$:FirebaseListObservable<any>;
  lesson$:FirebaseObjectObservable<any>;

  firstCourse:any;

  constructor(private db: AngularFireDatabase) {

    this.courses$ = db.list('courses');

    this.courses$.subscribe(console.log);

    this.lesson$ = db.object('allLessons/-KmBAzgv__YqcLpS4IXp');

    this.lesson$.subscribe(console.log);

    this.courses$.map(courses => courses[0])
      .subscribe(
        course => this.firstCourse = course
      );

  }

  listPush() {
    this.courses$.push({description: 'NEW TEST COURSE'})
      .then(
        () => console.log('List Push Done'),
        console.error
      );
  }

  listRemove() {
    this.courses$.remove(this.firstCourse)
      .then(
        () => console.log('List Item Removed'),
        console.error
      );
  }

  listUpdate() {
    this.courses$.update(this.firstCourse, {
      description: 'Description Modified'
    })
      .then(
        () => console.log('List Item Modified'),
        console.error
      );
  }

  objUpdate() {
    this.lesson$.update({url: 'URL Updated'})
      .then(
        () => console.log('Object Updated'),
        console.error
      );
  }

  objSet() {
    this.lesson$.set({url: 'URL Updated'})
      .then(
        () => console.log('Object Set'),
        console.error
      );
  };
}



