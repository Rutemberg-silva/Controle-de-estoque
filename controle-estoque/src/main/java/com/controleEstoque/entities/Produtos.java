package com.controleEstoque.entities;

import com.controleEstoque.Enum.EnumTipoProduto;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cor;
    private String fornecedor;
    private String descricao;
    private String nomeProduto;
    private EnumTipoProduto tipoProduto;
    private Integer quantidadeEstoque;

    public String getCor() {
        return cor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public EnumTipoProduto getTipoProduto() {
        return tipoProduto;
    }

    public void setTipoProduto(EnumTipoProduto tipoProduto) {
        this.tipoProduto = tipoProduto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }
    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }


    public Produtos(Long id, String cor, String fornecedor, String descricao, String nomeProduto, EnumTipoProduto tipoProduto, Integer quantidadeEstoque) {
        this.id = id;
        this.cor = cor;
        this.fornecedor = fornecedor;
        this.descricao = descricao;
        this.nomeProduto = nomeProduto;
        this.tipoProduto = tipoProduto;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Produtos() {};

}
