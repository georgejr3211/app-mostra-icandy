import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth$: Observable<string>;

  formCRUD: FormGroup;

  constructor(private authService: AuthService, private usuariosService: UsuariosService) {
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
      console.log('token', token);
      localStorage.setItem('auth/token', token);
    });

    this.usuariosService.index().subscribe(data => console.log('data', data));
  }

}
