import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private hideLoginButtonSubject = new BehaviorSubject<boolean>(false);
  hideLoginButton$ = this.hideLoginButtonSubject.asObservable();

  setHideLoginButton(value: boolean): void {
    this.hideLoginButtonSubject.next(value);
  }

  private isCoordinatorSubject = new BehaviorSubject<boolean>(this.getIsCoordinatorFromStorage());
  isCoordinator$ = this.isCoordinatorSubject.asObservable();

  setIsCoordinator(value: boolean): void {
    this.isCoordinatorSubject.next(value);
    localStorage.setItem('isCoordinator', String(value));
  }

  getIsCoordinatorFromStorage(): boolean {
    const storedValue = localStorage.getItem('isCoordinator');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  }

  login(email: string, password: string): boolean {
    const validCredentials = email === 'coordenador@gmail.com' && password === '1234';
  
    if (validCredentials) {
      this.setIsCoordinator(true);
      this.setHideLoginButton(false);
    }
  
    return validCredentials;
  }  

  logout(): void {
    this.setIsCoordinator(false);
  }
}
