package com.controleEstoque.entities;

public class StandartUser extends Pessoa implements OperacoesStandart{


    public StandartUser(String nome, String email, Long cpf, String endereco, Long telefone) {
        super(nome, email, cpf, endereco, telefone);
    }

    public StandartUser() {
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



