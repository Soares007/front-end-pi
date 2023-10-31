import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-new-teacher',
  templateUrl: './form-new-teacher.component.html',
  styleUrls: ['./form-new-teacher.component.css']
})
export class FormNewTeacherComponent {
  @Input() showFormNewTeacher: boolean = false;
  @Output() newTeacherAdded = new EventEmitter<any>();

  newTeacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.newTeacherForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      name: ['', Validators.required],
      discipline: ['', Validators.required],
    });
  }

  addNewTeacher() {
    const newTeacher = this.newTeacherForm.value;
    this.newTeacherAdded.emit(newTeacher);
    this.newTeacherForm.reset();
  }

}
