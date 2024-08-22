import {Course, compareCourses} from './model/course';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import {Lesson, compareLessons} from './model/lesson';
import {RouterModule, Routes} from '@angular/router';

import {CommonModule} from '@angular/common';
import {CourseComponent} from './course/course.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {CoursesEffects} from './courses.effects';
import {CoursesHttpService} from './services/courses-http.service';
import {CoursesResolver} from './courses.resolver';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {EffectsModule} from '@ngrx/effects';
import {HomeComponent} from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {coursesReducer} from './reducers/course.reducers';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
        courses: CoursesResolver
    }

  },
  {
    path: ':courseUrl',
    component: CourseComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    EffectsModule.forFeature([CoursesEffects]), // list of effects files if 1 or more
    StoreModule.forFeature("courses", coursesReducer) // identify the store ('courses' and the reducer.)
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
      CoursesResolver
  ]
})
export class CoursesModule {

  constructor() {

  }


}
