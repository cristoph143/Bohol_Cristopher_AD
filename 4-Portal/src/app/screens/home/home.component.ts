import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private api: HttpClient) { }

  ngOnInit(): void {
  }

  users!: Array<any>;

  user1 = [
    {"name":'Leanne Graham',"age" :18,"email":'sincere@april.biz',"password": 'LG_123456'},
{"name":'Ervin Howell',"age" : 21,"email": 'shanna@melissa.tv',"password": 'EH_123123'},
{"name":'Nathan Plains',"age" : 25,"email": 'nathan@yesenia.net',"password": 'NP_812415'},
{"name":'Patricia Lebsack',"age" : 18,"email": 'patty@kory.org',"password": 'PL_12345'}
  ];

  async displayUsers() {
    
    var result: any = await this.api
    .get(environment.API_URL + '/user/all')
    .toPromise();
    console.log(result)
    alert(result);
    this.users = result;
    if (result.success == true) {
      // this.nav('login');
      alert(result.toString());
      console.log(result);
    }
    else {
      alert(result.data);
    }
  }
  
  nav(destination: string) {
    this.router.navigate([destination]);
  }

}
