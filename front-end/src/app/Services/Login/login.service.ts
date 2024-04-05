import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import {jwtDecode} from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrlLogin = 'http://localhost:8081/identity-service/user/authenticate';
  private apiUrlLoadProfils = 'http://localhost:8081/identity-service/user/details';
  isAuthenticated : boolean =false;
  roles : any;
  email: string;
  accessToken! : any;
  constructor(private http: HttpClient) { }


login(email: string, password: string): Observable<any> {
  var authenticationDTO = {
    "email": email,
    "password": password
  };

  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const result=this.http.post<any>(this.apiUrlLogin, authenticationDTO, { headers: headers }).pipe(
    tap(response => {
      if(response.token){
        this.email=email;
        this.accessToken=response.token;
        this.isAuthenticated=true;
        console.log("access token is "+this.accessToken)
        localStorage.setItem("token",response.token)
        
      }
      else{
        alert("not connected suceessfully !! please retry")
      }
    })
  );
  return result
}

  loadProfile(email:string,token:string):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  const result=this.http.get<any>(this.apiUrlLoadProfils+"/"+email, { headers: headers }).pipe(
    tap(response => {
      if(response){
        localStorage.setItem("roles",response.profils)
        console.log(response.profils)
        this.roles=response.profils;
      }
      else{
        console.log("roles not loaded !!!")
      }
    })
  );
  return result
     

  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.email='';
    this.roles=undefined;
    localStorage.clear();
  }
}
