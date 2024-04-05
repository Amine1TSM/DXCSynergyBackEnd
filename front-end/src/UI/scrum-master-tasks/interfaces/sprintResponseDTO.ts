import { TaskResponseDTO } from "./taskResponseDTO";

export interface SprintResponseDTO {
    title: string;
    debutDate: Date;
    endDate: Date;
    projectTitle: string;
    state: string;
    tasks: TaskResponseDTO[];
  }
  