import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IpService } from '../services/ip.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2'; 
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../services/upload-file.service';
import * as $ from 'jquery';
import { UsersGet } from '../model/UsersGet';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterViewInit {
  submitted = false;
  actualizar: FormGroup;
  addres: String;
  usuario: String;
  usu: UsersGet = new UsersGet();
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  constructor(private formBuilder: FormBuilder, private _router: Router, private ip: IpService, private tokenStorage: TokenStorageService, private http: HttpClient, private crud: CrudService, private uploadService: UploadFileService) { 
    this.actualizar = this.formBuilder.group({
      tIdentidad: ['', Validators.required],
      cedula: ['', Validators.required],
      pNombre: ['', Validators.required],
      sNombre: [''],
      pApellido: ['', Validators.required],
      sApellido: [''],
      cPrincipal: ['', [Validators.email, Validators.required]],
      cSecundario: ['', Validators.email],
      pSecreta: ['', Validators.required],
      rSecreta: ['', Validators.required],
      cPass: ['', Validators.required],
      cPassR: ['', Validators.required],
    });
  }

  tIdentidad = new FormControl('', [
    Validators.required
  ]);

  cedula = new FormControl('', [
    Validators.required
  ]);

  pNombre = new FormControl('', [
    Validators.required
  ]);
  
  pApellido = new FormControl('', [
    Validators.required
  ]);
  
  cPrincipal = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  cSecundario = new FormControl('', [
    Validators.email
  ]);

  pSecreta = new FormControl('', [
    Validators.required
  ]);

  rSecreta = new FormControl('', [
    Validators.required
  ]);
 
  cPass = new FormControl('', [
    Validators.required
  ]);

  cPassR = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  
  get f() { 
    return this.actualizar.controls; 
  }

  guardar(){
    this.submitted = true;
    //console.log("Listo actualizo");
    
    // stop here if form is invalid
    if (this.actualizar.invalid) {
      Swal({
        title: 'Atención...',
        text: 'Debe diligenciar todo el formulario de registro, para continuar',
        type: 'error',
        confirmButtonClass: "btn btn-info",
        buttonsStyling: false
      }).catch(Swal.noop);

      return;
    }

    // this.usu.tipo_IDENTIFICACION = this.actualizar.value.tIdentidad;
    // this.usu.cedula = this.actualizar.value.cedula;
    // this.usu.primer_NOMBRE = this.actualizar.value.pNombre;
    // this.usu.segundo_NOMBRE = this.actualizar.value.sNombre;
    // this.usu.primer_APELLIDO = this.actualizar.value.pApellido;
    // this.usu.segundo_APELLIDO = this.actualizar.value.sApellido;
    // this.usu.correo_PRINCIPAL = this.actualizar.value.cPrincipal;
    // this.usu.segundo_CORREO = this.actualizar.value.cSecundario;
    // this.usu.pregunta_SECRETA = this.actualizar.value.pSecreta;
    // this.usu.respuesta_SECRETA = this.actualizar.value.rSecreta;
    // this.usu.passwordd = this.actualizar.value.cPass;
    // this.usu.maquina_CREACION = this.addres;

    // if(this.actualizar.value.cPass != this.actualizar.value.cPassR){
    //   $("#pass1").val("");
    //   $("#pass2").val("");

    //   Swal({
    //     title: 'Atención...',
    //     text: 'La contraseña debe ser igual a la repeticion de la contraseña',
    //     type: 'error',
    //     confirmButtonClass: "btn btn-info",
    //     buttonsStyling: false
    //   }).catch(Swal.noop);

    //   return;
    // }

    // Swal({
    //   title: 'Se enviara la información',
    //   text: '¿Esta seguro de que desea continuar?',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Si, deseo continuar!',
    //   cancelButtonText: 'No, cancelar',
    //   confirmButtonClass: "btn btn-success",
    //   cancelButtonClass: "btn btn-danger",
    //   buttonsStyling: false
    // }).then((result) => {
    //   if (result.value) {
    //     this.serviceCrud.persistNewUserObject(this.usu)
    //     .subscribe(
    //       (data: any) => {
    //         if (data.value != 0) {
    //           Swal({
    //             title: 'Atención...',
    //             text: this.response.message,
    //             type: 'error',
    //             confirmButtonClass: "btn btn-info",
    //             buttonsStyling: false
    //           }).catch(Swal.noop);
    //         }else{
    //           Swal({
    //             title: "Registro exitoso",
    //             text: "Fue enviado un correo electrónico informando de la transacción realizada",
    //             buttonsStyling: false,
    //             confirmButtonClass: "btn btn-success",
    //             type: "success"
    //           }).catch(Swal.noop);
    //         }

    //         this._router.navigate(['/security/login']);
    //       }
    //     );
    //   }
    // });
  }

  ngOnInit() {
    // $('body').removeClass('fondo');
    // $('body').addClass('fondoDegra');

    if(this.tokenStorage.isLogged() == true){
      this.usuario = this.tokenStorage.getUser().username;
      
      this.crud.getUser(this.usuario)
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.usu = data;
        }
      );
    }

    this.ip.getIpAddress()
    .subscribe(
      (data: any) => {
        // console.log(data.ip);
        this.addres = data.ip; 
      },
      err => {
        console.log("Fallo en la peticion de IP" + err);
      }
    );
  }

  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(function(){
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(function(){
          const $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');
          $card.attr('data-count', 0);

          setTimeout(function(){
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(function(){
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          if (hover_count >= 20) {
            $(this).children('.card-header, .card-image').addClass('hinge animated');
          }
        });
      });
    }
  }
}