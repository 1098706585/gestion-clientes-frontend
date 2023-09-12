import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PASS_KEY = 'auth-pass-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor(private _router:Router) { }

  signOut() {
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  savePass(pass: string) {
    window.sessionStorage.removeItem(PASS_KEY);
    window.sessionStorage.setItem(PASS_KEY, pass);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getPass(): string {
    return sessionStorage.getItem(PASS_KEY);
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  isLogged(): boolean {
    return (this.getToken() != null) ? true : false;
  };
}