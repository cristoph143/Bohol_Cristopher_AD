import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../../../../src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  logInForm: FormGroup = new FormGroup({
    fCEmail: new FormControl('', Validators.required),
    fCPassword: new FormControl('', Validators.required)
  });

  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  // async login() {
  //   var result: any = await this.api
  //     .post('/user/login', {
  //       email: this.fcEmail.value,
  //       password: this.fcPassword.value,
  //     });
  //     // console.log('---')
  //     // console.log(result.data.name)
  //     // User.userService(result.data.name)
  //   console.log(result)
  //   if (result.success == true) {
  //     this.nav('home');
  //   }
  //   else {
  //     alert(result.data);
  //   }
  // }

  error = '';
  async login() {
    try {
      this.error = '';
      var result: any = await this.auth.login(
        this.fcEmail.value,
        this.fcPassword.value
      );
      console.log(result);
      if (!this.auth.authenticated) {
        this.error = result.data;
        alert(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}