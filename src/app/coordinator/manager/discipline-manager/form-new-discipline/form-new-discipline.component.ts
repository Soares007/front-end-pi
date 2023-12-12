import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';

@Component({
  selector: 'app-form-new-discipline',
  templateUrl: './form-new-discipline.component.html',
  styleUrls: ['./form-new-discipline.component.css']
})
export class FormNewDisciplineComponent {

  discipline: Discipline = {} as Discipline;

  formGroupDiscipline: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private disciplineService: DisciplineService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupDiscipline = formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u017F\s]*[a-zA-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F\s]*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\u00C0-\u017F]*[a-zA-Z\u00C0-\u017F][a-zA-Z0-9\u00C0-\u017F\s]*$/)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (id) {
        this.getDisciplineById(id);
        this.isEditing = true;
      } else {
        this.formGroupDiscipline.reset();
        this.isEditing = false;
      }
    });
  }

  getDisciplineById(id: number) {
    this.disciplineService.getDiscipline(id).subscribe({
      next: (data: Discipline) => {
        if (data) {
          this.formGroupDiscipline.patchValue({
            id: data.id,
            name: data.name,
            description: data.description,
          });

          this.isEditing = true;
        }
      }
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupDiscipline.valid) {
      const formValue = this.formGroupDiscipline.value;
      if (this.isEditing) {
        this.disciplineService.update(formValue).subscribe({
          next: () => {
            this.router.navigate(['discipline-manager']);
          }
        });
      } else {
        this.disciplineService.save(formValue).subscribe({
          next: () => {
            this.router.navigate(['discipline-manager']);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['discipline-manager']);
  }

  get name(): any {
    return this.formGroupDiscipline.get('name');
  }
}
