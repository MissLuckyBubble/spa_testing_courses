import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../courses/course.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {
  url ="http://localhost:3000/courses";
  constructor(private http: HttpClient) {
  }
  getCourses$(): Observable<Course[]>{
    return this.http.get<Course[]>(this.url);
  }
  delete$(id:number):Observable<undefined>{
    const url = `${this.url}/${id}`;
    return this.http.delete<undefined>(url);
  }
  getCourse$(id:number):Observable<Course>{
    const url = `${this.url}/${id}`;
    return this.http.get<Course>(url);
  }
  save$(body:Course): Observable<Course>{

    if(body.id){

      return this.put$(body);
    }
    return this.post$(body);
  }

  private  put$(body: Course):Observable<Course>{

    return this.http.put<Course>(`${this.url}/${body.id}`, body)
  }
  private post$(body: Course): Observable<Course>{
    return this.http.post<Course>(this.url, body);
  }
}
