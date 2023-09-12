import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService: TokenStorageService, private router: Router) { }

  canActivate() {
      // If the user is not logged in we'll send them back to the home page
      /*
      if (!this.authService.isLogged()) {
          console.log('No estás logueado');
          this.router.navigate(['/security/login']);
          return false;
      }*/

      return true;
  }
}