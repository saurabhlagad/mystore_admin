import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookedcarService } from '../bookedcar.service';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {

  constructor(private service:BookedcarService,private toastr:ToastrService,private modal:NgbModal,private router:Router) { }
  totalMin=0
  fromDate=''
  returnDate=''
  pricePerHour=0
  carId=0
  totalBill:any
  pricePerMin:any
  userEmail=''
  carName=''
  ngOnInit(): void {
    this.pricePerMin=this.pricePerHour/60; 
    this.pricePerMin=this.pricePerMin.toFixed(2)
   this.totalBill=this.pricePerMin*this.totalMin;
   this.totalBill=this.totalBill.toFixed(2)
   console.log(`totalBill=${this.totalBill}`)
  }

  onReturned(){
   
    this.service.returnedCar(this.carId,this.returnDate,this.totalBill,this.totalMin,this.fromDate,this.userEmail,this.pricePerHour,this.carName)
                .subscribe(response=>{
                  if(response['status']='success')
                  {
                    this.toastr.success(`you got your car return`)
                    this.router.navigate(['/booked-car'])
                    this.modal.dismissAll('Ok')
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
 }

 onCancle(){
  this.modal.dismissAll('Ok')
 }
}
