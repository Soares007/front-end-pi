import { DisciplineService } from 'src/app/discipline.service';
import { Discipline } from 'src/app/discipline';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/teacher.service';
import { Teacher } from 'src/app/teacher';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  teachers: Teacher[] = [];
  disciplines: Discipline[] = [];
  teacher?: Teacher;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private disciplineService: DisciplineService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
    this.loadDisciplines();
    
    const teacherId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(teacherId)) {
      this.teacherService.getTeacher(teacherId).subscribe({
        next: (data: Teacher) => {
          this.teacher = data;
        },
        error: (error: any) => {
          console.error('Erro ao obter informações do professor:', error);
        }
      });
    } else {
      console.error('ID do professor inválido');
    }
  }

  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  getDisciplineString(teacherId: number): string {
    const teacher = this.teachers.find((teacher) => teacher.id === teacherId);

    if (teacher) {
      const disciplineStrings = Array.isArray(teacher.school_subject)
        ? teacher.school_subject.map((disciplineId) => {
            const discipline = this.disciplines.find((t) => t.id === disciplineId);
            return discipline ? discipline.name : 'Disciplina não encontrado';
          })
        : ['Professor não encontrado'];

      return disciplineStrings.join(', ');
    }

    return 'Turma não encontrada';
  }
}
