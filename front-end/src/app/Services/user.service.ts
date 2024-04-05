import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  email!: string;
  role!: string;

  constructor() { }
}
