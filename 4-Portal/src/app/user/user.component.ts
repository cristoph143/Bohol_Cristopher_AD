import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
  // table = document.getElementById('table');

  // for(var i = 1; i < table.rows.length; i++) {
  //   table.rows[i].onclick = function () {
  //     //rIndex = this.rowIndex;
  //     document.getElementById("fname").value = this.cells[0].innerHTML;
  //     document.getElementById("lname").value = this.cells[1].innerHTML;
  //     document.getElementById("age").value = this.cells[2].innerHTML;
  //   };
  // }
}
