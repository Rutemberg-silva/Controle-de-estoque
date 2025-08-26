package com.controleEstoque.controllers;

import com.controleEstoque.entities.Produtos;
import com.controleEstoque.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Produtos> deletePorId(@PathVariable Long id) {
        try {
            Optional<Produtos> produtoDeletado = produtoService.deletePorId(id);
            if (produtoDeletado.isPresent()) {
                // Retorna o produto deletado com status 200 OK
                return new ResponseEntity<>(produtoDeletado.get(), HttpStatus.OK);
            } else {
                // Retorna um status de 404 Not Found se o produto não existir
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            // Retorna um status de 400 Bad Request se houver um erro de argumento
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para dar baixa no estoque
    // Ex: PUT http://localhost:8080/api/produtos/1/baixa?quantidade=5
    @PutMapping("/{id}/baixa")
    public ResponseEntity<String> darBaixaNoEstoque (@PathVariable Long id,@RequestParam int quantidade){
        try {
            produtoService.baixaEmEstoque(id, quantidade);
            return ResponseEntity.ok("Estoque atualizado com sucesso!");
        } catch (IllegalArgumentException e) {
            // Retorna um erro caso o produto não exista ou o estoque seja insuficiente
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
