import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificador =  new EventEmitter<any>();
  public usuario: Usuario;
  public img: any;
  
  constructor(public _serviceUsuario: UsuarioService) {

    //console.log("modal servico");
   }

   ocultarModal(){
    this.oculto = 'oculto';
    this.tipo= null;
    this.id= null;
   }
   
   mostrarModal(tipo: string, id: string){

    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
    switch (tipo) {
      case 'usuarios':
          this._serviceUsuario.getUsuarioId(id)
          .subscribe( (resp: Usuario) => {
   
            this.usuario = resp;
            this.img = resp.img;
            

          } );
        break;
      case 'medicos':
          this._serviceUsuario.getUsuarioId(id)
          .subscribe( (resp: Usuario) => {
    
            this.usuario = resp;
            this.img = resp.img;
            

          } );
        break;
      case 'hospoitales':
        this._serviceUsuario.getUsuarioId(id)
        .subscribe( (resp: Usuario) => {
  
          this.usuario = resp;
          this.img = resp.img;
          

        } );
      break;
    
      default:
        break;
    }
    
  
   }
}
