import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "../UI/user/user.component";
import { AdminComponent } from "../UI/admin/admin.component";
import { LoginComponent } from "../UI/login/login.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {ManageUsersComponent} from "../UI/manage-users/manage-users.component";
import { AddUserComponent } from 'src/UI/add-user/add-user.component';
import { PageNotFoundComponent } from 'src/UI/page-not-found/page-not-found.component';
import { ScrumMasterComponent } from 'src/UI/scrum-master/scrum-master.component';
import { ScrumMasterTasksComponent } from 'src/UI/scrum-master-tasks/scrum-master-tasks.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirects root URL to the LoginComponent
  { path: 'user', component: UserComponent, canActivate : [AuthenticationGuard]
 },
 { path: 'scrumMaster', component: ScrumMasterComponent },
 { path: 'scrumMasterTasks', component: ScrumMasterTasksComponent },
  { path: 'admin', component: AdminComponent,canActivate : [AuthenticationGuard], children : [
      { path: 'manageUsers', component: ManageUsersComponent },
      { path: 'addUsers', component: AddUserComponent}
    ] },
  { path: 'login', component: LoginComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
