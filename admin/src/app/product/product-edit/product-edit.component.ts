import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private modal:NgbModal,private service:ProductService,private toastr:ToastrService) { }
  id=0
  carName=''
  noOfSeats=0
  plateNo=''
  pricePerHour=''
  model=''
  description=''
  transmission=''
  fuel=''
  isAvailable=0
  isUploaded=0
  image=undefined
  ngOnInit(): void {
  }
  onUpdate(){
    console.log(`in onUpdate function in edit component isAvialable=${this.isAvailable}`)
    if(this.carName.length==0)
    {
      this.toastr.warning('Please, Enter name of car')
    }
    else if(this.description.length==0)
    {
      this.toastr.warning('Please,Enter description')
    }
    else{
      
      this.service.updateProduct(this.id,this.carName,this.noOfSeats,this.plateNo,this.pricePerHour,this.model,this.description,this.transmission,this.fuel,this.image,this.isUploaded,this.isAvailable)
                  .subscribe(response=>{
                    if(response['status']='success')
                    {
                      this.modal.dismissAll('ok')
                    }
                    else{
                      this.toastr.error(response['error'])
                    }
                  })
    }
  }
  onImageSelected(event){
    console.log(event)
    this.image=event.target.files[0]
    console.log('*************')
    console.log(this.image)
    this.isUploaded=1
  }
  onCancel(){
    this.modal.dismissAll('cancel')
  }
}
