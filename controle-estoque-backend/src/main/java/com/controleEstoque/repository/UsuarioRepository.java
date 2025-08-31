package com.controleEstoque.repository;

import com.controleEstoque.Enum.EnumTipoUser;
import com.controleEstoque.entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuarios, Long>{

    Optional<Usuarios> findByNome(String nome);

    Optional<Usuarios> findByTipoUsuario(EnumTipoUser tipoUsuario);
}
