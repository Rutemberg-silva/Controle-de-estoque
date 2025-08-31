import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from '../app/pages/produtos/produtos.component'; 

const routes: Routes = [
  { path: 'produtos', component: ProdutoComponent }, // Adicione esta linha
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }