import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/course';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.css']
})
export class CourseManagerComponent {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService, private router: Router,  private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      }
    });
  }


  create(){
    this.router.navigate(['createCourse']);
  }

  edit(course: Course) {
    this.router.navigate(['courseDetails', course.id]);
  }

  delete(course: Course) {
    this.courseService.delete(course).subscribe({
      next: () => this.loadCourses()
    });
  }

  viewInformation(course: Course) {
    this.router.navigate(['course-info', course.id]);
  }

}
