import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  url='http://localhost:4000/admin'

  constructor(private http:HttpClient) { }

  getUserCount(){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.get(this.url+'/user-count',httpOptions)
  }
  getBookcarCount(){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.get(this.url+'/bookcar-count',httpOptions)
  }
}
