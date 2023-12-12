import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/course';
import { CourseService } from 'src/app/course.service';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';
import { Time } from 'src/app/time';
import { TimeService } from 'src/app/time.service';


@Component({
  selector: 'app-form-new-time',
  templateUrl: './form-new-time.component.html',
  styleUrls: ['./form-new-time.component.css']
})
export class FormNewTimeComponent {
  formGroupTime: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  dayofweekOption: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  classSubjectIds: Discipline[] = [];

  constructor(private timeService: TimeService, private courseService: CourseService, private disciplineService: DisciplineService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupTime = formBuilder.group({
      id: [''],
      classSubjectId: ['', [Validators.required]],
      daysofweek: formBuilder.array(this.dayofweekOption.map(() => new FormControl(false))),
      startTimes: this.formBuilder.array(this.dayofweekOption.map(() => new FormControl(''))),
      endTimes: this.formBuilder.array(this.dayofweekOption.map(() => new FormControl(''))),
    });
  }

  getDaysofweekControl(index: number): FormControl | null {
    const daysofweekControl = this.formGroupTime.get('daysofweek') as FormArray;

    if (daysofweekControl instanceof FormArray && daysofweekControl.at(index) instanceof FormControl) {
      return daysofweekControl.at(index) as FormControl;
    }

    return null;
  }

  ngOnInit(): void {
    this.loadDisciplines();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getTimeById(id);
    } else {
      // Inicializa os arrays startTimes e endTimes quando não está no modo de edição
      this.initializeTimeArrays();
    }
  }

  initializeTimeArrays() {
    const startTimesArray = this.formGroupTime.get('startTimes') as FormArray;
    const endTimesArray = this.formGroupTime.get('endTimes') as FormArray;

    this.dayofweekOption.forEach(() => {
      startTimesArray.push(new FormControl(''));
      endTimesArray.push(new FormControl(''));
    });
  }


  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe({
      next: (data) => (this.classSubjectIds = data)
    });
  }

  getTimeById(id: number) {
    this.timeService.getTime(id).subscribe({
      next: (data: Time) => {
        if (data) {
          console.log('Data received:', data);

          this.formGroupTime.patchValue({
            id: data.id,
            classSubjectId: data.classSubjectId,
          });

          // Ajusta os valores dos checkboxes para os dias da semana
          const dayofweekArray = this.formGroupTime.get('daysofweek') as FormArray;
          this.dayofweekOption.forEach((day, index) => {
            dayofweekArray.at(index).setValue(data.daysofweek.includes(day), { emitEvent: false });
          });

          //Atualiza startTimes e endTimes
          const startTimesArray = this.formGroupTime.get('startTimes') as FormArray;
          const endTimesArray = this.formGroupTime.get('endTimes') as FormArray;

          // Cria arrays com valores padrão para evitar problemas indefinidos
          const defaultStartTimes = new Array(this.dayofweekOption.length).fill('');
          const defaultEndTimes = new Array(this.dayofweekOption.length).fill('');

          startTimesArray.setValue(defaultStartTimes);
          endTimesArray.setValue(defaultEndTimes);

          this.dayofweekOption.forEach((day, index) => {
            startTimesArray.at(index).setValue(data.startTimes[index]);
            endTimesArray.at(index).setValue(data.endTimes[index]);
          });


          this.isEditing = true;
        }
      }
    });
  }

  save() {
    this.submitted = true;

    if (this.formGroupTime.valid) {
      const startTimesArray = this.formGroupTime.get('startTimes') as FormArray;
      const endTimesArray = this.formGroupTime.get('endTimes') as FormArray;

      // Verifica se algum dos horários é "00:00"
      if (startTimesArray.controls.some(control => control.value === '00:00') ||
        endTimesArray.controls.some(control => control.value === '00:00')) {
        this.showErrorAlert('Horário inválido! Por favor, selecione horários diferentes de "00:00".');
        return; // Impede a continuação do salvamento
      }

      const formValue = this.formGroupTime.value;

      const selectedDays = this.dayofweekOption
        .filter((day, index) => formValue.daysofweek[index])
        .map(day => day.trim()) // Remove espaços extras
        .filter(day => !!day); // Remove valores vazios

      console.log('Selected Days:', selectedDays);

      formValue.daysofweek = selectedDays.join(',');

      // Verifica se todos os dias selecionados têm horários definidos
      if (selectedDays.length === 0) {
        this.showErrorAlert('Selecione pelo menos um dia da semana para definir horários.');
        return; // Impede a continuação do salvamento
      }

      if (this.isEditing) {
        this.timeService.update(formValue).subscribe({
          next: () => {
            this.router.navigate(['time-manager']);
          }
        });
      } else {
        this.timeService.save(formValue).subscribe({
          next: () => {
            this.router.navigate(['time-manager']);
          }
        });
      }
    }
  }

  private showErrorAlert(message: string): void {
    alert(`Erro: ${message}`);
  }

  toggleCheckbox(index: number) {
    const control = this.getDaysofweekControl(index);
    const startTimesArray = this.formGroupTime.get('startTimes') as FormArray;
    const endTimesArray = this.formGroupTime.get('endTimes') as FormArray;

    if (control && startTimesArray && endTimesArray) {
      control.setValue(!control.value);

      // Verifica se existem controles no índice antes de tentar acessá-los
      if (startTimesArray.controls[index] && endTimesArray.controls[index]) {
        const startTimeControl = startTimesArray.at(index) as FormControl;
        const endTimeControl = endTimesArray.at(index) as FormControl;

        if (startTimeControl && endTimeControl) {
          startTimeControl.setValue('');
          endTimeControl.setValue('');
        } else {
          console.error('Controls are undefined at index:', index);
        }

      }
    }
  }

  cancel() {
    this.router.navigate(['time-manager']);
  }

  get classSubjectId(): any {
    return this.formGroupTime.get("classSubjectId");
  }

}
