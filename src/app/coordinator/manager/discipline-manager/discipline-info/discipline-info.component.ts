import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';

@Component({
  selector: 'app-discipline-info',
  templateUrl: './discipline-info.component.html',
  styleUrls: ['./discipline-info.component.css']
})
export class DisciplineInfoComponent {
  discipline: Discipline = {} as Discipline;

  constructor(
    private disciplineService: DisciplineService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const disciplineId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(disciplineId)) {
      this.disciplineService.getDiscipline(disciplineId).subscribe({
        next: (data: Discipline) => (this.discipline = data)
      });
    } else {
      console.error('ID da Disciplina inválido');
    }
  }
}
