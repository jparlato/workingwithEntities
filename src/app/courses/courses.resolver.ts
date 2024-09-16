import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ResolveFn } from '@angular/router';
import {Store, select} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {areCoursesLoaded} from './courses.selectors';
import {loadAllCourses} from './course.actions';
import { AppState } from '../reducers/index';

@Injectable()
export const CoursesResolver: ResolveFn<any> =


    (route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> => {
        let loading = false;

        const store = inject(Store<AppState>);
        return store
            .pipe(
                select(areCoursesLoaded),
                tap(coursesLoaded => {
                    if (!loading && !coursesLoaded) {
                        loading = true;
                        store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),  // this is needed, the tap above where we
                      // get the courses loaded, will cause the observable to terminate/emit...
                      // we need to terminate/emit only after the courses loaded flag is true, thus we
                      // add this filter.
                first(),  // wait for one value to be emitted
                finalize(() => loading = false)
            );

    }
