import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../app/Services/Login/login.service";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usersPage: any;
  getPageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

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

  showPageUsers() {
    this.http.get('http://localhost:8081/identity-service/user/allUsers/pageUsers?page=0&size=3').subscribe(
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
  email!: string;
  role!: string;

  constructor(public loginService : LoginService, public router : Router,private http: HttpClient) {}
  handleLogout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }
  ngOnInit(): void {

  }

 ;
}
