import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users=[]
  constructor(private toastr:ToastrService,private service:UserService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(){
    this.service.getUsers()
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.users=response['data']
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  onSuspend(user){
    this.service.suspendUser(user['id'])
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.loadUsers()
                  }
                  else{
                    console.log(response)
                    this.toastr.error(response['error'])
                  }
                })
  }

  onActivate(user){
    this.service.activateUser(user['id'])
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.loadUsers()
                  }
                  else{
                    console.log(response)
                    this.toastr.error(response['error'])
                  }
                })

  }

}
