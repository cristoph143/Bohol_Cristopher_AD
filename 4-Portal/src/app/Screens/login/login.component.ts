import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: HttpClient) { }

  ngOnInit(): void {
  }

  logInForm: FormGroup = new FormGroup({
    fCEmail: new FormControl('', Validators.required),
    fCPassword: new FormControl('', Validators.required)
  });

  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  async login() {
    var result: any = await this.api
      .post(environment.API_URL + '/user/login', {
        email: this.fcEmail.value,
        password: this.fcPassword.value,
      })
      .toPromise();
      var result1: any = await this.api
      .get(environment.API_URL + '/user/all')
      .toPromise();
    console.log(result)
    console.log('d')
    console.log(result1);
    if (result.success == true) {
      this.nav('home');
    }
    else {
      alert(result.data);
    }
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}