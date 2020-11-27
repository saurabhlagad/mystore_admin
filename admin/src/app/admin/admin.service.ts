import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{
  url='http://localhost:4000/admin'
  constructor(private http:HttpClient,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!sessionStorage['token']){
       this.router.navigate(['/signin'])
       return false
    }
    else{
       return true
     }
  }
  
  signin(email:string,password:string)
  {
    console.log('in signin function')
    console.log(`email:${email} and password:${password}`)
    const body={
      email:email,
      password:password
    }
    //console.log(this.http.post(this.url+'/login',body))
    return this.http.post(this.url+'/login',body)
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if(!sessionStorage['token']){
  //     this.router.navigate['/signin']
  //     return false
  //   }
  //   else{
  //     return true
  //   }
  // }
}
