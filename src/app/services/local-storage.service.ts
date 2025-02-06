import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
  isEditing?: boolean;
  editedName: string;
  editedWorkouts: Workout[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  getUsers(): User[] {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users);  // Parse and return stored users
    } else {
      return this.getDefaultUsers();  // Return default users if no data is found
    }
  }

  saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));  // Save users to localStorage
  }

  private getDefaultUsers(): User[] {
    return [
      {
        id: 1,
        name: 'Snehal Patil',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }],
        editedName: 'Snehal Patil',
        editedWorkouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }],
      },
      {
        id: 2,
        name: 'Kunal Patil',
        workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }],
        editedName: 'Kunal Patil',
        editedWorkouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }],
      },
      {
        id: 3,
        name: 'Piyush Patil',
        workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }],
        editedName: 'Piyush Patil',
        editedWorkouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }],
      },
    ];
  }
}
