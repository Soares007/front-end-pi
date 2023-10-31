import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css'],
})
export class CoordinatorComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const isCoordinator = this.authService.getIsCoordinatorFromStorage();
    this.authService.setIsCoordinator(isCoordinator);
    this.authService.setHideLoginButton(!isCoordinator);
  }

  hideLoginButton(): void {
    this.authService.setHideLoginButton(true);
  }
}
