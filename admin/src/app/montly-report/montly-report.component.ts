import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DrivinglicenceComponent } from '../bookedcar/drivinglicence/drivinglicence.component';
import { MontlyReportService } from './montly-report.service';

@Component({
  selector: 'app-montly-report',
  templateUrl: './montly-report.component.html',
  styleUrls: ['./montly-report.component.css']
})
export class MontlyReportComponent implements OnInit {
  years=[]
  months=[]
  bookedcars=[]
  year=0
  month=0
  constructor(private service:MontlyReportService,private toastr:ToastrService,private modal:NgbModal) { }

  ngOnInit(): void {
    this.getYears()
    this.getMonths()
    this.getBookedCars()
  }



  getYears(){
    this.service.getYears()
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.years=response['data']
                    console.log(`years=${this.years}`)
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  getMonths(){
    this.service.getMonths(this.year)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.months=response['data']
                    console.log(`months=${this.months}`)
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  getBookedCars(){
    this.getMonths()
    console.log(`****year.year=${this.year}`)
    this.service.postReport(this.month,this.year)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.bookedcars=response['data']
                    console.log(`bookedcar=${this.bookedcars}`)
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  getBookedCars1(){
    //this.getMonths()
    console.log(`****year.year=${this.year}`)
    this.service.postReport(this.month,this.year)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.bookedcars=response['data']
                    console.log(`bookedcar=${this.bookedcars}`)
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  showLicence(car){
    const modalRef=this.modal.open(DrivinglicenceComponent,{size:'lg'})
    const component=modalRef.componentInstance as DrivinglicenceComponent
    component.image=car.drivingLicence
    modalRef.result.finally(()=>{
      this.getMonths()
      this.getYears()
    })
  }

}

