import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/Services/Login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(public loginService: LoginService, private router: Router) {}

  handleLogout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    this.router.navigateByUrl('/admin/manageUsers');
  }
  

  protected readonly LoginService = LoginService;
}
