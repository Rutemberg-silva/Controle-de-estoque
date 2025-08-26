package com.controleEstoque.entities;

public class AdmUser extends Pessoa implements OperacoesAdm{


    public AdmUser(String nome, String email, Long cpf, String endereco, Long telefone) {
        super(nome, email, cpf, endereco, telefone);
    }

    public AdmUser() {
    }

    @Override
    public void cadastroUsuario() {

    }

    @Override
    public void edicaoCliente() {

    }

    @Override
    public void edicaoUsuario() {

    }

    @Override
    public void venda() {

    }

    @Override
    public void cadastroProduto() {

    }

    @Override
    public void cadastroCliente() {

    }

    @Override
    public void cancelaVenda() {

    }
}


