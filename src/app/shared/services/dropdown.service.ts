import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EstadorBr } from '../model/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadorBr[]>('../../../assets/dados/estadosbr.json')
    .pipe(map(res => res));
  }
}
