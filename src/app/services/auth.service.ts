import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(resp => {

    })
  }
  crearUsuario( data:any  ){
    return this.auth.createUserWithEmailAndPassword(data.correo, data.password).then( ({user}) => {
      console.log(user)
      const newUser = new Usuario(user.uid, data.nombreUsuario, user.email)
       return this.firestore.doc(`${user.uid}/usuario`).set( {...newUser} )
      })
  }

  logIn(data){
    return this.auth.signInWithEmailAndPassword(data.correo, data.password)
  }

  logOut(){ 
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fUser => fUser != null)
    );
  }
} 
