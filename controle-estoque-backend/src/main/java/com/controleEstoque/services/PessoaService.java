package com.controleEstoque.services;

import com.controleEstoque.entities.Pessoa;
import com.controleEstoque.repository.PessoaRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Provider;
import java.util.List;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public Pessoa salvar(Pessoa pessoa){
        return pessoaRepository.save(pessoa);
    }

    public List<Pessoa> listarPessoas (){
        return pessoaRepository.findAll();
    }

}
