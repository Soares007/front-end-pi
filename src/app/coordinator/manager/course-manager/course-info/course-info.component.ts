import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/course';
import { CourseService } from 'src/app/course.service';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent {
  courses: Course[] = [];
  course?: Course;
  disciplines: Discipline[] = [];


  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private disciplineService: DisciplineService
  ) {

  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadDisciplines();

    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(courseId)) {
      this.courseService.getCourse(courseId).subscribe({
        next: (data: Course) => {
          this.course = data;
        },
        error: (error: any) => {
          console.error('Erro ao obter informações do curso:', error);
        }
      });
    } else {
      console.error('ID do curso inválido');
    }
  }

  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  getDisciplineString(courseId: number): string {
    const course = this.courses.find((course) => course.id === courseId);

    if (course) {
      const disciplineStrings = Array.isArray(course.classSubjects)
        ? course.classSubjects.map((classSubjectsId) => {
            const discipline = this.disciplines.find((t) => t.id === classSubjectsId);
            return discipline ? discipline.name : 'Disciplina não encontrado';
          })
        : ['Curso não encontrado'];

      return disciplineStrings.join(', ');
    }

    return 'Disciplina não encontrada';
  }
}
