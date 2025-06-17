import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoUsuariosComponent } from './todo-usuarios.component';

describe('TodoUsuariosComponent', () => {
  let component: TodoUsuariosComponent;
  let fixture: ComponentFixture<TodoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
