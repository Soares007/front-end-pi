import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/teacher.service';
import { Teacher } from 'src/app/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-new-teacher',
  templateUrl: './form-new-teacher.component.html',
  styleUrls: ['./form-new-teacher.component.css']
})
export class FormNewTeacherComponent implements OnInit {

  formGroupTeacher: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  teachers: Teacher[] = [];
  classSubjects: Discipline[] = [];

  constructor(private teacherService: TeacherService, private disciplineService: DisciplineService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupTeacher = formBuilder.group({
      id: [''],
      cpf: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u017F\s]*[a-zA-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F\s]*$/)]],
      classSubjects: this.formBuilder.array([]),
    });
  }

  get classSubjectArray(): FormArray {
    return this.formGroupTeacher.get('classSubjects') as FormArray;
  }

  ngOnInit(): void {
    this.loadClassSubjects();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getTeacherById(id);
    }
  }

  loadClassSubjects(){
    this.disciplineService.getDisciplines().subscribe((classSubjects) => {
      this.classSubjects = classSubjects;
    });
  }

  getTeacherById(id: number) {
    this.teacherService.getTeacher(id).subscribe({
      next: data => {
        while (this.classSubjectArray.length !== 0) {
          this.classSubjectArray.removeAt(0);
        }

        this.formGroupTeacher.setValue({
          id: data.id,
          cpf: data.cpf,
          name: data.name,
          classSubjects: []
        });

        if (Array.isArray(data.classSubjects)) {
          data.classSubjects.forEach(classSubjectsId => {
            this.classSubjectArray.push(this.formBuilder.control(classSubjectsId));
          });
        }

        this.isEditing = true;
      }
    });
  }

  save() {
    this.submitted = true;

    if (this.formGroupTeacher.valid) {
      if (this.classSubjectArray.length >= 0) {
        if (this.isEditing) {
          this.teacherService.update(this.formGroupTeacher.value).subscribe({
            next: () => {
              this.router.navigate(['teacher-manager']);
            }
          });
        } else {
          this.teacherService.save(this.formGroupTeacher.value).subscribe({
            next: () => {
              this.router.navigate(['teacher-manager']);
            }
          });
        }
      } else {
        // Defina um erro personalizado no FormGroup para acionar a exibição da mensagem de erro no template
        this.formGroupTeacher.get('classSubjects')?.setErrors({ 'required': true });
      }
    }
  }

  toggleClassSubject(classSubjectsId: number): void {
    const classSubjectArray = this.classSubjectArray;

    //Verifica se o timeId já está no array
    const index = classSubjectArray.value.indexOf(classSubjectsId);

    if (index === -1) {
      // Se não estiver no array, adicione-o
      classSubjectArray.push(this.formBuilder.control(classSubjectsId));
    } else {
     //Se já estiver no array, remova-o
      classSubjectArray.removeAt(index);
    }
  }

  cancel() {
    this.router.navigate(['teacher-manager']);
  }

  limitCpfLength() {
    const cpfControl = this.formGroupTeacher.get('cpf');

    if (cpfControl && cpfControl.value) {
      let currentValue = cpfControl.value;

      // Garanta que currentValue é uma string
      if (currentValue && typeof currentValue !== 'string') {
        currentValue = currentValue.toString();
      }

      if (currentValue && currentValue.length > 11) {
        cpfControl.setValue(currentValue.slice(0, 11));
      }
    }
  }

  get cpf(): any {
    return this.formGroupTeacher.get("cpf");
  }

  get name(): any {
    return this.formGroupTeacher.get("name");
  }
}
