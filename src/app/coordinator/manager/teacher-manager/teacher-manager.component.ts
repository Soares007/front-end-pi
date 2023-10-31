import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-manager',
  templateUrl: './teacher-manager.component.html',
  styleUrls: ['./teacher-manager.component.css']
})
export class TeacherManagerComponent {
  constructor(private router: Router) { }
  selectedTeacher: string = '';
  listOfTeachers: any[] = [];
  showFormNewTeacher: boolean = false;
  selectedTeacherInfo: any;

  newTeacher: any = {};
  isOptionSelected(): boolean {
    return this.selectedTeacher !== undefined && this.selectedTeacher !== '';
  }

  addNewTeacher() {
    // Define a propriedade para mostrar o formulário
    this.showFormNewTeacher = true;
  }

  saveNewTeacher(newTeacher: any) {
    // Adiciona o novo professor à lista
    this.listOfTeachers.push(newTeacher);

    // Limpa os dados do novo professor
    this.newTeacher = {};

    // Oculta o formulário
    this.showFormNewTeacher = false;
  }

  toggleFormNewTeacher() {
    this.showFormNewTeacher = !this.showFormNewTeacher;
  }

  // Adiciona esse método para lidar com o evento emitido pelo FormNewTeacherComponent
  onNewTeacherAdded(newTeacher: any) {
    this.saveNewTeacher(newTeacher);
  }

  onSelectTeacher() {
    // Encontre as informações do professor com base no CPF selecionado
    this.selectedTeacherInfo = this.listOfTeachers.find(teacher => teacher.cpf === this.selectedTeacher);
  }

  viewInformation() {
    // Navegue para a página user-info e passe as informações como parâmetros
    this.router.navigate(['/user-info', { teacherInfo: JSON.stringify(this.selectedTeacherInfo) }]);
  }

}
