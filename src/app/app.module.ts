import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TypeAccessComponent } from './login/type-access/type-access.component';
import { LoginCoordinatorComponent } from './login/login-coordinator/login-coordinator.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { TeacherManagerComponent } from './coordinator/manager/teacher-manager/teacher-manager.component';
import { UserInfoComponent } from './coordinator/manager/teacher-manager/user-info/user-info.component';
import { FormNewTeacherComponent } from './coordinator/manager/teacher-manager/form-new-teacher/form-new-teacher.component';
import { DisciplineManagerComponent } from './coordinator/manager/discipline-manager/discipline-manager.component';
import { HistoryRequestComponent } from './coordinator/manager/history-request/history-request.component';
import { DisciplineInfoComponent } from './coordinator/manager/discipline-manager/discipline-info/discipline-info.component';
import { FormNewDisciplineComponent } from './coordinator/manager/discipline-manager/form-new-discipline/form-new-discipline.component';
import { CpfFormatPipe } from './cpf-format.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { CapitalizeWordsPipe } from './capitalize-words.pipe';
import { CourseManagerComponent } from './coordinator/manager/course-manager/course-manager.component';
import { FormNewCourseComponent } from './coordinator/manager/course-manager/form-new-course/form-new-course.component';
import { CourseInfoComponent } from './coordinator/manager/course-manager/course-info/course-info.component';
import { TeamManagerComponent } from './coordinator/manager/team-manager/team-manager.component';
import { FormNewTeamComponent } from './coordinator/manager/team-manager/form-new-team/form-new-team.component';
import { TeamInfoComponent } from './coordinator/manager/team-manager/team-info/team-info.component';
import { SchedulingManagerComponent } from './coordinator/manager/scheduling-manager/scheduling-manager.component';
import { FormNewSchedulingComponent } from './coordinator/manager/scheduling-manager/form-new-scheduling/form-new-scheduling.component';
import { SchedulingInfoComponent } from './coordinator/manager/scheduling-manager/scheduling-info/scheduling-info.component';
import { RoomManagerComponent } from './coordinator/manager/room-manager/room-manager.component';
import { FormNewRoomComponent } from './coordinator/manager/room-manager/form-new-room/form-new-room.component';
import { RoomInfoComponent } from './coordinator/manager/room-manager/room-info/room-info.component';
import { TimeManagerComponent } from './coordinator/manager/time-manager/time-manager.component';
import { FormNewTimeComponent } from './coordinator/manager/time-manager/form-new-time/form-new-time.component';
import { TimeInfoComponent } from './coordinator/manager/time-manager/time-info/time-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TypeAccessComponent,
    LoginCoordinatorComponent,
    CoordinatorComponent,
    TeacherManagerComponent,
    UserInfoComponent,
    FormNewTeacherComponent,
    DisciplineManagerComponent,
    HistoryRequestComponent,
    DisciplineInfoComponent,
    FormNewDisciplineComponent,
    CpfFormatPipe,
    DateFormatPipe,
    CapitalizeWordsPipe,
    CourseManagerComponent,
    FormNewCourseComponent,
    CourseInfoComponent,
    TeamManagerComponent,
    FormNewTeamComponent,
    TeamInfoComponent,
    SchedulingManagerComponent,
    FormNewSchedulingComponent,
    SchedulingInfoComponent,
    RoomManagerComponent,
    FormNewRoomComponent,
    RoomInfoComponent,
    TimeManagerComponent,
    FormNewTimeComponent,
    TimeInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
