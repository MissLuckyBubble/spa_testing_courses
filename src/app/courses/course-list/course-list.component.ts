import { Component, OnInit } from '@angular/core';
import {Course} from "../course.model";
import {CoursesServices} from "../../services/courses.services";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses!: Course[];
  selectedCourse!: Course;

  constructor(private coursesServices: CoursesServices) {
    this.courses =[];
  }

  ngOnInit(): void {
    this.coursesServices.getCourses$().subscribe({
      next:(response)=>{
        this.courses=response;
      },
      error:(error:HttpErrorResponse)=>{

      }
    });
  }
  onItemClicked(course: Course): void {
    this.selectedCourse = course;
  }

  onItemDeleted(id: number): void {
    this.coursesServices.delete$(id).subscribe({
      next:()=>{
        this.courses= this.courses.filter(movie => movie.id!== id)
      }
    });
  }
}
