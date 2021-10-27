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
    this.displayUsers();
  }

  users!: Array<any>;

  async displayUsers() {
    var result: any = await this.api
      .get(environment.API_URL + '/user/all')
      .toPromise();
    console.log(result)
    if (result.success == true) {
      this.users = result.data;
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
