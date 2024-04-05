import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from "../../app/Services/Login/login.service";
import { Router } from "@angular/router";
import { ProjectResponseDTO } from '../scrum-master/interfaces/ProjectResponseDTO';
import { ScrumMasterService } from 'src/app/Services/scrumMaster/scrum-master.service';
import { ScrumMasterDTO } from '../scrum-master/interfaces/scrumMasterDTO';
import { SprintResponseDTO } from './interfaces/sprintResponseDTO';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-scrum-master-tasks',
  templateUrl: './scrum-master-tasks.component.html',
  styleUrls: ['./scrum-master-tasks.component.css']
})
export class ScrumMasterTasksComponent implements OnInit {
  email : any=this.loginService.email
  scrumMaster : ScrumMasterDTO;// infos about the scrum master
  projects: ProjectResponseDTO[]; // list of projects where the scrum master team participate
  teamUsers: any; // members of the scrumMaster team
  projectMembers: any;
  workingProject: ProjectResponseDTO | undefined;
  sprints: SprintResponseDTO[];

  constructor( public loginService: LoginService,public scrumMasterService : ScrumMasterService,
    private http: HttpClient,public router: Router){}


  ngOnInit(): void {
    this.loadScrumMasterDetails();
    
  }

  loadScrumMasterDetails(): void {
    this.scrumMasterService.getScrumMasterDetails(this.email).subscribe(
      (response) => {
        this.scrumMaster = response;
        this.loadProjectsByTeamAcronym();
        this.loadTeamMembers();
        
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
            this.workingProject=this.findLatestProjectByDebutDate(this.projects);
            this.loadSprintsByProjectTitle();
            this.loadAllUsersByTeamAcronyms();
        console.log('working project details:', this.workingProject);
          },
          (error) => {
            console.error('Error fetching projects by team acronym:', error);
          }
        );
    } else {
      console.error('Scrum Master or team acronym is undefined.');
    }
  }

  loadSprintsByProjectTitle():void{
    this.scrumMasterService.getSprintsByProjectTitleWithTasks(this.workingProject!.title).subscribe(
      (response) => {
        this.sprints = response;
        console.log('Sprints:', this.sprints);
        
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
  }

  loadTeamMembers():void{
    this.scrumMasterService.getAllUsersOfTeam(this.scrumMaster!.teamAcronyme).subscribe(
      (response) => {
        this.teamUsers = response;
        console.log('Team Members:', this.teamUsers);
        
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
  }

  loadAllUsersByTeamAcronyms():void{
    this.scrumMasterService.getAllUsersByTeamAcronyms(this.workingProject!.teamAcronyms).subscribe(
      (response) => {
        this.projectMembers = response;
        console.log('Project Members:', this.projectMembers);
        
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
  }



// Assuming this function is inside a service or component
findLatestProjectByDebutDate(projects: ProjectResponseDTO[]): ProjectResponseDTO | undefined {
  if (!projects || projects.length === 0) {
    console.error('No projects provided.');
    return undefined;
  }

  return projects.reduce((latestProject, currentProject) => {
    return currentProject.debutDate > latestProject.debutDate ? currentProject : latestProject;
  });
}

//
 formatDateToFrench(date: Date): string {
   date = new Date();
const formattedDate = date.toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
console.log(formattedDate);
return formattedDate ;
}
}
