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

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  usuario!: Usuario;
  token!: string;

  private usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.usuariosCollection = this.db.collection<Usuario>('Usuarios');
    this.cargarSesion();
    // Redirección por Google sing
    // this.auth
    //   .getRedirectResult()
    //   .then((result) => console.log(result, 'result redi'));
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
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((resp) => {
        this.crearUsuarioEnColeccion(resp);
        this.crearSesion();
      })
      .catch((err) => this.controlError(err));
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
    return this.usuario ? true : false;
  }

  crearSesion() {
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.router.navigate(['/']);
  }

  cargarSesion() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario') + '');
    if (this.usuario) {
      console.log(this.usuario);
      this.router.navigate(['/']);
      return;
    }
  }

  cerrarSesion() {
    this.auth
      .signOut()
      .then(() => {
        console.log('Sesión cerrada');
        sessionStorage.removeItem('usuario');
        this.router.navigate(['/inicio']);
      })
      .catch((err) => this.controlError(err));
  }

  crearUsuarioEnColeccion(authResponse: any, nombre: any = null) {
    // console.log(authResponse);
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
          this.router.navigate(['/login']);
        })
        .catch((err) => this.controlError(err));
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
