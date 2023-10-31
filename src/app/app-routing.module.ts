import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TypeAccessComponent } from './login/type-access/type-access.component';
import { LoginCoordinatorComponent } from './login/login-coordinator/login-coordinator.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { TeacherManagerComponent } from './coordinator/manager/teacher-manager/teacher-manager.component';
import { UserInfoComponent } from './coordinator/manager/teacher-manager/user-info/user-info.component';
import { FormNewTeacherComponent } from './coordinator/manager/teacher-manager/form-new-teacher/form-new-teacher.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'type-access', component: TypeAccessComponent },
  { path: 'login-coordinator', component: LoginCoordinatorComponent },
  { path: 'access-coordinator', component: CoordinatorComponent},
  { path: 'teacher-manager', component: TeacherManagerComponent},
  { path: 'user-info', component: UserInfoComponent },
  { path: 'form-new-teacher', component: FormNewTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
