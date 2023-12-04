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

  constructor(private teamService: TeamService, private courseService: CourseService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupTeam = formBuilder.group({
      id: [''],
      course: [, [Validators.required]],
      students: [, [Validators.required]],
      shift: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.loadCourses();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getTeamById(id);
    }
    console.log("Courses:", this.courses);  // Adicione esta linha
  }


  loadCourses() {
    console.log("Carregando cursos...");  // Adicione esta linha
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data)
    });
  }

  getTeamById(id: number) {
    this.teamService.getTeam(id).subscribe({
      next: data => {
        this.formGroupTeam.setValue({
          id: data.id,
          course: data.course,
          students: data.students,
          shift: data.shift
        });

        this.isEditing = true;
      }
    });
  }

  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupTeam.valid) {
        this.teamService.update(this.formGroupTeam.value).subscribe({
          next: () => {
            this.router.navigate(['team-manager']);
          }
        })
      }
    }

    else {
      this.teamService.save(this.formGroupTeam.value).subscribe({
        next: () => {
          this.router.navigate(['team-manager']);
        }
      })
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
