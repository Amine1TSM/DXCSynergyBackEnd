import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from "../../app/Services/Login/login.service";
import { Router } from "@angular/router";
import { ManageUserService } from 'src/app/Services/manageUser/manage-user.service';
import { Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {



  users: any[] = [];
  searchedUsers: any[] = [];
  selectedUser: any;
  isSearchModalOpen = false;
  showSuccessModal = false;
  usersPage: any;
  formLogin! : FormGroup;
  constructor(
    public loginService: LoginService,
    public manageUserService: ManageUserService,
    private http: HttpClient,
    private fb : FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.showPageUsers();
    this.formLogin=this.fb.group({
      role : this.fb.control(""),
      phone: this.fb.control(['',Validators.required ,Validators.pattern(/^\d{10}$/)]),
      familyStatus: this.fb.control(""),
      workStatus: this.fb.control(""),
      teamAcronyme: this.fb.control(""),
      description: this.fb.control("")

    })
  }

  
  // Show all users in a page
  //know the number of pages
  getPageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index);
  }
//change the page function
  changePage(pageNumber: number) {
    this.http.get(`http://localhost:8081/identity-service/user/allUsers/pageUsers?page=${pageNumber}`).subscribe(
      (data) => {
        console.log(data);
        this.usersPage = data;
        // Process the received data (e.g., update UI, display users)
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }

  //get the users form the page
  showPageUsers() {
    this.http.get('http://localhost:8081/identity-service/user/allUsers/pageUsers?page=0').subscribe(
      (data) => {
        console.log(data);
        this.usersPage=data
        // Process the received data (e.g., update UI, display users)
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }












//delete users functionnality///
//select the user from the table who will be deleted
setSelectedUser(email : string) {
  this.selectedUser=email;
  console.log(this.selectedUser)
  }
//delete function
deleteUser(email: string): void {
  console.log(email)
  this.manageUserService.deleteUser(email).subscribe(
    () => {
      console.log(`User '${email}' deleted successfully.`);
      this.showPageUsers(); 
      this.selectedUser=undefined;
      Swal.fire("L'utilisateur a été supprimé avec succès");

    },
    (error) => {
      console.log(`Error deleting user '${email}':`, error);
    }
  );
}


//open the delete modal//
openDeleteModal(email: string): void {
  this.selectedUser = email;
}



  ///Search Users functionnality//
  searchUsers(keyword: string): void {
    const apiUrl = `http://localhost:8081/identity-service/user/searchUsers?keyword=${keyword}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (users) => {
        this.searchedUsers = users;
        this.usersPage=users
        this.users=users;
        console.log(users);
      },
      error: (error) => {
        console.log('Error searching users:', error);
      }
    });
  }

    //details of a user modal////
    openSearchModal(user: any) {

      
      this.selectedUser = user;
      this.formLogin=this.fb.group({
        role : this.fb.control(this.selectedUser.profils),
        phone : this.fb.control(this.selectedUser.mobile),
        familyStatus: this.fb.control(this.selectedUser.familyStatus),
        workStatus: this.fb.control(this.selectedUser.workStatus),
        teamAcronyme: this.fb.control(this.selectedUser.teamAcronyme),
        description: this.fb.control(this.selectedUser.description)
  
      })
      this.isSearchModalOpen = true;
    }

    handleModify() {
      if (this.formLogin.valid) {
      Swal.fire({
        text: 'Etes-vous sûr de vouloir modifier les informations utilisateur?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.selectedUser);
          let phone = this.formLogin.value.phone;
          let familyStatus = this.formLogin.value.familyStatus;
          let workStatus = this.formLogin.value.workStatus;
          let teamAcronyme = this.formLogin.value.teamAcronyme;
          let description = this.formLogin.value.description
          console.log("phone: " + phone)
          let modifiedUser = {
            ...this.selectedUser, // Copy the selectedUser object
            mobile: phone,
            familyStatus: familyStatus,
            workStatus: workStatus,
            teamAcronyme: teamAcronyme,
            description: description
          };
    
          // Send the modifiedUser to the modifyUser endpoint
          const apiUrl = 'http://localhost:8081/identity-service/user/modifyUser';
          this.http.post(apiUrl, modifiedUser).subscribe({
            next: () => {
              console.log('User modified successfully');
              Swal.fire("L'utilisateur a été modifié avec success");
              this.showPageUsers();
              // Handle success case
            },
            error: (error) => {
              console.log('Error modifying user:', error);
              // Handle error case
            }
          });
        }
      });
    }else{
       // Display error message or handle invalid form case
    console.log('Invalid form');
    }
  }


  ///Logout function ////
  handleLogout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

}