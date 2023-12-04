import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/team';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent {
  teams: Team[] = [];
  team?: Team;


  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.loadTeams();

    const teamId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(teamId)) {
      this.teamService.getTeam(teamId).subscribe({
        next: (data: Team) => {
          this.team = data;
        },
        error: (error: any) => {
          console.error('Erro ao obter informações do Turma:', error);
        }
      });
    } else {
      console.error('ID de turma inválido');
    }
  }

  loadTeams() {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }
}
