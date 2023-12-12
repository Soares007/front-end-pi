import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-coordinator',
  templateUrl: './login-coordinator.component.html',
  styleUrls: ['./login-coordinator.component.css']
})
export class LoginCoordinatorComponent {
  formGroupLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroupLogin = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    const { email, password } = this.formGroupLogin.value;
    const loginSuccess = this.authService.login(email, password);

    if (loginSuccess) {
      this.router.navigate(['/access-coordinator']);
    } else {
      alert('Login falhou. Verifique suas credenciais.');
    }
  }
}
