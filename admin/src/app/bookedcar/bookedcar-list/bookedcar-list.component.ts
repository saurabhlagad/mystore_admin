import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookedcarService } from '../bookedcar.service';
import { DrivinglicenceComponent } from '../drivinglicence/drivinglicence.component';

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
    this.service.returnedCar(car.id)
                .subscribe(response=>{
                  if(response['status']='success')
                  {
                    this.toastr.success(`you got your car return`)
                    this.loadBookedCars()
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
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

