import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CountService } from './count.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
total_user_count=0
total_bookcar_count=0

getUser(){
  this.service.getUserCount()
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    console.log(`response data:${response['data']}`)
                   this.total_user_count=response['data'][0]['user_count']
                   console.log(`total_user_count=${this.total_user_count}`)
                   //console.log('Hi')
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
}

getBookCar(){
  this.service.getBookcarCount()
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    console.log(`response data:${response['data']}`)
                    this.total_bookcar_count=response['data'][0]['bookcar_count']
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
}
  constructor(private toastr:ToastrService,private service:CountService) { }

  ngOnInit(): void {
    this.getUser()
    this.getBookCar()
  }


}
