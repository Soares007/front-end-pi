import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCoordinator: boolean = false;
  hideLoginButton: boolean = false;
  HOME_ROUTE = '/home';

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouteChange(event.url);
      }
    });

    this.authService.isCoordinator$.subscribe((isCoordinator) => {
      this.isCoordinator = isCoordinator;
    });

    this.authService.hideLoginButton$.subscribe((hideLoginButton) => {
      this.hideLoginButton = hideLoginButton;
    });
  }

  private handleRouteChange(url: string): void {
    const hideLoginButton = url.includes('/type-access') || url.includes('/login');
  
    if (this.authService.setHideLoginButton) {
      this.authService.setHideLoginButton(hideLoginButton);
    }
  }
  
  logout(): void {
    if (this.authService.setIsCoordinator) {
      this.authService.setIsCoordinator(false);
    }

    if (this.authService.setHideLoginButton) {
      this.authService.setHideLoginButton(false);
    }

    if (this.isCoordinator) {
      this.router.navigate(['/access-coordinator']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
