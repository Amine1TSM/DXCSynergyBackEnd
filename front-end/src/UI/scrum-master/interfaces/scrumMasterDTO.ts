export interface ScrumMasterDTO {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    teamName: string;
    teamAcronyme: string;
    departmentName: string;
    departmentAcronyme: string;
    description: string;
    birthDay: Date | null;
    familyStatus: string;
    workStatus: string;
    chatStatus: string;
    profils: string[];
    lastAuthentication: Date;
  }
  