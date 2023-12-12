import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Time } from 'src/app/time';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.css']
})
export class TimeManagerComponent {
  times: Time[] = [];

  constructor(
    private timeService: TimeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTimes();
  }

  loadTimes(){
    this.timeService.getTimes().subscribe({
      next: (data) => (this.times = data)
    });
  }

  create(){
    this.router.navigate(['createTime']);
  }

  edit(time: Time) {
    this.router.navigate(['timeDetails', time.id]);
  }

  delete(time: Time) {
    this.timeService.delete(time).subscribe({
      next: () => this.loadTimes()
    });
  }

  viewInformation(time: Time) {
    this.router.navigate(['time-info', time.id]);
  }
}
