import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from '../UI/user/user.component';
import { AdminComponent } from '../UI/admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from '../UI/login/login.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { ManageUsersComponent } from '../UI/manage-users/manage-users.component';
import { AddUserComponent } from '../UI/add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../UI/page-not-found/page-not-found.component';
import { ScrumMasterComponent } from 'src/UI/scrum-master/scrum-master.component';
import { ScrumMasterTasksComponent } from 'src/UI/scrum-master-tasks/scrum-master-tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    ManageUsersComponent,
    AddUserComponent,
    PageNotFoundComponent,
    ScrumMasterComponent,
    ScrumMasterTasksComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, FormsModule,
    ReactiveFormsModule,RouterModule,
    
  ],
  providers: [{provide : HTTP_INTERCEPTORS , useClass: AppHttpInterceptor , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
