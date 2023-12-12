import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Discipline } from 'src/app/discipline';
import { DisciplineService } from 'src/app/discipline.service';

@Component({
  selector: 'app-discipline-manager',
  templateUrl: './discipline-manager.component.html',
  styleUrls: ['./discipline-manager.component.css']
})
export class DisciplineManagerComponent {
  disciplines: Discipline[] = [];

  constructor(
    private displineService: DisciplineService, private router: Router,  private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadDisciplines();
  }

  loadDisciplines(){
    this.displineService.getDisciplines().subscribe({
      next: (data) => (this.disciplines = data)
    });
  }

  create(){
    this.router.navigate(['createDiscipline']);
  }

  edit(discipline: Discipline) {
    this.router.navigate(['disciplineDetails', discipline.id]);
  }

  delete(discipline: Discipline) {
    this.displineService.delete(discipline).subscribe({
      next: () => this.loadDisciplines()
    });
  }

  viewInformation(discipline: Discipline) {
    this.router.navigate(['discipline-info', discipline.id]);
  }

}