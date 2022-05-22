import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {CoursesServices} from "./courses.services";

describe('Courses Services',()=>{
  let service:CoursesServices;
  let httpMock: HttpTestingController;

  const expectedResponse =[
    {id:1, title:'course1', description:'Desc 1'},
    {id:2, title:'course2', description:'Desc 2'},
    {id:3, title:'course3', description:'Desc 3'}
  ];

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CoursesServices]
    });

    service = TestBed.inject(CoursesServices);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpMock.verify();
  });

  it('getCourses$() should return data', ()=>{
    service.getCourses$().subscribe((response)=>{
      expect(response.length).toEqual(expectedResponse.length);
      expect(response).toEqual(expectedResponse);
    });
    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');


    //flushvame za da ni vurne nasheto body, dannite koito iskame
    //nqkoi trqbva da ni gi vurne
    // ekvivalentno e na spy.returnValue
    req.flush(expectedResponse);
  });

  it('getCourse$() should return single item if id exist in the list',()=>{
    const expectedCourse = expectedResponse[0];
    service.getCourse$(expectedCourse.id).subscribe((response)=>{
      expect(response.id).toEqual(expectedCourse.id);
      expect(response.title).toEqual(expectedCourse.title);
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${expectedCourse.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedCourse);
  });

  it('getCourse$() shuld return undefined if id does not exist',()=>{
    service.getCourse$(10).subscribe((response)=>{
      expect(response).toBeUndefined();
    });
    const req = httpMock.expectOne('http://localhost:3000/courses/10');
    expect(req.request.method).toBe('GET');
  });
  it('delete$() should send DELETE', ()=>{
    const idTodelete =1;
    service.delete$(idTodelete).subscribe();
    const req = httpMock.expectOne(`http://localhost:3000/courses/${idTodelete}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('save$() should send POST request if id is not defined',()=>{
    const courseToAdd={
      title: 'course to add',
      description: ''
    }
    service.save$(courseToAdd).subscribe();
    const req = httpMock.expectOne(`http://localhost:3000/courses`);
    expect(req.request.method).toBe('POST');

  });

  it('save$() should send PUT request if id is defined',()=>{
    const courseToUpdate={
      id:1,
      title: 'course to update',
    }
    service.save$(courseToUpdate).subscribe();
    const req = httpMock.expectOne(`http://localhost:3000/courses/1`);
    expect(req.request.method).toBe('PUT');
  });
});
