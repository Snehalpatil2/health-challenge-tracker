import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should return a non-empty list of workouts', (done) => {
    service.getWorkouts().subscribe((workouts) => {
      expect(workouts.length).toBeGreaterThan(0);
      done();  
    });
  });
});
