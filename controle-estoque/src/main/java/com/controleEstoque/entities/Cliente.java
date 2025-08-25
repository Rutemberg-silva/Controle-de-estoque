package com.controleEstoque.entities;

import com.controleEstoque.Enum.EnumTipoCliente;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
public class Cliente extends Pessoa implements Serializable {
    private EnumTipoCliente tipoCliente;


    public Cliente(String nome, String email, Long cpf, String endereco, Long telefone, EnumTipoCliente tipoCliente) {
        super(nome, email, cpf, endereco, telefone);
        this.tipoCliente = tipoCliente;
    }

    public EnumTipoCliente getTipoCliente() {
        return tipoCliente;
    }

    public void setTipoCliente(EnumTipoCliente tipoCliente) {
        this.tipoCliente = tipoCliente;
    }

    public Cliente(EnumTipoCliente tipoCliente) {
        this.tipoCliente = tipoCliente;


    }

    public Cliente() {}
}


