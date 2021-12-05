import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient, private auth: AngularFireAuth) {}

  async post(url:string, body: any): Promise<any> {
    try {
      // return await this.api.post(environment.API_URL + url, body).toPromise();
      var token:string = await this.getAuthToken();
      return await this.api.post(environment.API_URL + url, body, {
        headers: new HttpHeaders({
          authportal: token
        }),
      }).toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async get(url: string): Promise<any> {
    try {
      // return await this.api.get(environment.API_URL+url).toPromise();
      var token:string = await this.getAuthToken();
      return await this.api.get(environment.API_URL + url, {
        headers: new HttpHeaders({
          authportal: token
        }),
      }).toPromise();

    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async patch(url: string, body?:any): Promise<any> {
    try {
      // return await this.api.patch(environment.API_URL+url,body).toPromise();
      var token:string = await this.getAuthToken();
      return await this.api.patch(environment.API_URL + url, body, {
        headers: new HttpHeaders({
          authportal: token
        }),
      }).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async delete(url: string): Promise<any> {
    try {
      // return await this.api.delete(environment.API_URL+url).toPromise();
      var token:string = await this.getAuthToken();
      return await this.api.delete(environment.API_URL + url, {
        headers: new HttpHeaders({
          authportal: token
        }),
      }).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async getAuthToken(): Promise<string> {
    try{
      var user = await this.auth.currentUser;
      var token = await user?.getIdToken();
      console.log(token);
      return `${token}`;
    }
    catch(e){
      console.log(e);
      return 'errorGeneratingToken';
    }
  }
}
