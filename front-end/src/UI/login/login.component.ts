import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../../app/Services/Login/login.service";
import {Router} from "@angular/router";
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'front-end';

  private token:string;
  formLogin!: FormGroup;
  showLoginError: boolean = false;
  showPassword: boolean=false;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

 handleLogin(): void {
   
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;
    
     console.log(email+"   "+password)
     
  this.loginService.login(email, password).subscribe({
    next: (token) => {
    this.token=token;
    console.log('Token reçu:', token);
    if(this.token.length>0){}
    this.loadProfil(email)
},error: (loginError)=> {
  this.showLoginError=true;
  console.log('Error during login:', loginError);
}
  }


);
  }













  loadProfil(email: string) {
    this.loginService.loadProfile(email, this.token).subscribe(roles => {
      console.log('profils reçus:', roles.profils);
      var profils: Array<string> = roles.profils;
      if (profils.includes("MANAGER")) {
        this.router.navigateByUrl('/admin');
        console.log("included MANAGER");
      } else if (profils.includes("COLLABORATOR")) {
        this.router.navigateByUrl('/user');
      } else if (profils.includes("SCRUM_MASTER")) { // Check if the role is SCRUM_MASTER
        this.router.navigateByUrl('/scrumMaster');
      }
    });
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('form2Example27') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
