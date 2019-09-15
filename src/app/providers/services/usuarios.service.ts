import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiURL: string = environment.api;

  constructor(private http: HttpClient) { }

  index() {
    const url = `${this.apiURL}/v1/usuarios`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  findEmail(email: string) {
    return this.http.post(`${this.apiURL}/auth/email`, { email });
  }

  usuarioLogado() {
    const url = `${this.apiURL}/v1/usuarios/logged-user`;
    return this.http.get(url);
  }

  update(payload?) {
    const url = `${this.apiURL}/v1/usuarios/${payload.id}`;
    console.log('url', url);
    return this.http.put(url, payload).pipe(map((data: any) => data.value));
  }
}


