import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiURL: string = environment.api;

  constructor(private http: HttpClient) { }

  index() {
    const url = `${this.apiURL}/v1/produtos`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }
}


