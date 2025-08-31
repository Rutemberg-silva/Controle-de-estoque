import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './pages/produtos/produtos.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent // Adicione esta linha
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Adicione esta linha
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }