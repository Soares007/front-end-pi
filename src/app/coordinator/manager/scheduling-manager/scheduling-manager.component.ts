import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scheduling } from 'src/app/scheduling';
import { SchedulingService } from 'src/app/scheduling.service';

@Component({
  selector: 'app-scheduling-manager',
  templateUrl: './scheduling-manager.component.html',
  styleUrls: ['./scheduling-manager.component.css']
})
export class SchedulingManagerComponent implements OnInit{
  schedulings: Scheduling[] = [];

  constructor(
    private schedulingService: SchedulingService, private router: Router,  private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadSchedulings();
  }

  loadSchedulings(){
    this.schedulingService.getSchedulings().subscribe({
      next: (data) => (this.schedulings = data)
    });
  }

  create(){
    this.router.navigate(['createScheduling']);
  }

  edit(scheduling: Scheduling) {
    this.router.navigate(['schedulingDetails', scheduling.id]);
  }

  delete(scheduling: Scheduling) {
    this.schedulingService.delete(scheduling).subscribe({
      next: () => this.loadSchedulings()
    });
  }

  viewInformation(scheduling: Scheduling) {
    this.router.navigate(['scheduling-info', scheduling.id]);
  }

}