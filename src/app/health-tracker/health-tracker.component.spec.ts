import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthTrackerComponent } from './health-tracker.component';
import { LocalStorageService } from '../services/local-storage.service';
import { of } from 'rxjs';

describe('HealthTrackerComponent', () => {
  let component: HealthTrackerComponent;
  let fixture: ComponentFixture<HealthTrackerComponent>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['getUsers', 'saveUsers']);
    mockLocalStorageService.getUsers.and.returnValue([
      {
        id: 1,
        name: 'Snehal Patil',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }],
        editedName: 'Snehal Patil',
        editedWorkouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }],
      },
    ]);

    TestBed.configureTestingModule({
      declarations: [HealthTrackerComponent],
      providers: [{ provide: LocalStorageService, useValue: mockLocalStorageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from localStorage on init', () => {
    component.ngOnInit();
    expect(mockLocalStorageService.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('Snehal Patil');
  });

  it('should add a new workout for an existing user', () => {
    component.newUserName = 'Snehal Patil';
    component.newWorkout = { type: 'Running', minutes: 60 };
    component.addWorkout();
    expect(component.users[0].workouts.length).toBe(3);
    expect(component.users[0].workouts[2].type).toBe('Running');
    expect(component.users[0].workouts[2].minutes).toBe(60);
  });

  it('should create a new user if the name does not exist', () => {
    component.newUserName = 'Kunal Patil';
    component.newWorkout = { type: 'Swimming', minutes: 60 };
    component.addWorkout();
    expect(component.users.length).toBe(2);
    expect(component.users[1].name).toBe('Kunal Patil');
    expect(component.users[1].workouts.length).toBe(1);
    expect(component.users[1].workouts[0].type).toBe('Swimming');
  });

  it('should edit a user', () => {
    const user = component.users[0];
    component.editUser(user);
    expect(user.isEditing).toBeTrue();
  });

  it('should save the edited user', () => {
    const user = component.users[0];
    component.editUser(user);
    user.editedName = 'Snehal Patil Updated';
    component.saveUserEdit(user);
    expect(user.name).toBe('Snehal Patil Updated');
    expect(user.isEditing).toBeFalse();
  });

  it('should delete a user', () => {
    const user = component.users[0];
    component.deleteUser(user);
    expect(component.users.length).toBe(0);
  });

  it('should filter users based on search name', () => {
    component.searchName = 'Snehal';
    component.applyFilters();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Snehal Patil');
  });

  it('should filter users based on workout type', () => {
    component.searchWorkout = 'Cycling';
    component.applyFilters();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].workouts.some(workout => workout.type === 'Cycling')).toBeTrue();
  });

  it('should handle pagination correctly', () => {
    component.pageSize = 1;
    component.currentPage = 0;
    component.applyFilters();  // Reset filters
    const paginatedUsers = component.paginatedUsers;
    expect(paginatedUsers.length).toBe(1);
  });
});
