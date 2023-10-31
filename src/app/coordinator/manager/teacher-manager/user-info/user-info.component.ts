import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  teacherInfo: any;

  constructor(private route: ActivatedRoute) {
    // Obtenha as informações do professor dos parâmetros da rota
    const teacherInfoString = this.route.snapshot.paramMap.get('teacherInfo');
    this.teacherInfo = JSON.parse(teacherInfoString || '{}');
  }
}
