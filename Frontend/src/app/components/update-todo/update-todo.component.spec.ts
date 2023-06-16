import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTodoComponent } from './update-todo.component';

describe('UpdateTodoComponent', () => {
  let component: UpdateTodoComponent;
  let fixture: ComponentFixture<UpdateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
