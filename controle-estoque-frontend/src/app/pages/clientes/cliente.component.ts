import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definindo a interface para o tipo de cliente (CPF ou CNPJ)
enum EnumTipoCliente {
  CPF = 'CPF',
  CNPJ = 'CNPJ'
}

// Definindo a interface para um cliente
interface Cliente {
  idPessoa?: number;
  nome: string;
  telefone:string;
  email: string;
  tipoCliente: EnumTipoCliente;
  cpfCnpj: string;
  endereco: string;
}

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  novoCliente: Cliente = {
    nome: '',
    telefone: '',
    email: '',
    tipoCliente: EnumTipoCliente.CPF,
    cpfCnpj: '', 
    endereco: '' 
  };
  feedback: string = '';
  feedbackColor: string = '';
  private apiUrl = 'http://localhost:8080/api/clientes';

  // Acessa o enum no template
  tipoClienteEnum = EnumTipoCliente;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchClientes();
  }

  fetchClientes(): void {
    this.http.get<Cliente[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Erro ao buscar clientes', err);
        this.feedback = 'Erro ao carregar clientes. Verifique o servidor.';
        this.feedbackColor = 'red';
      }
    });
  }

  cadastrarCliente(): void {
    this.http.post<Cliente>(this.apiUrl, this.novoCliente).subscribe({
      next: (clienteSalvo) => {
        this.feedback = `Cliente "${clienteSalvo.nome}" cadastrado com sucesso!`;
        this.feedbackColor = 'green';
        this.limparFormulario();
        this.fetchClientes();
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente', err);
        this.feedback = 'Erro ao cadastrar cliente. Verifique o servidor.';
        this.feedbackColor = 'red';
      }
    });
  }

  // Método para buscar cliente por ID
  buscarClientePorId(): void {
    const idStr = prompt('Digite o ID do cliente que deseja buscar:');
    const id = parseInt(idStr || '0');

    if (id > 0) {
      this.http.get<Cliente>(`${this.apiUrl}/${id}`).subscribe({
        next: (clienteEncontrado) => {
          this.feedback = `Cliente "${clienteEncontrado.nome}" encontrado!`;
          this.feedbackColor = 'blue';
          this.clientes = [clienteEncontrado];
        },
        error: (err) => {
          console.error('Erro ao buscar cliente por ID', err);
          this.feedback = 'Cliente não encontrado.';
          this.feedbackColor = 'red';
          this.clientes = [];
        }
      });
    }
  }

  // Novo método para deletar um cliente
  deletarCliente(cliente: Cliente): void {
    if (cliente.idPessoa && confirm(`Tem certeza que deseja deletar o cliente "${cliente.nome}"?`)) {
      this.http.delete<void>(`${this.apiUrl}/${cliente.idPessoa}/delete`).subscribe({
        next: () => {
          this.feedback = `Cliente "${cliente.nome}" deletado com sucesso!`;
          this.feedbackColor = 'red';
          this.fetchClientes();
        },
        error: (err) => {
          console.error('Erro ao deletar cliente', err);
          this.feedback = 'Erro ao deletar cliente. Verifique o servidor.';
          this.feedbackColor = 'red';
        }
      });
    }
  }




  limparFormulario(): void {
    this.novoCliente = {
      nome: '',
      telefone: '',
      email: '',
      tipoCliente: EnumTipoCliente.CPF,
      cpfCnpj: '',
      endereco: ''
    };
  }
}
