import {  NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "Gerente",loadComponent: () => import('./Gerente/main2.component'),
        children: [
            { path: "ConsultarProveedor", loadComponent:() => import('./consultar-proveedor/consultar-proveedor.component')},
            { path: "GuardarProducto", loadComponent: () => import('./guardar-producto/guardar-producto.component')},
            { path: "GuardarLotes", loadComponent: () => import('./guardar-lote/guardar-lote.component')},
            { path: "GenerarInforme", loadComponent: () => import('./generar-informe/generar-informe.component')}
        ]
    },
    {path: "Admin", loadComponent: () =>import('./Admin/main.component'),
        children:[
            { path: "ConsultarLotes",loadComponent: () => import('./consultar-lotes/consultar-lotes.component')},
            { path: "ConsultarProducto", loadComponent: () => import('./consultar-productos-existencia/consultar-productos-existencia.component')},
            { path: "GuardarProveedor", loadComponent: () => import('./guardar-proveedor/guardar-proveedor.component')},
            { path: "GenerarInforme", loadComponent: () => import('./generar-informe/generar-informe.component')}
        ]
    } 
];
