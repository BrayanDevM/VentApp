import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { AjustesService } from './ajustes.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  usuario!: Usuario;
  loggeado = false;
  token!: string;

  private usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar,
    private ajustes$: AjustesService
  ) {
    this.usuariosCollection = this.db.collection<Usuario>('Usuarios');
    this.cargarSesion();
    // Redirección por Google sing
    this.auth.getRedirectResult().then((resp) => {
      if (resp.user) {
        this.crearUsuarioEnColeccion(resp);
      }
    });
  }

  /**
   * Recibe el formulario y registra un usuario con correo y pass
   * recibida la respuesta crear el objeto usuario y lo registra
   * en la colección Usuarios.
   * @param form formulario de registro
   */
  registrarUsuario(form: any) {
    this.auth
      .createUserWithEmailAndPassword(form.correo, form.pass1)
      .then((resp) => {
        this.crearUsuarioEnColeccion(resp, form.nombre);
      })
      .catch((err) => this.controlError(err));
  }

  loginG() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // .then((resp) => {
    //   this.crearUsuarioEnColeccion(resp);
    //   this.crearSesion();
    // })
    // .catch((err) => this.controlError(err));
  }

  loginF() {
    this.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    // .then((resp) => {
    //   console.log(resp);
    // })
    // .catch((err) => this.controlError(err));
  }

  loginC(correo: string, pass: string) {
    this.auth
      .signInWithEmailAndPassword(correo, pass)
      .then((resp) => {
        this.obtenerUsuarioEIniciar(resp);
      })
      .catch((err) => this.controlError(err));
  }

  obtenerUsuarioEIniciar(authResponse: any): void {
    this.usuariosCollection
      .doc(authResponse.user.uid)
      .get()
      .pipe(first())
      .subscribe((res: any) => {
        this.usuario = res.data();
        this.crearSesion();
      });
  }

  estaLogeado() {
    return this.loggeado;
  }

  crearSesion() {
    this.loggeado = true;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.router.navigate(['/']);
  }

  cargarSesion() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario') + '');
    console.log(this.usuario, 'usuario cargado');

    if (this.usuario) {
      console.log(this.usuario);
      this.loggeado = true;
      this.router.navigate(['/']);
    }
  }

  cerrarSesion() {
    this.auth
      .signOut()
      .then(() => {
        this.loggeado = false;
        sessionStorage.removeItem('usuario');
        this.ajustes$.aplicarTema('Claro');
        this.ajustes$.almacenarEnLS();
        this.router.navigate(['/inicio']);
      })
      .catch((err) => this.controlError(err));
  }

  crearUsuarioEnColeccion(authResponse: any, nombre: any = null) {
    console.log(authResponse);
    this.token = authResponse.user.refreshToken;
    const tipoIngreso: any = authResponse.additionalUserInfo.providerId;

    const usuario: Usuario = {
      uid: authResponse.user.uid,
      correo: authResponse.user.email,
      nombre: '',
      imagen: '',
      verificado: authResponse.user.emailVerified,
      rol: 'usuario',
    };

    if (tipoIngreso === 'password') {
      usuario.nombre = nombre || 'Nuevo usuario';
    } else {
      usuario.nombre = authResponse.user.displayName;
      usuario.imagen = authResponse.user.photoURL;
    }

    this.usuario = usuario;

    if (authResponse.additionalUserInfo.isNewUser) {
      setTimeout(() => {
        this.usuariosCollection
          .doc(usuario.uid)
          .set(usuario)
          .then(() => {
            this._snackBar.open(
              'Usuario registrado, ya puedes iniciar sesión',
              undefined,
              {
                duration: 4000,
              }
            );
            if (tipoIngreso !== 'password') {
              this.crearSesion();
              return;
            }
          })
          .catch((err) => this.controlError(err));
      }, 800);
    } else {
      this.crearSesion();
    }
  }

  controlError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this._snackBar.open(
          'Ya existe un usuario registrado con ese correo',
          'Entendido',
          {
            duration: 5000,
          }
        );
        break;
      case 'auth/account-exists-with-different-credential':
        this._snackBar.open(
          'Este correo ya se encuentra registrado con otro credencial',
          'Entendido',
          {
            duration: 5000,
          }
        );
        break;
      case 'auth/user-not-found':
        this._snackBar.open(
          'No existe un usuario con ese correo',
          'Entendido',
          {
            duration: 5000,
          }
        );
        break;
      case 'auth/internal-error':
        this._snackBar.open('Error en el servidor, lo sentimos', 'Entendido', {
          duration: 5000,
        });
        break;

      default:
        console.log(error);
        this._snackBar.open('Error!', 'Entendido', {
          duration: 5000,
        });
        break;
    }
  }
}

export interface Usuario {
  uid: string;
  correo: string;
  nombre: string;
  imagen: string;
  verificado: boolean;
  rol: string;
}
