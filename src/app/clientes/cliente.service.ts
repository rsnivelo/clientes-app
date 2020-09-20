import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import {Cliente} from './cliente';
import {Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private url:string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getClientes(page: number): Observable<any> {
    // return this.httpClient.get<Cliente[]>(this.url);
    return this.httpClient.get(this.url + "/page/" + page).pipe(
        tap( (response: any) => {
          // let clientes = response as Cliente[];
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombres);
          })
        }),
        map( (response: any) => {
          (response.content as Cliente[]).map(cliente => {
            cliente.nombres = cliente.nombres.toUpperCase();
            // cliente.apellidos = cliente.apellidos.toUpperCase();
            // cliente.createdAt = formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en-US');
            let datePipe = new DatePipe('es');
            // cliente.createdAt =  datePipe.transform(cliente.createdAt, 'EEEE dd, MMMM yyyy');
            return cliente;
          });
          return response;
        }),
        tap(response => {
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombres);
          })
        })
  );
  }

  crear(cliente: Cliente) : Observable<Cliente> {
    return this.httpClient.post(this.url, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 404) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  actualizar(cliente: Cliente) : Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 404) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  borrar(id: number) : Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  buscarCliente(id): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al buscar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
