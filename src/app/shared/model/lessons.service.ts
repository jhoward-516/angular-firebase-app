import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";
import {Subject} from "rxjs/Subject";
import {FirebaseApp} from "angularfire2";

@Injectable()
export class LessonsService {

  sdkDB: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDB = fb.database().ref();
  }

  findAllLessons(): Observable<Lesson[]> {
    return this.db.list('lessons')
      .map(Lesson.fromJsonList);
  }

  findLessonByUrl(url: string): Observable<Lesson> {
    return this.db.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: url
      }
    })
      .map(results => Lesson.fromJson(results[0]));
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: lessonId,
        limitToFirst: 2
      }
    })
      .map(results => results[1].$key)
      .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonId,
        limitToLast: 2
      }
    })
      .map(results => results[0].$key)
      .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const lessonsToSave = Object.assign({}, lesson, {courseId})

    const newLessonKey = this.sdkDB.child('lessons').push().key;

    let dataToSave = {};

    dataToSave["lessons/" + newLessonKey] = lessonsToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDB.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }
}
