import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Component, Input} from "@angular/core";
import {Course} from "../course.model";
import {Observable, of} from "rxjs";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {CoursesServices} from "../../services/courses.services";

@Component({
  selector: 'app-course-item',
  template: ''
})
export class CourseItemMockComponent{
  @Input() course!: Course;
}
export class MockCourseService{
  courses=[
    {id:1, title: 'c1'},
    {id:2, title: 'c2'}
  ];
  getCourses$():Observable<Course[]>{
    return of([...this.courses]);
  }
  delete$(id:number):Observable<undefined>{
    this.courses=this.courses.filter(c=>c.id!=id);
    return of(undefined);
  }
}
describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule
      ],
      declarations: [ CourseListComponent, CourseItemMockComponent ],
       providers:[{
        provide: CoursesServices,
         useClass: MockCourseService
       }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 course-item components', () =>{
    component.courses = [
      { title: 'c1'},
      {title: 'c2'}
    ];
    component.ngOnInit();
    fixture.detectChanges();
    const nodeList = fixture.nativeElement.querySelectorAll('app-course-item');
    const elements = Array.from(nodeList);

    expect(elements.length).toBe(2);
    expect(elements.length).toBe(component.courses.length);

  });
  it('should have defined empty courses array when component is created',()=>{
    expect(component.courses).toBeDefined();
    expect(component.courses).toHaveSize(0);
  });

  it('should have defined courses array whit 2 items',()=>{
    component.ngOnInit();
    expect(component.courses).toHaveSize(2);
  });

  it('should update courses array to contain only 1 item after onItemDelete is called',()=>{
    component.ngOnInit();
    expect(component.courses).toHaveSize(2);
    const idToDelete = 1;
    component.onItemDeleted(idToDelete);
    expect(component.courses).toHaveSize(1);
    const deletedCourse = component.courses.find(m=>m.id === idToDelete);
    expect(deletedCourse).toBeUndefined();
  });

  it('should set selected Course to be the same as the one that comes as a parameter', ()=>{
    expect(component.selectedCourse).toBeUndefined();
    const expectedCourse ={
      id:1,
      title: 'Expected Course'
    }
    component.onItemClicked(expectedCourse);
    expect(component.selectedCourse).toBeDefined();
    expect(component.selectedCourse.id).toBe(expectedCourse.id);
    expect(component.selectedCourse.title).toEqual(expectedCourse.title)
  });


});
