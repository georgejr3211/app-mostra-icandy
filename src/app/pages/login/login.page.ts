import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth$: Observable<string>;

  formCRUD: FormGroup;

  constructor(private authService: AuthService, private usuariosService: UsuariosService, private router: Router) {
    this.formCRUD = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }, { updateOn: 'change' });
  }

  ngOnInit() {
    this.auth$ = this.authService.auth('georgefeitosajr12@gmail.com', 'georgejr');
  }

  onLogin() {
    const email = this.formCRUD.get('email').value;
    const password = this.formCRUD.get('password').value;
    this.authService.auth(email, password).subscribe(token => {
      if (token) {
        localStorage.setItem('auth/token', token);
        this.router.navigate(['/home']);
      }
    });
  }

}
