import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Define the Workout interface
export interface Workout {
  name: string;
  type: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts: Workout[] = [
    { name: 'Snehal Patil', type: 'Cardio', minutes: 30 },
    { name: 'Kunal Patil', type: 'Stretching', minutes: 45 },
    { name: 'Piyush Patil', type: 'Weightlifting', minutes: 60 },
  ];

  // ✅ Add getWorkouts method
  getWorkouts(): Observable<Workout[]> {
    return of(this.workouts);
  }
}
