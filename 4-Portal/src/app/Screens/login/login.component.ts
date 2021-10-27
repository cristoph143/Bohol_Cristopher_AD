import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

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
      .post('/user/login', {
        email: this.fcEmail.value,
        password: this.fcPassword.value,
      });
    console.log(result)
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