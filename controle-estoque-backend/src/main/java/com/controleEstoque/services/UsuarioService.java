package com.controleEstoque.services;

import com.controleEstoque.Enum.EnumTipoUser;
import com.controleEstoque.entities.Cliente;
import com.controleEstoque.entities.Usuarios;
import com.controleEstoque.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    public UsuarioRepository usuarioRepository;

    public Usuarios cadastroUsuario(Usuarios usuario){
        usuarioRepository.save(usuario);
        return usuario;
    }

    public List<Usuarios> ListarUsuarios(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuarios> buscarPorTipo(EnumTipoUser tipo){
       return usuarioRepository.findByTipoUsuario(tipo);
    }

    public Optional<Usuarios> listarPorId(Long id){
        return usuarioRepository.findById(id);
    }

    public void edicaoCliente(Long id){

    };

    // Método para buscar por nome, pois é o que a sua consulta do repositório faz
    public Optional<Usuarios> buscarPorNome(String nome){
        return usuarioRepository.findByNome(nome);
    }

    public void edicaoUsuario(Long id){;
}
}
