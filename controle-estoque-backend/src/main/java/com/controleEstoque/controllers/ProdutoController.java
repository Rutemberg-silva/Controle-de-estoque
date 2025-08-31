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
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<Produtos> cadastrarProduto(@RequestBody Produtos produto) {
        Produtos novoProduto = produtoService.salvar(produto);
        return new ResponseEntity<>(novoProduto, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Produtos> listarTodos() {
        return produtoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produtos> buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nome/{nomeProduto}")
    public Optional<Produtos> buscarPorNome(@PathVariable String nomeProduto) {
        return produtoService.buscarPorNome(nomeProduto);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Produtos> deletePorId(@PathVariable Long id) {
        try {
            // Verifica se o produto existe antes de tentar deletá-lo
            if (produtoService.buscarPorId(id).isPresent()) {
                produtoService.deletePorId(id);
                return ResponseEntity.noContent().build(); // 204 No Content para indicar sucesso na deleção
            } else {
                // Retorna 404 Not Found se o produto não existir
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Retorna 500 Internal Server Error para outros erros
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/baixa")
    public ResponseEntity<Produtos> darBaixaNoEstoque(@PathVariable Long id, @RequestParam int quantidade){
        try {
            produtoService.baixaEmEstoque(id, quantidade);

            // Busca o produto atualizado para retornar na resposta
            Produtos produtoAtualizado = produtoService.buscarPorId(id)
                    .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado após a atualização."));

            // Retorna o objeto do produto atualizado com status 200 OK
            return ResponseEntity.ok(produtoAtualizado);
        } catch (IllegalArgumentException e) {
            // Retorna um erro caso o produto não exista ou o estoque seja insuficiente
            return ResponseEntity.badRequest().body(null);
        }
    }
}
