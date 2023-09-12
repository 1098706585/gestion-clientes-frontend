import { Injectable, OnInit, Directive } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Directive()
@Injectable({
  providedIn: 'root'
})

export class CrudService implements OnInit {
  
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getObtenerClientes(){ 
    return this.http.get(this.url + '/v1/clientes');
  }

  getCrearClientes(id:any,name:any,phone:any,email:any,startDate:any,endDate:any){     
    
    const httpOptions = {      
      params: new HttpParams()
      .append('id', id)
      .append('name', name)
      .append('phone', phone)
      .append('email', email)
      .append('startDate', startDate)
      .append('endDate', endDate)      
    };
    return this.http.get(this.url + '/v1/clientes/insertar', httpOptions);
  }

  getObtenerClientesPorId(codigo: any) {

    const httpOptions = {      
      params: new HttpParams().append('id', codigo)
    };
    return this.http.get(this.url + '/v1/clientes/buscar-por-id', httpOptions);
  }  

}