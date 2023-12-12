import { CourseService } from 'src/app/course.service';
import { TeamService } from './../../../../team.service';
import { Team } from './../../../../team';
import { Course } from 'src/app/course';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-new-team',
  templateUrl: './form-new-team.component.html',
  styleUrls: ['./form-new-team.component.css']
})
export class FormNewTeamComponent {
  formGroupTeam: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  courses: Course[] = [];
  teams: Team[] = [];
  selectedCourseShifts: string[] = [];

  constructor(private teamService: TeamService, private courseService: CourseService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupTeam = formBuilder.group({
      id: [''],
      course: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      students: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getTeamById(id);
    }
  }

  onCourseChange() {
    const selectedCourseId = +this.formGroupTeam.get('course')?.value;
  
   //Verifica se os cursos estão carregados
    if (this.courses.length > 0) {
      //Encontre o curso selecionado com base no ID
      const selectedCourse = this.courses.find(course => course.id === selectedCourseId);
  
     // Registra o curso selecionado para verificar se ele foi recuperado corretamente
      console.log("Selected Course:", selectedCourse);
  
     //Atualiza os turnos do curso selecionado
      this.selectedCourseShifts = selectedCourse ? [selectedCourse.shift] : [];
      console.log("Selected Course Shifts:", this.selectedCourseShifts);
    } else {
      console.log("Courses are not loaded yet");
    }
  }
  
  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data)
    });
  }

  getTeamById(id: number) {
    this.teamService.getTeam(id).subscribe({
      next: data => {
        this.formGroupTeam.patchValue({
          id: data.id,
          course: data.course,
          shift: data.shift,
          students: data.students,
        });
  
        this.selectedCourseShifts = [data.shift];
  
        this.isEditing = true;
      }
    });
  }
  
  save() {
    this.submitted = true;

    if (this.formGroupTeam.invalid) {
      return;
    }

    if (this.isEditing) {
      this.teamService.update(this.formGroupTeam.value).subscribe({
        next: () => {
          this.router.navigate(['team-manager']);
        }
      });
    } else {
      this.teamService.save(this.formGroupTeam.value).subscribe({
        next: () => {
          this.router.navigate(['team-manager']);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['team-manager']);
  }

  get course(): any {
    return this.formGroupTeam.get("course");
  }

  get shift(): any {
    return this.formGroupTeam.get("shift");
  }

  get students(): any {
    return this.formGroupTeam.get("students");
  }
}
