import * as fromCourses from './reducers/course.reducers';

import {createFeatureSelector, createSelector} from '@ngrx/store';

import {CoursesState} from './reducers/course.reducers';

// access adapter



// access to adaptor from ngrx entities


export const selectCoursesState =
    createFeatureSelector<CoursesState>("courses");



export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll  // using the adapter here to select all, otherwise we would have to access the
      // the array of ids and dictionary of courses and select using those two collections... messy.
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,  // composition - using selectCoursesState
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);


export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
);

export const {selectAll} = fromCourses.adapter.getSelectors();
 // access to the adapter and getting one selector to export.
