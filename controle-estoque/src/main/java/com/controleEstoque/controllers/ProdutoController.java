package com.controleEstoque.controllers;

import com.controleEstoque.entities.Produtos;
import com.controleEstoque.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController // Indica que a classe é um controlador REST
@RequestMapping("/api/produtos") // Define o caminho base para todos os endpoints deste controlador
public class ProdutoController {

    // Injeção do serviço, que contém a lógica de negócio
    @Autowired
    private ProdutoService produtoService;

    // Endpoint para criar um novo produto
    // Ex: POST http://localhost:8080/api/produtos
    @PostMapping
    public ResponseEntity<Produtos> cadastrarProduto(@RequestBody Produtos produto) {
        Produtos novoProduto = produtoService.salvar(produto);
        return new ResponseEntity<>(novoProduto, HttpStatus.CREATED);
    }

    // Endpoint para listar todos os produtos
    // Ex: GET http://localhost:8080/api/produtos
    @GetMapping
    public List<Produtos> listarTodos() {
        return produtoService.buscarTodos();
    }

    // Endpoint para buscar um produto por ID
    // Ex: GET http://localhost:8080/api/produtos/1
    @GetMapping("/{id}")
    public ResponseEntity<Produtos> buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para dar baixa no estoque
    // Ex: PUT http://localhost:8080/api/produtos/1/baixa?quantidade=5
    @PutMapping("/{id}/baixa")
    public ResponseEntity<String> darBaixaNoEstoque(@PathVariable Long id, @RequestParam int quantidade) {
        try {
            produtoService.baixaEmEstoque(id, quantidade);
            return ResponseEntity.ok("Estoque atualizado com sucesso!");
        } catch (IllegalArgumentException e) {
            // Retorna um erro caso o produto não exista ou o estoque seja insuficiente
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}