import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScrumMasterDTO } from 'src/UI/scrum-master/interfaces/scrumMasterDTO';
import { ProjectResponseDTO } from 'src/UI/scrum-master/interfaces/ProjectResponseDTO';
import { SprintResponseDTO } from 'src/UI/scrum-master-tasks/interfaces/sprintResponseDTO';
@Injectable({
  providedIn: 'root'
})
export class ScrumMasterService {
  private getScrumMaster = 'http://localhost:8081/identity-service/user';
  private getTeamMembers = 'http://localhost:8081/identity-service/team';
  private getProjectsByAcronym = 'http://localhost:8082/Projects/getProjectByTeamAcronym?acronym=';
  private getSprintsByProjectTitleWithTasksURL = 'http://localhost:8082/Sprints/getByTitleWithTasks?title='; // Adjust the URL as needed
  private getAllUsersByTeamAcronymsURL = 'http://localhost:8081/identity-service/user/allUsersByTeamAcronyms'; // New API endpoint
  
  constructor(private http: HttpClient) { }

  getScrumMasterDetails(email: string): Observable<ScrumMasterDTO> {
    const url = `${this.getScrumMaster}/details/${email}`;
    return this.http.get<ScrumMasterDTO>(url).pipe(
      catchError((error) => {
        console.error('Error fetching user details:', error);
        return throwError(error);
      })
    );
  }

  getProjectsByTeamAcronym(acronym: string): Observable<ProjectResponseDTO[]> {
    const url = `${this.getProjectsByAcronym}${acronym}`;
    return this.http.get<ProjectResponseDTO[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching projects by team acronym:', error);
        return throwError(error);
      })
    );
  }

  getSprintsByProjectTitleWithTasks(title: string): Observable<SprintResponseDTO[]> {
    const url = `${this.getSprintsByProjectTitleWithTasksURL}${title}`; // Request parameter for the title
    return this.http.get<SprintResponseDTO[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching sprints by project title:', error);
        return throwError(error);
      })
    );
  }

  getAllUsersOfTeam(teamAcronym: string): Observable<any[]> {
    const url = `${this.getTeamMembers}/users/${teamAcronym}`; // Endpoint for getting users of a team
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching users of team:', error);
        return throwError(error);
      })
    );
  }

  getAllUsersByTeamAcronyms(acronyms: string[] | undefined): Observable<any> {
    return this.http.post<any>(this.getAllUsersByTeamAcronymsURL, acronyms).pipe(
      catchError((error) => {
        console.error('Error fetching users by team acronyms:', error);
        return throwError(error);
      })
    );
  }

}
