
import { Routes } from '@angular/router';
import { ProdutoComponent } from './pages/produtos/produtos.component';
import { ClienteComponent } from './pages/clientes/cliente.component';

export const routes: Routes = [
  // Rota para o componente de produtos
  { path: 'produtos', component: ProdutoComponent },
  
  // NOVO: Rota para o componente de clientes
  { path: 'clientes', component: ClienteComponent },

  // Redirecionamento padrão para a página de produtos
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  
  // Rota para tratar páginas não encontradas (opcional)
  { path: '**', redirectTo: '/produtos' }
];