package com.controleEstoque.controllers;

import com.controleEstoque.entities.Usuarios;
import com.controleEstoque.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuarios> cadastrarUsuario(@RequestBody Usuarios usuario){
        Usuarios novoUser = usuarioService.cadastroUsuario(usuario);
        return new  ResponseEntity<>(novoUser, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Usuarios> listarUsuarios(){
        return usuarioService.ListarUsuarios();
    }
}
