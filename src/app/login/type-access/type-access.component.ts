import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-type-access',
  templateUrl: './type-access.component.html',
  styleUrls: ['./type-access.component.css']
})
export class TypeAccessComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Oculta o botão de login ao entrar nesta página
    this.authService.setHideLoginButton(true);
  }

  ngOnDestroy(): void {
    // Garante que o botão de login seja exibido ao sair desta página
    this.authService.setHideLoginButton(false);
  }
}
