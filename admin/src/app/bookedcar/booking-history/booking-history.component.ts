import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookedcarService } from '../bookedcar.service';
import { DrivinglicenceComponent } from '../drivinglicence/drivinglicence.component';


@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  cars=[]
  status=-1
  text=''
  isFilter=1
  constructor(private service:BookedcarService,private toastr:ToastrService,private modal:NgbModal) { }

  ngOnInit(): void {
    this.loadCars(this.isFilter)
  }

  loadCars(isFilter){
    console.log(`status:${this.status} ${typeof(this.status)}`)
    this.service.filterCars(this.status)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.cars=response['data']
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })

                this.isFilter=isFilter
               // console.log(`category:${this.category} and brand:${this.brand}`)
                if(this.text.length!=0 && isFilter==1)
                {
                  this.text=''
                }
                if(this.text.length==0 && isFilter==1)
                {
                  // console.log(`isFilter=${isFilter} and this.isPrevFilter=${this.isPrevFilter}`)
                  this.text=''
                  this.service.filterCars(this.status)
                            .subscribe(response=>{
                              if(response['status']=='success')
                              {
                                this.cars=response['data']
                                // console.log('response:success')
                              }
                              else{
                                this.toastr.error(response['error'])
                              }
                            })
                            // console.log(this.products)
                }
                else if(this.text.length!=0 && isFilter==0){
                  // console.log(`isFilter=${isFilter} and this.isPrevFilter=${this.isPrevFilter}`)
                  // this.isPrevFilter=isFilter
                  console.log(`text=${this.text}`)
                  this.service.getSearchedProducts(this.text)
                            .subscribe(response=>{
                              if(response['status']=='success')
                              {
                                this.cars=response['data']
                                console.log(`cars=`+this.cars)
                                // console.log('response:success')
                              }
                              else{
                                this.toastr.error(response['error'])
                              }
                            })
                            // console.log(this.products)
                }
  }

  showLicence(car){
    const modalRef=this.modal.open(DrivinglicenceComponent,{size:'lg'})
    const component=modalRef.componentInstance as DrivinglicenceComponent
    component.image=car.drivingLicence
    modalRef.result.finally(()=>{
      this.loadCars(0)
    })
  }


}
