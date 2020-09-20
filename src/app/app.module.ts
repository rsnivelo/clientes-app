import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { ClienteService } from './clientes/cliente.service';
import { FormComponent } from './clientes/form.component';

import { registerLocaleData } from '@angular/common';

import { FormsModule } from '@angular/forms';
import localeES from '@angular/common/locales/es';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeES, 'es');

const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full'},
    { path: 'clientes', component: ClientesComponent},
    { path: 'clientes/page/:page', component: ClientesComponent},
    { path: 'clientes/form', component: FormComponent},
    { path: 'clientes/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    ClienteService,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
