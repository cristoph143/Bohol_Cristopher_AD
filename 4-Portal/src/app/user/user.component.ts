import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  addUserForm: FormGroup;

  constructor(private router: Router, private api: ApiService, fb: FormBuilder) {
    this.addUserForm = fb.group({
      fcId: new FormControl('', Validators.required),
      fcName: new FormControl('', Validators.required),
      fcAge: new FormControl(0, [
        Validators.required,
        Validators.min(18),
        Validators.max(65)
      ]),
      fcEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      fcPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ])
    })
  }

  fcId = new FormControl();
  fcName = new FormControl();
  fcAge = new FormControl();
  fcEmail = new FormControl();
  fcPassword = new FormControl();

  set ids(val) {
    this.addUserForm.get('fcId')?.setValue(val);
  }
  get ids() {
    return this.addUserForm.get('fcId');
  }
  get name() {
    return this.addUserForm.get('fcName');
  }
  set name(val) {
    this.addUserForm.get('fcName')?.setValue(val);
  }
  get age() {
    return this.addUserForm.get('fcAge');
  }
  set age(val) {
    this.addUserForm.get('fcAge')?.setValue(val);
  }
  get email() {
    return this.addUserForm.get('fcEmail');
  }
  set email(val) {
    this.addUserForm.get('fcEmail')?.setValue(val);
  }

  id?: any;
  fname?: any;

  rowSelected(row: any) {
    console.log(row.id);
    // this.fcId.setValue(row.id);
    this.ids?.setValue(row.id);
    this.name?.setValue(row.name);
    this.age?.setValue(row.age);
    this.email?.setValue(row.email);

    console.log(this.fname)
    console.log(this.id)
  }

  async addUser() {
    try {
      
      const id1 = this.ids;
      console.log(id1)
      var decision = confirm('Add User' + id1?.value);
      if (decision == true) {

        var result: any = await this.api
          .post('/user/register', {
            name: this.addUserForm.value.fcName,
            age: this.addUserForm.value.fcAge,
            email: this.addUserForm.value.fcEmail,
            password: this.addUserForm.value.fcPassword,
          });
        console.log(result)
        console.log('f')
        if (result.success == true) {
          this.nav('login');
        }
        else {
          alert(result.data);
        }
      }
    } catch (e) {
      console.log(e);
      console.log('---')
    }
  }

  async editUser() {
    try {
      const id1 = this.ids;
      console.log(id1)

      var decision = confirm('Edit User' + id1?.value);
      if (decision == true) {
        var result: any = await this.api
          .patch('/user/' + id1?.value, {
            name: this.addUserForm.value.fcName,
            age: this.addUserForm.value.fcAge,
            email: this.addUserForm.value.fcEmail,
            password: this.addUserForm.value.fcPassword,
          });
        console.log(result)
        console.log('f')
        if (result.success == true) {
          // this.nav('login');
          alert('success')
        }
        else {
          alert(result.data);
        }
      }
    } catch (e) {
      console.log(e);
      console.log('---')
    }
  }


  error: string = '';
  onSubmit() {
    if (!this.addUserForm.valid) {
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };
      payload = {
        name: this.addUserForm.value.fcName,
        age: this.addUserForm.value.fcAge,
        email: this.addUserForm.value.fcEmail,
        password: this.addUserForm.value.fcPassword
      };
      console.log(payload);
      alert('Hellow')
      this.addUser();
    }
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.id);
    console.log(this.fname)
  }


  users!: Array<User>;

  nav(destination: string) {
    this.router.navigate([destination]);
  }

  async deleteUser() {
    const id1 = this.ids;
    const names = this.name;
    console.log(id1?.value)
    console.log(names?.value)
    var decision = confirm('Delete user ' + names?.value);
    if (decision == true) {
      var result = await this.api.delete('/user/' + id1?.value,);
      if (result.success) {
        console.log(this.getData());
        alert('success')
      }
    }
  }


  async resetDB() {
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
}
