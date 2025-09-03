import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

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

    // Variáveis para as novas funcionalidades
    idParaBaixa: number | null = null;
    quantidadeParaBaixa: number = 0;
    nomeParaBusca: string = '';

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

    // Método para dar baixa no estoque usando o formulário
    darBaixaNoEstoque(): void {
        if (!this.idParaBaixa || this.quantidadeParaBaixa <= 0) {
            this.feedback = 'ID e quantidade para baixa devem ser válidos.';
            this.feedbackColor = 'red';
            return;
        }
        
        const params = new HttpParams().set('quantidade', this.quantidadeParaBaixa.toString());
        this.http.put<Produtos>(`${this.apiUrl}/${this.idParaBaixa}/baixa`, {}, { params: params }).subscribe({
            next: (produtoAtualizado) => {
                this.feedback = `Baixa de ${this.quantidadeParaBaixa} itens do produto "${produtoAtualizado.nomeProduto}" realizada com sucesso!`;
                this.feedbackColor = 'green';
                this.fetchProdutos(); // Atualiza a lista
                this.idParaBaixa = null;
                this.quantidadeParaBaixa = 0;
            },
            error: (err) => {
                console.error('Erro ao dar baixa no estoque', err);
                this.feedback = err.error || 'Erro ao dar baixa no estoque.';
                this.feedbackColor = 'red';
            }
        });
    }

    // Novo método para dar baixa de 1 unidade diretamente da tabela
    darBaixaRapida(id: number | undefined): void {
        if (!id) {
            this.feedback = 'ID do produto não encontrado para dar baixa rápida.';
            this.feedbackColor = 'red';
            return;
        }
        
        const quantidadeParaBaixa = 1;
        const params = new HttpParams().set('quantidade', quantidadeParaBaixa.toString());
        this.http.put<Produtos>(`${this.apiUrl}/${id}/baixa`, {}, { params: params }).subscribe({
            next: (produtoAtualizado) => {
                this.feedback = `Baixa de 1 item do produto "${produtoAtualizado.nomeProduto}" realizada com sucesso!`;
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

    // Método para deletar um produto
    deletarProduto(id: number | undefined): void {
        if (!id) {
            this.feedback = 'ID do produto não encontrado.';
            this.feedbackColor = 'red';
            return;
        }

        this.http.delete(`${this.apiUrl}/${id}/delete`, { responseType: 'text' }).subscribe({
            next: (response) => {
                this.feedback = response; 
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

    buscarPorNome(): void {
        if (this.nomeParaBusca && this.nomeParaBusca.trim().length > 0) {
            this.http.get<Produtos[]>(`${this.apiUrl}/nome/${this.nomeParaBusca}`).subscribe({
                next: (produtosEncontrados) => {
                    if (produtosEncontrados.length > 0) {
                        this.feedback = `${produtosEncontrados.length} produto(s) encontrado(s)!`;
                        this.feedbackColor = 'blue';
                        this.produtos = produtosEncontrados;
                    } else {
                        this.feedback = 'Nenhum produto encontrado com este nome.';
                        this.feedbackColor = 'red';
                        this.produtos = [];
                    }
                },
                error: (err) => {
                    console.error('Erro ao buscar produto por nome', err);
                    this.feedback = 'Erro ao buscar produto por nome. Verifique o servidor.';
                    this.feedbackColor = 'red';
                    this.produtos = [];
                }
            });
        } else {
            this.feedback = 'Nome do produto não fornecido.';
            this.feedbackColor = 'orange';
            this.fetchProdutos(); // Retorna para a lista completa
        }
    }

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
