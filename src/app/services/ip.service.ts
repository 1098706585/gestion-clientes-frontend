import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  urlIp = 'http://api.ipify.org/?format=json';
  constructor(private http:HttpClient) {  }

  getIpAddress(){
    return this.http.get(this.urlIp);
  }
}