import { CrudService } from 'src/app/services/crud.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { IpService } from 'src/app/services/ip.service';
import { CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {saveAs} from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import { Solicitudes } from 'src/app/model/Solicitudes';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'; 

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Registros por página:';

  return customPaginatorIntl;
}

@Component({
  selector: 'app-new-acreditation',
  templateUrl: './new-acreditation.component.html',
  styleUrls: ['./new-acreditation.component.scss']
})

export class NewAcreditationComponent implements OnInit, AfterViewInit {
  pageActual:number=1;
  User: any;
  buscarUsuario=false;
  addres: String;

  solicitudes: Solicitudes[] = [];
  dataTitle: string[] = ["idsolicitud", "fechasolicitud", "fecharecibido", "identificacion", "nombres", "Actions3"];
  dataSource = new MatTableDataSource<Solicitudes>(this.solicitudes);    
  dataSource2 = new MatTableDataSource<Solicitudes>(this.solicitudes);    
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userDigitado = new FormControl('');
  tipoReporte: Number;
  tipo_beneficiario: String;
  
  key:String;
  keyDefined: string = "DB3BEDD8E8FB75E1";
  id:any;

  valor1=0;
  valor2=0;
  resultado=0;

  name:any;
  phone:any;
  email:any;
  startDate:any;
  endDate:any;
  mostrarBoton=false;

  public crearCliente() {
    
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;    
    const result: boolean = expression.test(this.email); // true
    console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));

    if ((result ? 'correct' : 'incorrect') == "incorrect" ) {
       alert('Por favor ingresa un correo válido!')       
    }else{
      Swal({
        title: 'Se enviará la información',
        text: '¿Esta seguro que desea continuar?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, deseo continuar!',
        cancelButtonText: 'No, cancelar',
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.crud.getCrearClientes(1,this.name,this.phone,this.email,this.startDate,this.endDate)
          .subscribe(
            (data: any) => {            
              if (data.value == "-1" ) {
                Swal({
                  title: 'Atención',
                  text: data.message,
                  type: 'error',
                  confirmButtonClass: "btn btn-info",
                  buttonsStyling: false
                }).catch(Swal.noop);
                this.modal.dismissAll();
              }else{
                Swal({
                  title: "Registro exitoso",
                  text: "Se informa que su registro fue satisfactorio.",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success"
                  
                }).catch(Swal.noop);              
                this.getAllRequest();         
                this.modal.dismissAll();
              }            
            }
          );
        }
      });
    }
  }

  constructor(private crud: CrudService,private ip: IpService,private tokenStorage: TokenStorageService, private _router1: ActivatedRoute,private modal: NgbModal,private _router: Router) { 
    this.id=this._router1.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.ip.getIpAddress()
      .subscribe(
        (data: any) => {
        this.addres = data.ip;           
        },
        err => {
        console.log("Fallo en la peticion de IP" + err);
        }
    );

    //this.User=this.tokenStorage.getUser().username;
    this.getAllRequest();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;        

    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;        
  }
  
  ngAfterViewInit() {      
  }

  public getAllRequest() {
    //let resp = this.crud.getAllRequest(this.User, this.addres,-1);
    let resp = this.crud.getObtenerClientes();
    resp.subscribe(report => this.dataSource.data = report as Solicitudes[]);    
  }
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  onSearchUser(id : any): void {    
    let resp = this.crud.getObtenerClientesPorId(id);
    resp.subscribe(report => this.dataSource2.data = report as Solicitudes[]);   
  }

  
  encryp(value:any){
    this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
    let ciphertext = CryptoJS.AES.encrypt(value, this.key, {iv: this.key}).toString();
    return ciphertext;
  }

  openXL(contenido,bandera:any, value:any){
    this.modal.open(contenido,{size:'lg'});
    if(bandera==2){
      //this.modal.open(contenido,{size:'lg'});
      this.mostrarBoton=true;
    }else if(bandera=1){   
      this.mostrarBoton=false;
      //this.modal.open(contenido,{size:'lg'});
      this.crud.getObtenerClientesPorId(value)
      .subscribe(
        (data: any) => {
          this.name=data[0].name;
          this.phone=data[0].phone;
          this.email=data[0].email;
          this.startDate=data[0].startDate;
          this.endDate=data[0].endDate;
  
        },
        err => {
          console.log("Fallo en getObtenerClientesPorId" + err);
        }
      );  
    }
    
  }
}
