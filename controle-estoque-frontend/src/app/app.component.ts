import { Component } from '@angular/core';
import { ProdutoComponent } from '../app/pages/produtos/produtos.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // Adicionando RouterOutlet aos imports
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controle-estoque-frontend';
}