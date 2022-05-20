import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../course.model";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesServices} from "../../services/courses.services";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup !: FormGroup;
  course!: Course;
  destroy$ = new Subject();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CoursesServices) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) =>{
        if(params['id']){
          return this.courseService.getCourse$(params['id']);
        }
        else return of(null)
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next:(course)=>{
        if(course)
          this.course = course;
        this.buildForm();
      }
    });
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.course?.id,
      title: [this.course?.title, [Validators.required, Validators.minLength(3)]],
      description: [this.course?.description, [Validators.maxLength(10)]]
    });
  }

  get titleFormControl():FormControl{
    return this.formGroup?.get('title') as FormControl;
  }

  onSubmit(){
    if(this.formGroup.invalid) {
      return;

    }
    let request$;

    if (this.formGroup.value.id) {

      request$ = this.courseService.save$(this.formGroup.value)
    } else {
      request$ = this.courseService.save$(this.formGroup.value)
    }
    request$.subscribe({
      next: ()=>{
        this.router.navigate(['/']);
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
