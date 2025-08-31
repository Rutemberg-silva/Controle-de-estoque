package com.controleEstoque.controllers;


import com.controleEstoque.entities.Cliente;
import com.controleEstoque.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping("api/clientes")
public class ClienteController {

    @Autowired
    public ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente){
        Cliente novoCliente = clienteService.salvar(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Cliente> listarClientes(){
        return clienteService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id){
        return clienteService.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Cliente> removerCliente(@PathVariable Long id){
        try {
            if (clienteService.buscarPorId(id).isPresent()) {
                clienteService.removerCliente(id);
                return ResponseEntity.noContent().build(); // Retorna 204 No Content para indicar sucesso
            } else {
                return ResponseEntity.notFound().build(); // Retorna 404 Not Found se o produto não existir
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}