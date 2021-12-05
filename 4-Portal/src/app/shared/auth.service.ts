import { Injectable } from '@angular/core';
import { CRUDReturn } from '../models/crud_return.interface';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: User | null;
  public userObs?: Subscription;

  constructor(private api: ApiService, private auth: AngularFireAuth, private router: Router) {
    console.log(`I am instance ${Date.now()}`);
    this.userObs = this.auth.user.subscribe((user) => {
      console.log(`User: ${user}`);
      if (user == null || user == undefined) return;
      if (!this.authenticated) {
        this.api.get(`/user/${user?.uid}`).then((result) => {
          var output: CRUDReturn = {
            success: result.success,
            data: result.data,
          };
          if (output.success === true) {
            console.log('Subscription');
            this.user = User.fromJson(output.data.id, output.data);
            console.log('Successful Login');
            this.user?.log();
            this.router.navigate(['home']);
          }
        });
      }
    });
  }

  get authenticated(): boolean {
    return this.user != undefined && this.user != null;
  }


  async login(email: string, password: string): Promise<any> {
    try {
      //log in to firebase auth
      var resultOfLogin: any;
      try {
        resultOfLogin = await this.auth.signInWithEmailAndPassword(
          email,
          password
        );
      } catch (error) {
        throw error;
      }
      //get the data from the db regarding the user
      var result: any = await this.api.get(`/user/${resultOfLogin.user?.uid}`);
      var output: CRUDReturn = { success: result.success, data: result.data };
      if (output.success === true) {
        this.user = User.fromJson(output.data.id, output.data);
      }
      return output;
    } catch (error) {
      console.log('Login Error');
      if (error instanceof Error)
        return { success: false, data: error.message };
      else return { success: false, data: 'unknown login error' };
    }
  }

  async register(payload: {
    name: string;
    age: number;
    email: string;
    password: string;
  }): Promise<CRUDReturn> {
    //send the registration request to the Api
    var result: any = await this.api.post('/user/register', payload);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.user = User.fromJson(output.data.id, output.data);
      var resultOfLogin: any;
      //sign in the frontend if registration is successful;
      try {
        resultOfLogin = await this.auth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
      } catch (error) {
        console.log(error);
        console.log('Register Error');
        if (error instanceof Error)
          return { success: false, data: error.message };
        else return { success: false, data: 'unknown register error' };
      }
    }
    console.log(output);

    return output;
  }

  logout() {
    this.auth.signOut().then(() => {
      this.user = null;
    });
  }

  // async login(email: string, password: string): Promise<CRUDReturn> {
  //   try {
  //     var result: any = await this.api.post('/user/login', { email, password });
  //     var output: CRUDReturn = { success: result.success, data: result.data };
  //     if (output.success === true) {
  //       this.user = User.fromJson(output.data.id, output.data);
  //     }
  //     return output;
  //   } catch (error) {
  //     if (error instanceof Error)
  //       return { success: false, data: error.message };
  //     else return { success: false, data: 'unknown login error' };
  //   }
  // }

  // async register(payload: {
  //   name: string;
  //   age: number;
  //   email: string;
  //   password: string;
  // }): Promise<CRUDReturn> {
  //   var result: any = await this.api.post('/user/register', payload);
  //   var output: CRUDReturn = { success: result.success, data: result.data };
  //   if (output.success === true) {
  //     this.user = User.fromJson(output.data.id, output.data);
  //   }
  //   return output;
  // }

  // logout() {
  //   this.user = null;
  // }
}