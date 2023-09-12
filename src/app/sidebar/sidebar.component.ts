import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { AdminGuardService } from '../services/admin-guard.service';
//import { Input, ChangeDetectionStrategy } from '@angular/core';
import * as CryptoJS from 'crypto-js';
//import { log } from 'console';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];

}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    icontype: string;
    type?: string;


}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/profile',
        title: 'Profile',
        type: 'sub',
        icontype: '',
        collapse: 'profile',
        children: [
            { path: 'myProfile', title: 'Mi perfil', ab: 'MP', icontype: 'person_pin' },
        ]
    },

    {
        path: '/acreditation',
        title: 'Administración',
        type: 'sub',
        icontype: 'local_police',
        collapse: 'acreditation',
        children: [
            // { path: 'historyAcreditation', title: 'Usuarios', ab: 'USU', icontype: 'people' },
            { path: 'newAcreditation', title: 'Clientes', ab: 'SOL', icontype: 'archive' },
            // { path: 'searchingAcreditation', title: 'Consultas', ab: 'CON', icontype: 'archive' },
            { path: '', title: 'Clients', ab: 'CON', icontype: 'archive' },
            { path: '', title: 'Client look history', ab: 'CON', icontype: 'archive' },
            { path: '', title: 'Emergency PIN configuration', ab: 'CON', icontype: 'archive' },
            { path: '', title: 'Emergency PIN history', ab: 'CON', icontype: 'archive' }
        ],
    },

    {
        path: '/acreditation2',
        title: 'Gestión Veteranos',
        type: 'sub',
        icontype: 'people',
        collapse: 'acreditation2',
        children: [
            // { path: 'historyAcreditation', title: 'Usuarios', ab: 'USU', icontype: 'people' },
            { path: 'newAcreditation', title: 'Clientes', ab: 'SOL', icontype: 'archive' },
            // { path: 'searchingAcreditation', title: 'Consultas', ab: 'CON', icontype: 'archive' },
            { path: '', title: 'Emergency PIN configuration', ab: 'CON', icontype: 'archive' },
           // { path: 'azureAcreditation', title: 'Azure', ab: 'CON', icontype: 'archive' }
        ],
    },

];


@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    //@Input() ChangeNames:String;
    public menuItems: any[];
    public esteusuario: any;

    public get currentUser() {
        return this.tokenStorage.getUser().username;
    }

    user = {
        usuario: '',
        nombreUsuario: '',
        nombreUsuario2: ''
    };
    public ChangeNames2: any;
    static ChangeNames2: string;

    key:String;
    keyDefined: string = "DB3BEDD8E8FB75E1";
    
    decryptedMessage:String;
    public variable:String;

    constructor(private tokenStorage: TokenStorageService, private http: HttpClient, private crud: CrudService, private _router: Router) {
        this.variable=history.state.data;
        //console.log(' ==> this.variable ==> '+this.variable)
        if (this.tokenStorage.getUser()) {
            //this.user.usuario = this.decryp(this.tokenStorage.getUser().username);
            //this.user.usuario = this.tokenStorage.getUser().username;
            
            this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
           
           
        } else {
            console.log('No esta logeado debe logearse');
        }
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        //this.esteusuario = this.tokenStorage.getUser().username;
        //this.esteusuario = this.decryp(this.tokenStorage.getUser().username);
        //this.menuItems = ROUTES.filter(menuItem => menuItem);

        
            this.menuItems = ROUTES.filter(menuItem =>  {return menuItem.title === 'Administración' || menuItem.title === 'Profile'});
           
        
        
        this._router.navigate(['/inicio'])
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    encryp(value:any){
        this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
        let ciphertext = CryptoJS.AES.encrypt(value, this.key, {iv: this.key}).toString();
        return ciphertext;
    }

    decryp(value:any){
        this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
        const ciphertext = CryptoJS.AES.decrypt(value, this.key, {iv: this.key}); 
        //let ciphertext = CryptoJS.AES.decryp(value, this.key, {iv: this.key}).toString();
        return ciphertext;
    }
/*
    public  decrypt(value){
        //this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
        this.key = CryptoJS.enc.Utf8.parse(this.key);
        let decryptedData = CryptoJS.AES.decrypt(value, this.key, {
          iv: this.key
        });
        return decryptedData.toString( CryptoJS.enc.Utf8 ).toString();
    }*/
    /*
    decrypt(cypher: string): string {        
        this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
        let buffer2 = Buffer.from(cypher, 'base64');
        let plaintext = CryptoJS.publicDecrypt(this.key, buffer2);    
        return plaintext.toString('utf8')
      }*/

    // decrypt = (cipherText: string): string | Array<Record<string, string>> => {
    //     if (typeof cipherText === 'string' && cipherText.trim().length > 0) {
    //       return AES.decrypt(cipherText, getEncryptionKey()).toString(enc.Utf8)
      
    //     } else if (Array.isArray(cipherText)) {
    //       return cipherText.map((item: SecretFile) => decryptFile(item, true))
    //     }
      
    //     return cipherText
    //   }


    // decryp = (encryptedBase64) => {
    //     this.key = CryptoJS.enc.Utf8.parse(this.keyDefined);
    //     const decrypted = CryptoJS.AES.decrypt(encryptedBase64, this.key);
    //     if (decrypted) {
    //       try {
    //         console.log(decrypted);
    //         const str = decrypted.toString(CryptoJS.enc.Utf8);
    //         if (str.length > 0) {
    //           return str;
    //         } else {
    //           return 'error 1';
    //         } 
    //       } catch (e) {
    //         return 'error 2';
    //       }
    //     }
    //     return 'error 3';
    //   };
      
}
