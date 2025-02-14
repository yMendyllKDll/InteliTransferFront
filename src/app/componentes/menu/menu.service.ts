import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly API =
    'http://localhost:8080/InteliTransfer/v1/transferencia';

  constructor(private http: HttpClient) {}

  listarTransferencias(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  criarTransferencia(transferencia: any): Observable<any> {
    return this.http.post<any>(this.API, transferencia);
  }
}
