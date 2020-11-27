import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='http://localhost:4000/user'

  constructor(private http:HttpClient) { }

  getUsers(){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.get(this.url,httpOptions)
  }

  suspendUser(id:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }

    console.log(`token=${sessionStorage['token']}`)
    return this.http.put(this.url+ '/suspend' + '/' +id,httpOptions)
  }

  activateUser(id:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }

    console.log(`token=${sessionStorage['token']}`)
    return this.http.put(this.url+ '/activate' + '/' +id,httpOptions)
  }

}
