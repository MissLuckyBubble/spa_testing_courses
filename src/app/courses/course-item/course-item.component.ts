import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../course.model";

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  @Input() course!: Course;
  @Output() clicked = new EventEmitter<Course>();
  @Output() deleted = new EventEmitter<number>();

  onClick(): void{
    this.clicked.emit(this.course);
  }
  onDelete():void{
    this.deleted.emit(this.course.id);
  }

}
