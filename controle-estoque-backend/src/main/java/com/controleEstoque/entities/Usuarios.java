package com.controleEstoque.entities;

import com.controleEstoque.Enum.EnumTipoUser;
import jakarta.persistence.*;


import java.io.Serializable;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("Usuarios")
public class Usuarios extends Pessoa implements Serializable {

    private EnumTipoUser tipoUsuario;

    public Usuarios(String nome, String email, Long cpfCnpj, String endereco, Long telefone, EnumTipoUser tipoUsuario) {
        super(nome, email, cpfCnpj, endereco, telefone);
        this.tipoUsuario = tipoUsuario;
    }

    public Usuarios() {
    }

    public EnumTipoUser getTipoUsuario(){
        return tipoUsuario;
    }

    public void setTipoUsuario(EnumTipoUser tipoUsuario){
        this.tipoUsuario = tipoUsuario;
    }


}


