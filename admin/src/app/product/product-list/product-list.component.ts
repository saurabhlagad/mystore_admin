import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { report } from 'process';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  cars=[]
  
  constructor(private toastr:ToastrService,private service:ProductService,private modal:NgbModal) { }


  ngOnInit(): void {
    this.loadProducts()
  }
  loadProducts(){
    //console.log()
    const observable=this.service.getProducts()
    observable.subscribe(response=>{
      if(response['status']=='success')
      {
        this.cars=response['data']
      }
      else{
        this.toastr.error(response['error'])
      }
      console.log(this.cars)
    })
  }


  onDelete(product){
    this.service.deleteProduct(product['id'])
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    console.log(`response data:${response['data']}`)
                    this.loadProducts()
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  onAdd(){
    const modalRef=this.modal.open(ProductAddComponent,{size:'lg'})
    modalRef.result.finally(()=>{
      this.loadProducts()
    })
  }

  onEdit(car){
    const modalRef=this.modal.open(ProductEditComponent,{size:'lg'})
    const component=modalRef.componentInstance as ProductEditComponent
    component.carName=car.carName
    component.noOfSeats=car.noOfSeats
    component.plateNo=car.plateNo
    component.model=car.model
    component.transmission=car.transmission
    component.pricePerHour=car.pricePerHour
    component.fuel=car.fuel
    component.description=car.description
    component.id=car.id
    component.image=car.image
    component.isAvailable=car.isAvailable
    modalRef.result.finally(()=>{
      this.loadProducts()
    })
  }
}

