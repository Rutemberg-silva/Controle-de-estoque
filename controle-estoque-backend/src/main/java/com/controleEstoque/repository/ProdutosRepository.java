package com.controleEstoque.repository;

import com.controleEstoque.entities.Produtos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProdutosRepository extends JpaRepository<Produtos, Long> {
    void deleteByNomeProduto(String nomeProduto);

    Optional<Produtos> findByNomeProduto(String nomeProduto);
}
