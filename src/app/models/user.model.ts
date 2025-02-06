import { Workout } from './workout.model';

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
  isEditing?: boolean;
  editedName: string; 
  editedWorkouts: Workout[]; 
}
