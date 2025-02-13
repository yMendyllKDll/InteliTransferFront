import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciasComponent } from './componentes/menu/transferencias/transferencias.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Transferencias',
    pathMatch: 'full'
  },
  {
    path: 'Transferencias',
    component: TransferenciasComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
