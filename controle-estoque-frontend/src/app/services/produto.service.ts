import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // URL base da sua API de produtos
  private apiUrl = '/api/produtos'; 

  constructor(private http: HttpClient) { }

  // Método para buscar a lista de todos os produtos
  getProdutos(): Observable<any[]> {
    //return this.http.get<any[]>(this.apiUrl);
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Dados recebidos da API:', data);
      })
    );
  }
}