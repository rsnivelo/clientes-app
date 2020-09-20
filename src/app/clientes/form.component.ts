import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public errores: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  crear(): void {
    this.clienteService.crear(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['/clientes'])
          Swal.fire('Nuevo Cliente', `Cliente ${cliente.nombres} creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
        }
    );
  }

  actualizar(): void {
    this.clienteService.actualizar(this.cliente)
    .subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente Actualizado', `Cliente ${json.cliente.nombres} - ${json.mensaje}.`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.buscarCliente(id).subscribe(
          cliente => this.cliente = cliente
        )
      }
    })
  }

}
