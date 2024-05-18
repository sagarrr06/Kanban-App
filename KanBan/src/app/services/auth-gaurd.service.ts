import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  isLogged:boolean=false
  constructor() { }


  loginStatus(){
    if(localStorage.getItem('Token')){
      this.isLogged=true
    }
    else{
      this.isLogged=false
    }
    return this.isLogged
  }
  
}
