import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para definir a estrutura de um usuário
interface Usuarios {
    idPessoa?: number; 
    nome: string;
    email: string;
    cpfCnpj: number;
    endereco: string;
    telefone: number;
    tipoUsuario: string;
}

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    usuarios: Usuarios[] = [];
    tiposUsuario: string[] = ['ADM', 'STANDARD'];

    // Objeto para vincular os dados do formulário
    novoUsuario: Usuarios = {
        nome: '',
        email: '',
        cpfCnpj: 0,
        endereco: '',
        telefone: 0,
        tipoUsuario: ''
    };
    
    feedback: string = '';
    feedbackColor: string = '';
    private apiUrl = 'http://localhost:8080/api/usuarios';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchUsuarios();
    }

    fetchUsuarios(): void {
        this.http.get<Usuarios[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.usuarios = data;
            },
            error: (err) => {
                console.error('Erro ao buscar usuários', err);
                this.feedback = 'Erro ao carregar usuários. Verifique o servidor.';
                this.feedbackColor = 'red';
            }
        });
    }

    cadastrarUsuario(): void {
        this.http.post<Usuarios>(this.apiUrl, this.novoUsuario).subscribe({
            next: (usuarioSalvo) => {
                this.feedback = `Usuário "${usuarioSalvo.nome}" cadastrado com sucesso!`;
                this.feedbackColor = 'green';
                this.limparFormulario();
                this.fetchUsuarios();
            },
            error: (err) => {
                console.error('Erro ao cadastrar usuário', err);
                this.feedback = 'Erro ao cadastrar usuário. Verifique o servidor.';
                this.feedbackColor = 'red';
            }
        });
    }

    private limparFormulario(): void {
        this.novoUsuario = {
            nome: '',
            email: '',
            cpfCnpj: 0,
            endereco: '',
            telefone: 0,
            tipoUsuario: ''
        };
    }
}
