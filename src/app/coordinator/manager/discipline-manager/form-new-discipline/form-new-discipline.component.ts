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

  dayofweekOption: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  constructor(private disciplineService: DisciplineService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupDiscipline = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      teacher: [''],
      dayofweek: formBuilder.array(this.dayofweekOption.map(() => new FormControl(false))),
      starttime: [''],
      endtime: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (id) {
        this.getDisciplineById(id);
        this.isEditing = true; // Defina isEditing como true quando houver um ID
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
            teacher: data.teacher,
            starttime: data.starttime,
            endtime: data.endtime,
          });

          // Ajusta os valores dos checkboxes para os dias da semana
          const dayofweekArray = this.formGroupDiscipline.get('dayofweek') as FormArray;
          this.dayofweekOption.forEach((day, index) => {
            dayofweekArray.at(index).setValue(data.dayofweek.includes(day));
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

      // Mapeia os valores dos checkboxes para um array de strings
      const dayofweekArray = formValue.dayofweek as boolean[];
      formValue.dayofweek = dayofweekArray
        .map((checked: boolean, index: number) => checked ? this.dayofweekOption[index] : null)
        .filter((day: string | null) => day !== null)
        .join(', ');  // Junta os dias da semana em uma string separada por vírgulas

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

  toggleCheckbox(index: number) {
    const control = this.formGroupDiscipline.get('dayofweek.' + index) as FormControl;
    const currentValue = control.value;
  
    // Inverte o valor apenas se for diferente do valor original
    if (currentValue !== this.discipline.dayofweek[index]) {
      control.setValue(!currentValue);
    }
  }

  cancel() {
    this.router.navigate(['discipline-manager']);
  }

  get name() : any {
    return this.formGroupDiscipline.get('name');
  }
}
