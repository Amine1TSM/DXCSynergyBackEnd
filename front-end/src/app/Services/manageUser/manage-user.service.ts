import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  private apiDeleteUser = 'http://localhost:8081/identity-service/user/delete';
  private SearchapiUrl = `http://localhost:8081/identity-service/user/`

  constructor(private http: HttpClient) { }

  deleteUser(email: string): Observable<any> {
    const url = `${this.apiDeleteUser}/${email}`; // Construct the URL with the email as a path variable
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(url, { headers: headers }).pipe(
      catchError((error) => {
        console.log('HTTP error occurred:', error);
        return throwError(error);
      })
    );
  }


  searchUsers(keyword: string): Observable<any[]> {
    const searchUrl = `${this.SearchapiUrl}/searchUsers?keyword=${keyword}`;
    return this.http.get<any[]>(searchUrl);
  }






}