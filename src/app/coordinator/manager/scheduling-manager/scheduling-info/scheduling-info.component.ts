import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { DisciplineService } from 'src/app/discipline.service';
import { RoomService } from 'src/app/room.service';
import { Scheduling } from 'src/app/scheduling';
import { SchedulingService } from 'src/app/scheduling.service';
import { TeacherService } from 'src/app/teacher.service';

@Component({
  selector: 'app-scheduling-info',
  templateUrl: './scheduling-info.component.html',
  styleUrls: ['./scheduling-info.component.css']
})
export class SchedulingInfoComponent {
  schedulings: Scheduling[] = [];
  scheduling?: Scheduling;
  courseName: string = '';
  courseShift: string = '';
  disciplineName: string = '';
  teacherName: string = '';
  roomAndLaboratoryName: string = '';
  roomAndLaboratoryIdentity: string = '';

  constructor(
    private schedulingService: SchedulingService,
    private courseService: CourseService,
    private disciplineService: DisciplineService,
    private teacherService: TeacherService,
    private roomAndLaboratoryService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSchedulings();
    
    const schedulingId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(schedulingId)) {
      this.schedulingService.getScheduling(schedulingId).subscribe({
        next: (data: Scheduling) => {
          this.scheduling = data;
          this.loadCourseName(data.courseId);
          this.loadDisciplineName(data.classSubjectId);
          this.loadTeacherName(data.teacher);
          this.loadRoomAndLaboratoryName(data.roomAndLaboratory);
        },
        error: (error: any) => {
          console.error('Erro ao obter informações do agendamento:', error);
        }
      });
    } else {
      console.error('ID do agendamento inválido');
    }
  }

  loadCourseName(courseId: number): void {
    this.courseService.getCourse(courseId).subscribe({
      next: (course) => {
        this.courseName = course.name;
        this.courseShift = course.shift;
      },
      error: (error) => {
        console.error('Erro ao obter informações do curso:', error);
      }
    });
  }
  

  loadDisciplineName(disciplineId: number): void {
    this.disciplineService.getDiscipline(disciplineId).subscribe({
      next: (discipline) => {
        this.disciplineName = discipline.name;
      },
      error: (error) => {
        console.error('Erro ao obter nome da disciplina:', error);
      }
    });
  }

  loadRoomAndLaboratoryName(roomAndLaboratoryId: number): void {
    this.roomAndLaboratoryService.getRoom(roomAndLaboratoryId).subscribe({
      next: (roomAndLaboratory) => {
        this.roomAndLaboratoryName = roomAndLaboratory.name;
        this.roomAndLaboratoryIdentity = roomAndLaboratory.identity;
      },
      error: (error) => {
        console.error('Erro ao obter nome da sala/lab:', error);
      }
    });
  }

  loadTeacherName(teacherId: number): void {
    this.teacherService.getTeacher(teacherId).subscribe({
      next: (teacher) => {
        this.teacherName = teacher.name;
      },
      error: (error) => {
        console.error('Erro ao obter nome do professor:', error);
      }
    });
  }

  loadSchedulings() {
    this.schedulingService.getSchedulings().subscribe((schedulings) => {
      this.schedulings = schedulings;
    });
  }
}
