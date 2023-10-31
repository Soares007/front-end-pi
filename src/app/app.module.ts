import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
