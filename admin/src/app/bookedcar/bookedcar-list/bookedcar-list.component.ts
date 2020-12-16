import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookedcarService } from '../bookedcar.service';
import { DrivinglicenceComponent } from '../drivinglicence/drivinglicence.component';
import { GenerateBillComponent } from '../generate-bill/generate-bill.component';

@Component({
  selector: 'app-bookedcar-list',
  templateUrl: './bookedcar-list.component.html',
  styleUrls: ['./bookedcar-list.component.css']
})
export class BookedcarListComponent implements OnInit {

  constructor(private service:BookedcarService,private toastr:ToastrService,private modal:NgbModal) { }
  cars=[]
  ngOnInit(): void {
    this.loadBookedCars()
  }

  loadBookedCars(){
    this.service.getCars()
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.cars=response['data']
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
      this.loadBookedCars()
    })
  }
  
  onConfirm(car){
    this.service.confirmRequest(car.id)
                .subscribe(response=>{
                  if(response['status']='success')
                  {
                    this.toastr.success(`permission confirmed`)
                    this.loadBookedCars()
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })

  }

  onReturned(car){
     
      
    const bookedTime=car.fromDate +'T'+ car.fromTime 
    console.log(`${new Date().toISOString()} and car.created_on=${bookedTime}`)
    const currentTime=new Date()
    var msec = Math.abs( currentTime.getTime() - new Date(`${bookedTime}`).getTime() );
    const min = Math.floor((msec/1000)/60);
    console.log(`min=${min}`)
    // if(currentTime.toISOString() < bookedTime){
      //this.toastr.warning(`customer's journey havn't started yet`)
    //}
    //else{
    const modalRef=this.modal.open(GenerateBillComponent,{size:'lg'})
    const component=modalRef.componentInstance as GenerateBillComponent
    component.totalMin=min
    component.fromDate= new Date(`${bookedTime}`).toISOString()
    component.returnDate=currentTime.toISOString()
    component.pricePerHour=car.pricePerHour
    component.carId=car.id
    component.userEmail=car.userEmail
    component.carName=car.carName
    modalRef.result.finally(()=>{
      this.loadBookedCars()
    })
  //}
    // this.service.returnedCar(car.id)
    //             .subscribe(response=>{
    //               if(response['status']='success')
    //               {
    //                 this.toastr.success(`you got your car return`)
    //                 this.loadBookedCars()
    //               }
    //               else{
    //                 this.toastr.error(response['error'])
    //               }
    //             })
  }

  
  onDeny(car){
    this.service.denyRequest(car.id)
                .subscribe(response=>{
                  if(response['status']='success')
                  {
                    this.toastr.success(`permission denied`)
                    this.loadBookedCars()
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }


}

