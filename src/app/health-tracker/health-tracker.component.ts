import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
  isEditing: boolean;
  editedName: string;
  editedWorkouts: Workout[];
}

@Component({
  selector: 'app-health-tracker',
  templateUrl: './health-tracker.component.html',
  styleUrls: ['./health-tracker.component.css']
})
export class HealthTrackerComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];  // This will store filtered users for pagination
  newUserName: string = '';
  newWorkout: Workout = { type: '', minutes: 0 };
  searchName: string = '';
  searchWorkout: string = '';
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(private storageService: LocalStorageService) {}

  ngOnInit(): void {
    // Load users from localStorage (or load hardcoded values if localStorage is empty)
    const storedUsers = this.storageService.getUsers();

    // Initialize 'users' array with data from localStorage or hardcoded values
    this.users = (storedUsers as User[]).map(user => {
      return {
        ...user,
        isEditing: user.isEditing ?? false,  // Ensure 'isEditing' exists
        editedName: user.editedName || user.name,  // Set 'editedName' if not defined
        editedWorkouts: user.editedWorkouts || [...user.workouts],  // Set 'editedWorkouts' if not defined
      };
    });

    // Initialize filtered users with all users
    this.filteredUsers = [...this.users];
  }

  // Add a new workout
  addWorkout(): void {
    if (!this.newUserName.trim() || !this.newWorkout.type.trim() || this.newWorkout.minutes <= 0) {
      alert('Please enter a valid name, workout type, and workout time.');
      return;
    }

    const existingUser = this.users.find(user => user.name.toLowerCase() === this.newUserName.toLowerCase());

    if (existingUser) {
      // If user exists, just add the workout to their list
      existingUser.workouts.push({ ...this.newWorkout });
      existingUser.editedWorkouts = [...existingUser.workouts];  // Update editedWorkouts as well
    } else {
      // If user doesn't exist, create a new user
      const newUser: User = {
        id: Date.now(),
        name: this.newUserName,
        workouts: [{ ...this.newWorkout }],
        isEditing: false,
        editedName: this.newUserName,
        editedWorkouts: [{ ...this.newWorkout }],
      };

      this.users.push(newUser);
    }

    this.filteredUsers = [...this.users];  // Update filtered users
    this.storageService.saveUsers(this.users);  // Save updated users to localStorage

    // Reset input fields
    this.newUserName = '';
    this.newWorkout = { type: '', minutes: 0 };
  }

  // Edit a user
  editUser(user: User): void {
    user.isEditing = true;
    user.editedName = user.name;
    user.editedWorkouts = [...user.workouts];
  }

  // Save the edited user
  saveUserEdit(user: User): void {
    if (!user.editedName.trim()) {
      alert('Name cannot be empty!');
      return;
    }

    user.name = user.editedName;
    user.workouts = [...user.editedWorkouts];
    user.isEditing = false;
    this.storageService.saveUsers(this.users);  // Save updated users to localStorage
  }

  // Delete a user
  deleteUser(user: User): void {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);  // Remove user from the users array
      this.filteredUsers = [...this.users];  // Update filtered users
      this.storageService.saveUsers(this.users);  // Save updated users to localStorage
    }
  }

  // Apply filters for search
  applyFilters(): void {
    // Apply the search filters to the users
    this.filteredUsers = this.users.filter(user => {
      const matchesName = this.searchName ? user.name.toLowerCase().includes(this.searchName.toLowerCase()) : true;
      const matchesWorkout = this.searchWorkout ? user.workouts.some(workout =>
        workout.type.toLowerCase().includes(this.searchWorkout.toLowerCase())
      ) : true;
      return matchesName && matchesWorkout;
    });

    // Reset the page to the first page when filters are applied
    this.currentPage = 0;
  }

  // Pagination functionality
  changePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Get paginated users
  get paginatedUsers(): User[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredUsers.slice(startIndex, endIndex);
  }
}
