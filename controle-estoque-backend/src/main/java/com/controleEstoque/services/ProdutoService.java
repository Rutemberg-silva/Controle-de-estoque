package com.controleEstoque.services;


import com.controleEstoque.entities.Produtos;
import com.controleEstoque.repository.ProdutosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutosRepository produtosRepository;

    public Produtos salvar(Produtos produto){
        return produtosRepository.save(produto);
    }

    public Optional<Produtos> buscarPorId(Long id){
        return produtosRepository.findById(id);
    }

    public List<Produtos> buscarTodos(){
        return produtosRepository.findAll();
    }

    // Altera o método para retornar o produto deletado (ou vazio)
    public Optional<Produtos> deletePorId(Long id) {
        Optional<Produtos> produtoParaDeletar = produtosRepository.findById(id);
        if (produtoParaDeletar.isPresent()) {
            produtosRepository.deleteById(id);
        }
        return produtoParaDeletar;
    }

    public void deletePorNome(String nome){
        produtosRepository.deleteByNomeProduto(nome);
    }

    public void baixaEmEstoque(Long produtoId, int quantidade){
        Optional<Produtos> produtoOptional = produtosRepository.findById(produtoId);

        if(produtoOptional.isPresent()){
            Produtos produto = produtoOptional.get();

            if (produto.getQuantidadeEstoque() >= quantidade){
                produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);
                produtosRepository.save(produto);
            }
            else {
                throw new IllegalArgumentException("Estoque insuficiente para o produto: " + produto.getNomeProduto());
            }
        }
        else{
            throw new IllegalArgumentException("Produto não encontrado com o ID: " + produtoId);
        }
    }
}
