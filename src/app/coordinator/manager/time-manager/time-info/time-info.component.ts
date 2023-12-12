import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisciplineService } from 'src/app/discipline.service';
import { Time } from 'src/app/time';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-time-info',
  templateUrl: './time-info.component.html',
  styleUrls: ['./time-info.component.css']
})
export class TimeInfoComponent {
  times: Time[] = [];
  time?: Time;
  disciplineName: string = '';
 
  constructor(
    private timeService: TimeService,
    private disciplineServie: DisciplineService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.loadTimes();

    const timeId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(timeId)) {
      this.timeService.getTime(timeId).subscribe({
        next: (data: Time) => {
          this.time = data;
          this.loadDisciplineName(data.classSubjectId);
        },
        error: (error: any) => {
          console.error('Erro ao obter informações do Turma:', error);
        }
      });
    } else {
      console.error('ID de turma inválido');
    }
  }

  loadDisciplineName(disciplineId: number): void {
    this.disciplineServie.getDiscipline(disciplineId).subscribe({
      next: (classSubjectId) => {
        this.disciplineName = classSubjectId.name;
      },
      error: (error) => {
        console.error('Erro ao obter nome da disciplina:', error);
      }
    });
  }

  loadTimes() {
    this.timeService.getTimes().subscribe((times) => {
      this.times = times;
    });
  }

  formatTime(time: string[] | undefined): string {
    if (!time || time.length === 0) {
      return 'N/A';
    }

    // Junte as strings do array e remova as vírgulas
    const formattedTime = time.join(', ').replace(/,/g, '');
  
    return formattedTime;
  }
  
  
}
