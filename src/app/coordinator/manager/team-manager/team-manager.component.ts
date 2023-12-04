import { Team } from './../../../team';
import { Component } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent {

  teams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(){
    this.teamService.getTeams().subscribe({
      next: (data) => (this.teams = data)
    });
  }

  create(){
    this.router.navigate(['createTeam']);
  }

  edit(team: Team) {
    this.router.navigate(['teamDetails', team.id]);
  }

  delete(team: Team) {
    this.teamService.delete(team).subscribe({
      next: () => this.loadTeams()
    });
  }

  viewInformation(team: Team) {
    this.router.navigate(['team-info', team.id]);
  }
}
