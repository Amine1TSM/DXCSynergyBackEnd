import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from "../../app/Services/Login/login.service";
import { Router } from "@angular/router";
import { ScrumMasterDTO } from './interfaces/scrumMasterDTO';
import { ProjectResponseDTO } from './interfaces/ProjectResponseDTO';
import { ScrumMasterService } from 'src/app/Services/scrumMaster/scrum-master.service';
@Component({
  selector: 'app-scrum-master',
  templateUrl: './scrum-master.component.html',
  styleUrls: ['./scrum-master.component.css']
})
export class ScrumMasterComponent implements OnInit {

email : any=this.loginService.email //the current scrum master in the page
scrumMaster : ScrumMasterDTO;// infos about the scrum master
projects: ProjectResponseDTO[]; // list of projects where the scrum master team participate
teamUsers: any; // members of the team 
currentTeam: any; // the team we see in the search of teams
currentPage = 0; // Default current page
acronymSearch : string;

constructor( public loginService: LoginService,
  private http: HttpClient,public scrumMasterService : ScrumMasterService,
  public router: Router){}

  ngOnInit(): void {
    this.loadScrumMasterDetails();
  }


  loadScrumMasterDetails(): void {
    this.scrumMasterService.getScrumMasterDetails(this.email).subscribe(
      (response) => {
        this.scrumMaster = response;
        this.loadProjectsByTeamAcronym();
        console.log('Scrum Master details:', this.scrumMaster);
      },
      (error) => {
        console.error('Error fetching Scrum Master details:', error);
      }
    );
  }

  loadProjectsByTeamAcronym(): void {
    if (this.scrumMaster && this.scrumMaster.teamAcronyme) {
      this.scrumMasterService
        .getProjectsByTeamAcronym(this.scrumMaster.teamAcronyme)
        .subscribe(
          (response) => {
            this.projects = response;
            console.log('Projects:', this.projects);
          },
          (error) => {
            console.error('Error fetching projects by team acronym:', error);
          }
        );
    } else {
      console.error('Scrum Master or team acronym is undefined.');
    }
  }

  getDaysAgo(debutDate: string): string {
    const debutDateObj = new Date(debutDate);
    const today = new Date();
    const timeDiff = today.getTime() - debutDateObj.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return `il y a ${daysDiff} jours`;
  }


  openSearchModal(acronym: string): void {
    const url = `http://localhost:8081/identity-service/team/usersPaged/${acronym}?page=${this.currentPage}`;
  this.acronymSearch=acronym
    this.http.get<any>(url).subscribe(
      (response) => {
        // Store the response in the 'teamUsers' variable
        
        this.teamUsers = response; // Assuming 'content' holds the array of users
        this.currentTeam=this.teamUsers.userResponseDTOS[0].teamName
        console.log(this.currentTeam)
        console.log('Users:', this.teamUsers);
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error as needed
      }
    );
  }

  getPageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index);
  }
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.openSearchModal(this.acronymSearch);
  }

  getInitials(firstName: string, lastName: string): string {
    // Logic to generate initials from first and last names
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return initials.toUpperCase();
  }
}
