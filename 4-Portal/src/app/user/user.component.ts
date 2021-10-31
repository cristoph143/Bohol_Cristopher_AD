import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }
  

  users!: Array<User>;

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async deleteUser(i: number) {
    var decision = confirm('Delete user ' + this.users[i].name);
    if(decision)
    {
      var result = await this.api.delete(`/user/${this.users[i].id}`);
      if(result.success){
        this.getData();
      }
    }
  }

  async resetDB(){
    var result = await this.api.patch('/user/reset');
    this.getData();
  }
  async getData(term?: string) {
    if (term == undefined || term == null) {
      this.users = await this.getAll();
      console.log(this.users);
    }
  }
  async getAll(): Promise<Array<User>> {
    var result = await this.api.get('/user/all');
    var temp: Array<User> = [];
    if (result.success) {
      result.data.forEach((json: any) => {
        var tempU = User.fromJson(json.id, json);
        if (tempU != null) temp.push(tempU);
      });
    }
    return temp;
  }

  requestResult = '';
  searchRestult = '';

  async search(query: string) {
    this.getResult(await this.searchTerm(query));
  }

  private getResult(result: any) {
    if (result.success) {
      this.users = this.toArray(result.data);
      console.log(this.users);
    } else {
      this.requestResult = result.data;
    }
  }

  private toArray(result: any): any[] {
    var list = [];
    for (var items in result) {
      list.push(result[items]);
    }

    return list;
  }

  private async searchTerm(term: string): Promise<any> {
    try {
      return await this.api
        .get(environment.API_URL + '/user/register' + term);
    } catch (error) {
      console.log(error);
    }
  }


  rowSelected(row: any) {
    console.log(row);
  }

  async displayUsers() {
    var result: any = await this.api
      .get(environment.API_URL + '/user/all');
    console.log(result)
    if (result.success == true) {
      this.users = result.data;
      console.log(result);
    }
    else {
      alert(result.data);
    }
  }

  addUserForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl(0, [
        Validators.required,
        Validators.min(18), 
        Validators.max(65)
      ]),
    fcEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ])
  });

  error: string = '';
  onSubmit() {
    if (!this.addUserForm.valid) {
      {
        this.error = 'No fields must be empty';
        alert(this.error);
        return;
      }
    }
    if (this.addUserForm.valid) {
      var payload: {
        name: string;
        email: string;
        age: number;
      };
      payload = {
        name: this.addUserForm.value.fcName,
        age: this.addUserForm.value.fcAge,
        email: this.addUserForm.value.fcEmail,
      };
      console.log(payload);
      alert('Hellow')
    }
  }
}
