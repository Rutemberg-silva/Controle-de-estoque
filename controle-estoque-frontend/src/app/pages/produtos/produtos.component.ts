import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para definir a estrutura de um produto
interface Produtos {
    id?: number; // O id é opcional porque é gerado pelo backend
    nomeProduto: string;
    preco: number;
    quantidadeEstoque: number;
    cor: string;
    fornecedor: string;
    descricao: string;
    tipoProduto: string;
}

@Component({
    selector: 'app-produto',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css']
})
export class ProdutoComponent implements OnInit {

    produtos: Produtos[] = [];

    // Lista de tipos de produto do seu Enum do backend
    tiposProduto: string[] = ['VESTIDO', 'BLUSA', 'SAIA', 'PERFUME', 'SHORT', 'BODY', 'CALCA', 'ACESSORIO'];

    // Objeto para vincular os dados do formulário
    novoProduto: Produtos = { 
        nomeProduto: '', 
        preco: 0, 
        quantidadeEstoque: 0,
        cor: '',
        fornecedor: '',
        descricao: '',
        tipoProduto: ''
    };
    
    feedback: string = '';
    feedbackColor: string = '';
    private apiUrl = 'http://localhost:8080/api/produtos';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchProdutos();
    }

    fetchProdutos(): void {
        this.http.get<Produtos[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.produtos = data;
            },
            error: (err) => {
                console.error('Erro ao buscar produtos', err);
                this.feedback = 'Erro ao carregar produtos. Verifique o servidor.';
                this.feedbackColor = 'red';
            }
        });
    }

    cadastrarProduto(): void {
        this.http.post<Produtos>(this.apiUrl, this.novoProduto).subscribe({
            next: (produtoSalvo) => {
                this.feedback = `Produto "${produtoSalvo.nomeProduto}" cadastrado com sucesso!`;
                this.feedbackColor = 'green';
                this.limparFormulario(); // Chama o novo método para limpar os campos
                this.fetchProdutos(); // Atualiza a lista de produtos na tela
            },
            error: (err) => {
                console.error('Erro ao cadastrar produto', err);
                this.feedback = 'Erro ao cadastrar produto. Verifique o servidor.';
                this.feedbackColor = 'red';
            }
        });
    }

    // Método para dar baixa no estoque
    darBaixaNoEstoque(id: number | undefined): void {
        if (!id) {
            this.feedback = 'ID do produto não encontrado.';
            this.feedbackColor = 'red';
            return;
        }

        const quantidadeStr = prompt('Quantos itens você quer dar baixa?');
        const quantidade = parseInt(quantidadeStr || '0');

        if (quantidade > 0) {
            const params = new HttpParams().set('quantidade', quantidade.toString());
            this.http.put<Produtos>(`${this.apiUrl}/${id}/baixa`, {}, { params: params }).subscribe({
                next: (produtoAtualizado) => {
                    this.feedback = `Baixa de ${quantidade} itens do produto "${produtoAtualizado.nomeProduto}" realizada com sucesso!`;
                    this.feedbackColor = 'green';
                    this.fetchProdutos(); // Atualiza a lista
                },
                error: (err) => {
                    console.error('Erro ao dar baixa no estoque', err);
                    this.feedback = err.error || 'Erro ao dar baixa no estoque.';
                    this.feedbackColor = 'red';
                }
            });
        }
    }

    // Método para deletar um produto
    deletarProduto(id: number | undefined): void {
        if (!id) {
            this.feedback = 'ID do produto não encontrado.';
            this.feedbackColor = 'red';
            return;
        }

        if (confirm('Tem certeza que deseja apagar este produto?')) {
            // Remova a opção { responseType: 'text' }
            this.http.delete<Produtos>(`${this.apiUrl}/${id}/delete`).subscribe({
                next: (produtoDeletado) => {
                    this.feedback = `Produto "${produtoDeletado.nomeProduto}" deletado com sucesso!`;
                    this.feedbackColor = 'green';
                    this.fetchProdutos(); // Atualiza a lista
                },
                error: (err) => {
                    console.error('Erro ao deletar produto', err);
                    this.feedback = err.error || 'Erro ao deletar produto.';
                    this.feedbackColor = 'red';
                }
            });
        }
    }

    // NOVO: Método para buscar produto por ID
    buscarPorId(): void {
      const idStr = prompt('Digite o ID do produto que deseja buscar:');
      const id = parseInt(idStr || '0');

      if (id > 0) {
        this.http.get<Produtos>(`${this.apiUrl}/${id}`).subscribe({
          next: (produtoEncontrado) => {
            this.feedback = `Produto "${produtoEncontrado.nomeProduto}" encontrado!`;
            this.feedbackColor = 'blue';
            // Você pode adicionar a lógica para exibir os detalhes do produto,
            // por exemplo, em uma modal ou em uma nova seção na página.
            // Por enquanto, apenas atualizamos o feedback e a lista de produtos
            this.produtos = [produtoEncontrado];
          },
          error: (err) => {
            console.error('Erro ao buscar produto por ID', err);
            this.feedback = 'Produto não encontrado.';
            this.feedbackColor = 'red';
            this.produtos = []; // Limpa a lista se o produto não for encontrado
          }
        });
      }
    }

    // Método para limpar os campos do formulário
    private limparFormulario(): void {
        this.novoProduto = {
            nomeProduto: '', 
            preco: 0, 
            quantidadeEstoque: 0,
            cor: '',
            fornecedor: '',
            descricao: '',
            tipoProduto: ''
        };
    }
}
