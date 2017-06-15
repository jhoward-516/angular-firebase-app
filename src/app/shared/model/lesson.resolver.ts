
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router"
import {Lesson} from "./lesson";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {LessonsService} from "./lessons.service";

@Injectable()
export class LessonResolver implements Resolve<Lesson> {

  constructor(private lessonService: LessonsService) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Lesson> {

    return this.lessonService
      .findLessonByUrl(route.params['id'])
      .first();
  }

}
