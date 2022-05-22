import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import {RouterTestingModule} from "@angular/router/testing";


describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(() => {
   TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CourseItemComponent ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course={
      id:1,
      title:'tile',
      description:'description'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit with value', ()=>{

    const spy = spyOn(component.clicked,'emit' )
    component.onClick();
    expect(spy).toHaveBeenCalledWith(component.course);
  });

  it('should emit delete event with movie id', ()=>{
    const spy = spyOn(component.deleted,'emit' )
    component.onDelete();
    expect(spy).toHaveBeenCalledWith(component.course.id);
  });

});
