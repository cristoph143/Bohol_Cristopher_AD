import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private api: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = new FormGroup({
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
      ]),
    fcPassword2: new FormControl('', Validators.required),
  });

  error: string = '';


  async register() {
    var result: any = await this.api
      .post(environment.API_URL + '/user/register', {
        name: this.registerForm.value.fcName,
        age: this.registerForm.value.fcAge,
        email: this.registerForm.value.fcEmail,
        password: this.registerForm.value.fcPassword,
      })
      .toPromise();
    console.log(result)
    // if (result.success == true) {
    //   this.nav('login');
    // }
    // else {
    //   alert(result.data);
    // }
    
  }


  onSubmit() {
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.error = 'Password doesnt match!';
      alert(this.error);
      return;
    }
    if (!this.registerForm.valid) {
      {
        this.error = 'No fields must be empty';
        alert(this.error);
        return;
      }
    }
    if (this.registerForm.valid) {
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };
      payload = {
        name: this.registerForm.value.fcName,
        age: this.registerForm.value.fcAge,
        email: this.registerForm.value.fcEmail,
        password: this.registerForm.value.fcPassword,
      };
      console.log(payload);
      alert('Hellow')
      // this.register();
      this.auth.register(payload).then(data=>{
        if(!data.success) this.error = data.data;
        else this.nav("home");
      });
    }
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }

}
