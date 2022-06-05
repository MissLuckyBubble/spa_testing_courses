import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CoursesServices} from "../../services/courses.services";
import {Router} from "@angular/router";
import {of,} from "rxjs";

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CourseFormComponent ],
      providers:[{
        provide: CoursesServices,
        useClass: class courseS{
          save$ = jasmine.createSpy('save$').and.returnValue(of({}));
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created Form whit validators',()=>{
    component.ngOnInit();
    expect(component.formGroup).not.toBeUndefined();
    expect(component.formGroup.controls).toHaveSize(3);
    expect(component.formGroup.get('title')?.validator).toBeTruthy();
    expect(component.formGroup.get('title')?.invalid).toBe(true);
    expect(component.formGroup.get('description')?.validator).toBeTruthy();
    expect(component.formGroup.get('description')?.valid).toBeTrue();
  });

  it('should have form with valid title filed ',()=>{
    component.ngOnInit();
    expect(component.formGroup.get('title')?.valid).toBeFalse();
    component.formGroup.get('title')?.setValue('proba');
    expect(component.formGroup.get('title')?.valid).toBeTrue();
  });

  it('should have INVALID title filed', ()=>{
    component.ngOnInit();
    expect(component.formGroup.get('title')?.valid).toBeFalse();
    component.formGroup.get('title')?.setValue('s');
    expect(component.formGroup.get('title')?.valid).toBeFalse();
  });

  it('should have INVALID description field', ()=>{
    component.ngOnInit();
    expect(component.formGroup.get('description')?.valid).toBeTrue();
    component.formGroup.get('description')?.setValue('description longer than 15 characters');
    expect(component.formGroup.get('description')?.valid).toBeFalse();
  });

  it('should have form group that is valid',()=>{
    component.ngOnInit();
    expect(component.formGroup.valid).toBeFalse();
    component.formGroup.setValue({
      id: null,
      title:'title',
      description: 'description'
    });
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should have invalid title contrl if empty (required validator)',()=>{
    const titleControl = component.formGroup.get('title');
    const  error = titleControl?.errors || {};
    expect(error['required']).toBeTrue();
  });

  it('title control should be invalid if length is less than 3',()=>{

    const  titleControl = component.formGroup.get('title');
    titleControl?.setValue('v');
    const error = titleControl?.errors || {};
    expect(error['minlength']).toBeTruthy();
  });

  it('should navigate to list after onSubmit', ()=>{
    const courseToAdd = {
      id: null,
      title: 'Course to Add',
      description: ''
    }

    component.formGroup.setValue(courseToAdd);
    expect(component.formGroup.valid).toBeTrue();

    const router = TestBed.inject(Router);
    const spy = spyOn(router,'navigate');

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(['/']);
  });

  it('should onSubmit not have been called if the form is invalid',()=>{
    expect(component.formGroup.valid).toBeFalse();
    const router = TestBed.inject(Router);
    const spy = spyOn(router,'navigate');

    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });


});
