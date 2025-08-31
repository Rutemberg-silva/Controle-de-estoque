package com.controleEstoque.controllers;

import com.controleEstoque.entities.Pessoa;
import com.controleEstoque.services.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping ("/api/pessoas")
public class PessoaController {
    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<Pessoa> cadastrarPessoa(@RequestBody Pessoa pessoa){
        Pessoa novaPessoa = pessoaService.salvar(pessoa);
        return new  ResponseEntity<>(novaPessoa, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Pessoa> listarPessoas(){
        return pessoaService.listarPessoas();
    }
}
