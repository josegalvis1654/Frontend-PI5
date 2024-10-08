import {  NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConsultarLotesComponent } from './consultar-lotes/consultar-lotes.component';
import { ConsultarProductosExistenciaComponent } from './consultar-productos-existencia/consultar-productos-existencia.component';
import { ConsultarProveedorComponent } from './consultar-proveedor/consultar-proveedor.component';
import { GenerarInformeComponent } from './generar-informe/generar-informe.component';
import { GuardarLoteComponent } from './guardar-lote/guardar-lote.component';
import { GuardarProductoComponent } from './guardar-producto/guardar-producto.component';
import { GuardarProveedorComponent } from './guardar-proveedor/guardar-proveedor.component';
import { ModificarLoteComponent } from './modificar-lote/modificar-lote.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { Main2Component } from './Gerente/main2.component';
import { MainComponent } from './Admin/main.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "ConsultarLotes", component: ConsultarLotesComponent},
    {path: "ConsultarProducto", component: ConsultarProductosExistenciaComponent},
    {path: "ConsultarProveedor", component: ConsultarProveedorComponent},
    {path: "GenerarInforme", component: GenerarInformeComponent},
    {path: "GuardarLote", component: GuardarLoteComponent},
    {path: "GuardarProducto", component: GuardarProductoComponent},
    {path: "GuardarProveedor", component: GuardarProveedorComponent},
    {path: "ModificarLote", component: ModificarLoteComponent},
    {path: "ModificarProducto", component: ModificarProductoComponent},
    {path: "ModificarProveedor", component: ModificarProveedorComponent},
    {path: "Gerente", component: Main2Component},
    {path: "Admin", component: MainComponent}
];
