import { TeamInfoComponent } from './coordinator/manager/team-manager/team-info/team-info.component';
import { TeamManagerComponent } from './coordinator/manager/team-manager/team-manager.component';
import { FormNewTeamComponent } from './coordinator/manager/team-manager/form-new-team/form-new-team.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TypeAccessComponent } from './login/type-access/type-access.component';
import { LoginCoordinatorComponent } from './login/login-coordinator/login-coordinator.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { TeacherManagerComponent } from './coordinator/manager/teacher-manager/teacher-manager.component';
import { UserInfoComponent } from './coordinator/manager/teacher-manager/user-info/user-info.component';
import { FormNewTeacherComponent } from './coordinator/manager/teacher-manager/form-new-teacher/form-new-teacher.component';
import { HistoryRequestComponent } from './coordinator/manager/history-request/history-request.component';
import { DisciplineManagerComponent } from './coordinator/manager/discipline-manager/discipline-manager.component';
import { DisciplineInfoComponent } from './coordinator/manager/discipline-manager/discipline-info/discipline-info.component';
import { FormNewDisciplineComponent } from './coordinator/manager/discipline-manager/form-new-discipline/form-new-discipline.component';
import { CourseManagerComponent } from './coordinator/manager/course-manager/course-manager.component';
import { FormNewCourseComponent } from './coordinator/manager/course-manager/form-new-course/form-new-course.component';
import { CourseInfoComponent } from './coordinator/manager/course-manager/course-info/course-info.component';
import { SchedulingManagerComponent } from './coordinator/manager/scheduling-manager/scheduling-manager.component';
import { FormNewSchedulingComponent } from './coordinator/manager/scheduling-manager/form-new-scheduling/form-new-scheduling.component';
import { SchedulingInfoComponent } from './coordinator/manager/scheduling-manager/scheduling-info/scheduling-info.component';
import { RoomManagerComponent } from './coordinator/manager/room-manager/room-manager.component';
import { FormNewRoomComponent } from './coordinator/manager/room-manager/form-new-room/form-new-room.component';
import { RoomInfoComponent } from './coordinator/manager/room-manager/room-info/room-info.component';
import { TimeManagerComponent } from './coordinator/manager/time-manager/time-manager.component';
import { FormNewTimeComponent } from './coordinator/manager/time-manager/form-new-time/form-new-time.component';
import { TimeInfoComponent } from './coordinator/manager/time-manager/time-info/time-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'type-access', component: TypeAccessComponent },
  { path: 'login-coordinator', component: LoginCoordinatorComponent },
  { path: 'access-coordinator', component: CoordinatorComponent},
  { path: 'teacher-manager', component: TeacherManagerComponent},
  { path: 'user-info/:id', component: UserInfoComponent },
  { path: 'teacherDetails/:id', component: FormNewTeacherComponent },
  { path: 'createTeacher', component: FormNewTeacherComponent },
  { path: 'discipline-manager', component: DisciplineManagerComponent },
  { path: 'discipline-info/:id', component: DisciplineInfoComponent },
  { path: 'disciplineDetails/:id', component: FormNewDisciplineComponent },
  { path: 'createDiscipline', component: FormNewDisciplineComponent },
  { path: 'history-request', component: HistoryRequestComponent },
  { path: 'course-manager', component: CourseManagerComponent},
  { path: 'course-info/:id', component: CourseInfoComponent },
  { path: 'courseDetails/:id', component: FormNewCourseComponent },
  { path: 'team-info/:id', component: TeamInfoComponent },
  { path: 'teamDetails/:id', component: FormNewTeamComponent },
  { path: 'createCourse', component: FormNewCourseComponent },
  { path: 'createTeam', component: FormNewTeamComponent },
  { path: 'team-manager', component: TeamManagerComponent},
  { path: 'team-info/:id', component: TeamInfoComponent },
  { path: 'scheduling-manager', component: SchedulingManagerComponent },
  { path: 'createScheduling', component: FormNewSchedulingComponent },
  { path: 'schedulingDetails/:id', component: FormNewSchedulingComponent },
  { path: 'scheduling-info/:id', component: SchedulingInfoComponent },
  { path: 'room-manager', component: RoomManagerComponent },
  { path: 'createRoom', component: FormNewRoomComponent },
  { path: 'room-info/:id', component: RoomInfoComponent },
  { path: 'roomDetails/:id', component: FormNewRoomComponent },
  { path: 'time-manager', component: TimeManagerComponent },
  { path: 'createTime', component: FormNewTimeComponent },
  { path: 'time-info/:id', component: TimeInfoComponent },
  { path: 'timeDetails/:id', component: FormNewTimeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
