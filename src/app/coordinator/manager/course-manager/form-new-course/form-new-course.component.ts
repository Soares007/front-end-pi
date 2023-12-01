import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';

@Component({
  selector: 'app-form-new-course',
  templateUrl: './form-new-course.component.html',
  styleUrls: ['./form-new-course.component.css']
})
export class FormNewCourseComponent {
  formGroupCourse: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  classSubjects: Discipline[] = [];

  availableYears: number[] = [];

  constructor(
    private courseService: CourseService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroupCourse = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      courseYear: [''],
      semester: [''],
      shift: ['', [Validators.required]],
      classSubjects: this.formBuilder.array([]),
    });
  }

  get classSubjectArray(): FormArray {
    return this.formGroupCourse.get('classSubjects') as FormArray;
  }


  ngOnInit(): void {
    this.availableYears = this.generateYearList();
    this.loadClassSubjects();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if(id){
      this.getCourseById(id);
    }
  }

  generateYearList(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = currentYear; i <= currentYear + 9; i++) {
      years.push(i);
    }

    return years;
  }

  loadClassSubjects(){
    this.disciplineService.getDisciplines().subscribe((classSubjects) => {
      this.classSubjects = classSubjects;
    });
  }

  getCourseById(id: number) {
    this.courseService.getCourse(id).subscribe({
      next: data => {
        while (this.classSubjectArray.length !== 0) {
          this.classSubjectArray.removeAt(0);
        }

        this.formGroupCourse.setValue({
          id: data.id,
          name: data.name,
          courseYear: data.courseYear,
          semester: data.semester,
          shift: data.shift,
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

    if (this.formGroupCourse.valid) {
      if (this.classSubjectArray.length > 0) {
        if (this.isEditing) {
          this.courseService.update(this.formGroupCourse.value).subscribe({
            next: () => {
              this.router.navigate(['course-manager']);
            }
          });
        } else {
          this.courseService.save(this.formGroupCourse.value).subscribe({
            next: () => {
              this.router.navigate(['course-manager']);
            }
          });
        }
      } else {
        // Defina um erro personalizado no FormGroup para acionar a exibição da mensagem de erro no template
        this.formGroupCourse.get('classSubjects')?.setErrors({ 'required': true });
      }
    }
  }

  toggleClassSubject(classSubjectsId: number): void {
    const classSubjectArray = this.classSubjectArray;

    // Check if the timeId is already in the array
    const index = classSubjectArray.value.indexOf(classSubjectsId);

    if (index === -1) {
      // If not in the array, add it
      classSubjectArray.push(this.formBuilder.control(classSubjectsId));
    } else {
      // If already in the array, remove it
      classSubjectArray.removeAt(index);
    }
  }

  cancel() {
    this.router.navigate(['course-manager']);
  }

  get name() {
    return this.formGroupCourse.get('name');
  }

  get shift() {
    return this.formGroupCourse.get('shift');
  }
}
