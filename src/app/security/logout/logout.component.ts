import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  // styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private _router:Router) { }

  ngOnInit() {
    this.cerrarSesion();
  }

  cerrarSesion(){
    this.tokenStorage.signOut();
    this._router.navigate(['']);
  }
}
