import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL: string = environment.api;

  constructor(private http: HttpClient) { }

  auth(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/v1/categorias`, { email, password });
  }
}


