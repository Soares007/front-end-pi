import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/course';
import { CourseService } from 'src/app/course.service';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';
import { Room } from 'src/app/room';
import { RoomService } from 'src/app/room.service';
import { Scheduling } from 'src/app/scheduling';
import { SchedulingService } from 'src/app/scheduling.service';
import { Teacher } from 'src/app/teacher';
import { TeacherService } from 'src/app/teacher.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-form-new-scheduling',
  templateUrl: './form-new-scheduling.component.html',
  styleUrls: ['./form-new-scheduling.component.css']
})
export class FormNewSchedulingComponent {
  formGroupScheduling: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  courseIds: Course[] = [];
  classSubjectIds: Discipline[] = [];
  teachers: Teacher[] = [];
  dayofweekOption: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  roomAndLaboratorys: Room[] = [];

  scheduling: Scheduling[] = [];
  date: Date | undefined;

  constructor(
    private schedulingService: SchedulingService,
    private courseService: CourseService,
    private disciplineService: DisciplineService,
    private teacherService: TeacherService,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private primeNGConfig: PrimeNGConfig,
  ) {
    this.formGroupScheduling = formBuilder.group({
      id: [''],
      courseId: [, [Validators.required]],
      classSubjectId: [, [Validators.required]],
      teacher: ['', [Validators.required]],
      calendar: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      roomAndLaboratory: ['', [Validators.required]]
    });

    this.primeNGConfig.setTranslation({
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadDisciplines();
    this.loadTeachers();
    this.loadRooms();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getSchedulingById(id);
    }
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courseIds = data)
    });
  }

  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe({
      next: (data) => (this.classSubjectIds = data)
    });
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (data) => (this.teachers = data)
    });
  }

  loadRooms() {
    this.roomService.getRooms().subscribe({
      next: (data) => (this.roomAndLaboratorys = data)
    });
  }

  getSchedulingById(id: number) {
    this.schedulingService.getScheduling(id).subscribe({
      next: data => {
        this.formGroupScheduling.setValue({
          id: data.id,
          courseId: data.courseId,
          classSubjectId: data.classSubjectId,
          teacher: data.teacher,
          calendar: new Date(data.calendar), // Converte a string para um objeto Date
          startTime: data.startTime,
          endTime: data.endTime,
          roomAndLaboratory: data.roomAndLaboratory
        });

        this.isEditing = true;
      }
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupScheduling.valid) {
      const formValue = this.formGroupScheduling.value;
  
      // Verificar se a data selecionada é no passado
      const selectedDate = new Date(formValue.calendar);
      const currentDate = new Date();
  
      if (selectedDate.getTime() < currentDate.getTime()) {
        alert('Erro: Não é possível selecionar uma data no passado.');
        return; // Parar o processamento adicional
      }
  
      // Verificar se a hora de início ou término é 00:00
      if (formValue.startTime === '00:00' || formValue.endTime === '00:00') {
        alert('Erro: Hora de início ou término não pode ser 00:00.');
        return; // Parar o processamento adicional
      }
  
      if (this.isEditing) {
        this.schedulingService.update(formValue).subscribe({
          next: () => {
            this.router.navigate(['scheduling-manager']);
          }
        });
      } else {
        this.schedulingService.save(formValue).subscribe({
          next: () => {
            this.router.navigate(['scheduling-manager']);
          }
        });
      }
    }
  }  

  private showErrorAlert(message: string): void {
    alert(`Erro: ${message}`);
  }

  cancel() {
    this.router.navigate(['scheduling-manager']);
  }

  get courseId(): any {
    return this.formGroupScheduling.get("courseId");
  }

  get classSubjectId(): any {
    return this.formGroupScheduling.get("classSubjectId");
  }

  get teacher(): any {
    return this.formGroupScheduling.get("teacher");
  }

  get startTime(): any {
    return this.formGroupScheduling.get("startTime");
  }

  get endTime(): any {
    return this.formGroupScheduling.get("endTime");
  }

  get calendar(): any {
    return this.formGroupScheduling.get("calendar");
  }

  get roomAndLaboratory(): any {
    return this.formGroupScheduling.get("roomAndLaboratory");
  }
}
