import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any[];

  constructor(public navCtrl: NavController, public http: HttpClient) {
    http.get('https://cesarapp12.herokuapp.com/api/v1/users/').subscribe((d: any) => {
      this.users = d.data;
      console.log(this.users)
    })
  }
  deleted(id) {
    this.http.delete('https://cesarapp12.herokuapp.com/api/v1/users/' + id).subscribe(d => {
      this.http.get('https://cesarapp12.herokuapp.com/api/v1/users/').subscribe((d: any) => {
        this.users = d.data;
        console.log(this.users)
      })
    })
  }
  edit(id, lastName,firstName) {
    const body = {
      "firstName": firstName,
      "lastName": lastName,
    }
    this.http.put('https://cesarapp12.herokuapp.com/api/v1/users/' + id, body).subscribe(() => {
       this.http.get('https://cesarapp12.herokuapp.com/api/v1/users/').subscribe((d: any) => {
        this.users = d.data;
      })
    })


  }
  newUser(lastName, firstName) {
    const body = {
      "firstName": firstName,
      "lastName": lastName,
      "username": firstName + lastName,
      "email": "demo_user@a.com",
      "password": "5636",
    }
    this.http.post('https://cesarapp12.herokuapp.com/api/v1/users/', body).subscribe(()=>{
      this.http.get('https://cesarapp12.herokuapp.com/api/v1/users/').subscribe((d: any) => {
        this.users = d.data;
      })
    })
  }

}
