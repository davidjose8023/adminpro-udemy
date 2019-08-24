import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario: Usuario;
  token: string = '';
  constructor(public http: HttpClient, public router: Router) {
    console.log('Innicializaando usuario service');
    this.cargarStorage();
   }

   cargarStorage(){
     if(localStorage.getItem('token')){

       this.usuario = JSON.parse(localStorage.getItem('usuario'));
       this.token = localStorage.getItem('token');
     }
   }

   estaLogueado(){
     return  this.token.length > 5 ? true : false;
   }

   guardarStorage(id: string, token: string, usuario: Usuario){


      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
   }

   loginGoogle( token: string ){
    //console.log(token);
    let url = `${URL_SERVICIOS}/login/google`;
    
    return this.http.post(url, { token } )
                .pipe(map((resp: any) => {
                  //console.log(resp);            
                  // localStorage.setItem('id', resp.id);
                  // localStorage.setItem('token', resp.token);
                  // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

                  this.guardarStorage(resp.id, resp.token, resp.usuario);
            
                  return true;
            
                })
              );

  }

   login(usuario: Usuario, recordar: boolean = false){
    
    let url = `${URL_SERVICIOS}/login`;

    if(recordar){

      localStorage.setItem('email', usuario.email);
      
    }else{

      localStorage.removeItem('email');

    }

    return this.http.post(url, usuario)
                    .pipe(map((resp: any) => {
                      
                      this.guardarStorage(resp.id, resp.token, resp.usuario);

                      return true;

                    })
                  );
  
  }

  logout(){
    this.usuario= null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    this.router.navigate(['/login']);
  }

   crearUsuario(usuario: Usuario){

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario).pipe(map((response: any) => {

      swal("Bien Hecho", "Operación Exitosa", "success");
      return usuario;
      
    }));
   }
}
