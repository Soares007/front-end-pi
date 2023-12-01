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

  disciplines: Discipline[] = [];
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService, private disciplineService: DisciplineService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupTeacher = formBuilder.group({
      id: [''],
      cpf: ['', [Validators.required]],
      name: ['', [Validators.required]],
      school_subject: this.formBuilder.array([]),
    });
  }

  get schoolSubjectArray(): FormArray {
    return this.formGroupTeacher.get('school_subject') as FormArray;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getTeacherById(id);
    }

    this.loadSchoolSubject();
  }

  loadSchoolSubject() {
    this.disciplineService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });
  }

  getTeacherById(id: number) {
    this.teacherService.getTeacher(id).subscribe({
      next: data => {
        while (this.schoolSubjectArray.length !== 0) {
          this.schoolSubjectArray.removeAt(0);
        }

        this.formGroupTeacher.setValue({
          id: data.id,
          cpf: data.cpf,
          name: data.name,
          school_subject: []
        });

        if (Array.isArray(data.school_subject)) {
          data.school_subject.forEach(teacherId => {
            this.schoolSubjectArray.push(this.formBuilder.control(teacherId));
          });
        }

        this.isEditing = true;
      }
    });
  }

  save() {
    this.submitted = true;
  
    if (this.formGroupTeacher.valid) {
      let data: any; // Declare 'data' here
  
      const formValue = this.formGroupTeacher.value;
      const schoolSubjectValues = this.schoolSubjectArray.value;
      formValue.school_subject = schoolSubjectValues;
  
      if (this.isEditing) {
        this.teacherService.getTeacher(formValue.id).subscribe({
          next: responseData => {
            data = responseData;
            
            const oldSchoolSubjectsArray = Array.isArray(data.school_subject) ? data.school_subject : [];
            const subjectsToRemove = Array.isArray(oldSchoolSubjectsArray) ? oldSchoolSubjectsArray.filter((subj: number) => !schoolSubjectValues.includes(subj)) : [];
            const subjectsToAdd = Array.isArray(schoolSubjectValues) ? schoolSubjectValues.filter((subj: number) => !oldSchoolSubjectsArray.includes(subj)) : [];
  
            formValue.school_subject = subjectsToAdd;
  
            if (subjectsToRemove.length > 0) {
              this.teacherService.removeSubjectsFromTeacher(formValue.id, subjectsToRemove).subscribe();
            }
  
            this.teacherService.update(formValue).subscribe({
              next: () => {
                this.router.navigate(['teacher-manager']);
              }
            });
          }
        });
      } else {
        this.teacherService.save(formValue).subscribe({
          next: () => {
            this.router.navigate(['teacher-manager']);
          }
        });
      }
    }
  }

  toggleSchoolSubject(schoolSubjectId: number): void {
    const schoolSubjectArray = this.schoolSubjectArray;

    // Check if the timeId is already in the array
    const index = schoolSubjectArray.value.indexOf(schoolSubjectId);

    if (index === -1) {
      // If not in the array, add it
      schoolSubjectArray.push(this.formBuilder.control(schoolSubjectId));
    } else {
      // If already in the array, remove it
      schoolSubjectArray.removeAt(index);
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
