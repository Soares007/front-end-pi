import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/teacher';
import { TeacherService } from 'src/app/teacher.service';

@Component({
  selector: 'app-teacher-manager',
  templateUrl: './teacher-manager.component.html',
  styleUrls: ['./teacher-manager.component.css']
})
export class TeacherManagerComponent implements OnInit {

  teachers: Teacher[] = [];

  constructor(
    private teacherService: TeacherService, 
    private router: Router,  
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(){
    this.teacherService.getTeachers().subscribe({
      next: (data) => (this.teachers = data)
    });
  }

  create(){
    this.router.navigate(['createTeacher']);
  }

  edit(teacher: Teacher) {
    this.router.navigate(['teacherDetails', teacher.id]);
  }  

  delete(teacher: Teacher) {
    this.teacherService.delete(teacher).subscribe({
      next: () => this.loadTeachers()
    });
  }

  viewInformation(teacher: Teacher) {
    this.router.navigate(['user-info', teacher.id]);
  }
}
