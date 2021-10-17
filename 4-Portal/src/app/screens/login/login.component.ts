import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'portal';
  userCredential1:string = 'null';
  userCredential2:string = 'null';

  users: Array<any> = [
    {username: 'potato@gmail.com', paswword: 'eyes'},
    {username: 'potato1', paswword: 'eyes1'},
    {username: 'potato2', paswword: 'eyes2'},
    {username: 'potato3', paswword: 'eyes3'},
    {username: 'potato4', paswword: 'eyes4'},
    {username: 'potato5', paswword: 'eyes5'},
    {username: 'potato6', paswword: 'eyes6'}
  ];

  login(email: string, password: string){
    this.userCredential1 = email;
    this.userCredential2 = password;
  }

}
