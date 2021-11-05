import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from '../../../../src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    if (!this.auth.authenticated) {
      this.nav('login');
      this.userName = 'User Portal System';
    //   this.signOut= 'SignOut';
    // }
    // else{
      
    // //   this.nav('home');
    // //   var result = confirm('Sign out?');
    // //   if(result){
    // //     this.nav('login');  
    // //   }
    // // }
    //   this.signOut= 'SignOut';
    // this.userName = User.userService();
    // console.log('nav ' + this.userName)
    }
  }
  userName: string="";
  signOut: string ="";



  clickHandler(){
    
    // if (this.auth.authenticated) {
    //   this.signOut= 'SignOut';
    const confirm = prompt('Are you sure to signout?');
    if(confirm == 'yes'){
      this.logout();
    }
  // }
  }

  logout() {
    this.auth.logout();
    this.nav('login');
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
