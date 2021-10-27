import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) {}

  async post(url:string, body: any): Promise<any> {
    try {
      return await this.api.post(environment.API_URL + url, body).toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
