
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email=''
  password=''
  constructor(private router:Router,private toastr:ToastrService,private service:AdminService) {}
  ngOnInit(): void {

  }
  onSignin(){
    console.log(this.email)
    console.log(this.password)
    this.service.signin(this.email,this.password)
      .subscribe(response=>{
      if(this.email.length==0){
        this.toastr.warning('please enter email')
        console.log('please enter email')
      }
      else if(this.password.length==0){
        this.toastr.warning('please enter password')
      }
      else{
        if(response['status']=='success'){
          this.toastr.success('welcome')
          //alert('welcome')
          const user=response['data']
          sessionStorage['user_name']=user['firstname'] + ' ' + user['lastname']
          sessionStorage['token']=user['authToken']
          this.router.navigate(['/car-list'])
          console.log(sessionStorage['token'])
        }
        else{
          this.toastr.error(response['error'])
        }
      }
      
    })
  }
}
