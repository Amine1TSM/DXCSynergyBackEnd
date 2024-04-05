import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumMasterTasksComponent } from './scrum-master-tasks.component';

describe('ScrumMasterTasksComponent', () => {
  let component: ScrumMasterTasksComponent;
  let fixture: ComponentFixture<ScrumMasterTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrumMasterTasksComponent]
    });
    fixture = TestBed.createComponent(ScrumMasterTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
