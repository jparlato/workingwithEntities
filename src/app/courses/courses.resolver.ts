import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

import {AppState} from '../reducers';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {areCoursesLoaded} from './courses.selectors';
import {loadAllCourses} from './course.actions';

@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(areCoursesLoaded),
                tap(coursesLoaded => {
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),
                first(),  // wait for one value to be emitted
                finalize(() => this.loading = false)
            );

    }

}
