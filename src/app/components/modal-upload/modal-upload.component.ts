import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, SubirArchivoService } from 'src/app/service/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _subirImagenService: SubirArchivoService, 
    public _modalUploadService: ModalUploadService,
    public _serviceUsuario: UsuarioService
     ) {

    //this.usuario = this._serviceUsuario.usuario;
  }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ){
    //console.log(archivo);

    if(!archivo){
      this.imagenSubir= null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      this.imagenSubir= null;
      swal('Solo Imagenes','Imagen no valida', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result;
    //this.imagenTemp = archivo;

  }

  cambiarImagen(){  
   
    
    this._subirImagenService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
                  .then((resp: any) => {
                    //console.log(resp);
                    this._modalUploadService.notificador.emit(resp);
                    
                    if(this._serviceUsuario.usuario._id === resp.usuario._id){
                      this._serviceUsuario.usuario.img = resp.usuario.img;

                      localStorage.setItem('usuario', JSON.stringify(this._serviceUsuario.usuario));

                      //this._serviceUsuario.guardarStorage(this.usuario._id, this._serviceUsuario.token, resp.usuario);

                    }

                      this.cerrarModal();

                    swal('Imagen Actualizada', resp.usuario.nombre, 'success' );


                  })
                  .catch( resp => {

                    console.log(resp);

                  });
  }

  cerrarModal(){

    this.imagenSubir= null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  

  }


}
