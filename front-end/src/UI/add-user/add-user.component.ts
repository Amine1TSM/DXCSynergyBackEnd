import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from "../../app/Services/Login/login.service";
import { Router } from "@angular/router";
import { ManageUserService } from 'src/app/Services/manageUser/manage-user.service';
import { Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from 'src/app/interfaces/UserDto';


// Custom validator function to compare password and confirm password
const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};




@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  formLogin! : FormGroup;
  addedUser! : User;
constructor(public loginService: LoginService,
  public manageUserService: ManageUserService,
  private http: HttpClient,
  private fb : FormBuilder,
  public router: Router){}

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      firstName : this.fb.control("", [Validators.required, Validators.minLength(2)]),
      lastName : this.fb.control("", [Validators.required, Validators.minLength(2)]),
      email : this.fb.control("",[Validators.required, Validators.email]),
      phone: this.fb.control("", [Validators.required, Validators.pattern(/^\d{10}$/)]),
      password : this.fb.control("", [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control("", [Validators.required]),
      birthday: this.fb.control(""),
      familyStatus: this.fb.control(""),
      teamAcronyme: this.fb.control(""),
      profil: this.fb.control(""),
      description:this.fb.control(""),
      workStatus:this.fb.control("")
    }, { validator: passwordMatchValidator });
  }

  // Other component code

  openAddModal(){
    this.addedUser = {
      firstName: this.formLogin.value.firstName,
      lastName: this.formLogin.value.lastName,
      email: this.formLogin.value.email,
      mobile: this.formLogin.value.phone,
      password: this.formLogin.value.password,
      teamAcronyme: "",
      description: "",
      chatStatus: "",
      familyStatus: "",
      workStatus: "",
      birthDay: null,
      profils: [],
    };

  }

  handleAddUser() {
    this.addedUser.birthDay = this.formLogin.value.birthday;
    this.addedUser.workStatus = this.formLogin.value.workStatus;
    this.addedUser.teamAcronyme = this.formLogin.value.teamAcronyme;
    this.addedUser.familyStatus = this.formLogin.value.familyStatus;
    this.addedUser.profils.push(this.formLogin.value.profil);
    this.addedUser.description = this.formLogin.value.description;
    this.addedUser.chatStatus = "OFFLINE";
    console.log(this.addedUser);
  
    // Show confirmation prompt using Swal
    Swal.fire({
      text: 'Êtes-vous sûr de vouloir ajouter cet utilisateur ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        // Make an HTTP POST request to your backend API
        const apiUrl = 'http://localhost:8081/identity-service/user/add';
        this.http.post(apiUrl, this.addedUser)
          .subscribe({
            next: () => {
              console.log('User added successfully');
              // Reset the form controls after successful addition
              this.formLogin.reset();
              // Show success alert using Swal
              Swal.fire({
                icon: 'success',
                text: "L'utilisateur a été ajouté avec succès !",
                confirmButtonText: 'OK'
              });
            },
            error: (error) => {
              console.log('Error adding user:', error);
              // Handle error case
              Swal.fire({
                icon: 'error',
                text: 'Cet utilisateur existe déjà !',
                confirmButtonText: 'OK'
              });
            }
          });
      }
    });
  }
  



  }

