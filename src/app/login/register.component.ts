import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';

import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['login.component.css']
})
export class RegisterComponent implements OnInit {
  
  forma : FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    private titulo_navegador: Title,
  ) { }

  sonIguales(campo1: string, campo2: string){
  
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      
      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      }
    }
  }

  ngOnInit() {

    init_plugins();
    this.titulo_navegador.setTitle('Cloud H & S | Registrar');

    this.forma = new FormGroup({
      
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, this.sonIguales('password', 'password2'));
  }

  registrarUsuario(){

    if(this.forma.invalid){
      swal("Error", "Verificas tus datos", "error");
      return;
    }

    if(!this.forma.value.condiciones){
      console.log("debe aceptar las condicioens");
      swal("Importante", "Debes aceptar las condiciones", "warning");
      return;
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login'])
      );


    //swal("Bien Hecho", "Operación Exitosa", "success");
    console.log(this.forma.valid);
    console.log(this.forma.value);
  }
  

}
