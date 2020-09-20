import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
        let page: number = +params.get('page');

        if (!page) {
          page = 0;
        }
        this.clienteService.getClientes(page).subscribe(
          response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          }
        );
      }
    );
  }

  delete(cliente: Cliente): void {
      Swal.fire({
        title: 'Está seguro de eliminar?',
        text: `Se va a eliminar ${cliente.nombres} ${cliente.apellidos}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            this.clienteService.borrar(cliente.id).subscribe(
              response => {
                Swal.fire(
                  'Se ha borrado su registro',
                  `Se eliminó ${cliente.nombres} ${cliente.apellidos}.`,
                  'success'
                )
              }
            )

          }
      })
  }
}
