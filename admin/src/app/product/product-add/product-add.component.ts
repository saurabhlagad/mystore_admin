
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { timeLog } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  // categories=[]
  // brands=[]
  
  // title=''
  // price=''
  // category=1
  // brand=1
  // description=''
  carName=''
  noOfSeats=0
  plateNo=''
  pricePerHour=''
  model=''
  description=''
  transmission=''
  fuel=''
  image=undefined
  constructor(private toastr:ToastrService,private service:ProductService,private modal:NgbModal) { }

  ngOnInit(): void {
    // this.loadBrands()
    // this.loadCategory()
  }

  onImageSelected(event){
    console.log(event)
    this.image=event.target.files[0]
    console.log('*************')
    console.log(this.image)
  }

  // loadCategory(){
  //   const observable=this.service.getCategory()
  //   observable.subscribe(response=>{
  //     if(response['status']=='success')
  //     {
  //       this.categories=response['data']
  //     }
  //     else{
  //       this.toastr.error(response['error'])
  //     }
  //     console.log(this.categories)
  //   })
  // }

  // loadBrands(){
  //   const observable=this.service.getBrands()
  //   observable.subscribe(response=>{
  //     if(response['status']=='error')
  //     {
  //       this.toastr.error(response['error'])
  //     }
  //     else{
  //       this.brands=response['data']
  //     }
  //   })
  // }
  onAdd(){

    // console.log(`title:${this.title}`)
    // console.log(`price:${this.price}`)
    // console.log(`category:${this.category}`)
    // console.log(`brand:${this.brand}`)
    // console.log(`descrition:${this.description}`)
    // console.log(`image:${this.image}`)
    if(this.carName.length==0)
    {
      this.toastr.warning('Enter name of car')
    }
    else if(this.noOfSeats==0)
    {
      this.toastr.warning('Enter no of seats in car')
    }
    else if(this.plateNo.length==0)
    {
      this.toastr.warning('Enter Plate No of car')
    }
    else if(this.pricePerHour.length==0)
    {
      this.toastr.warning('Enter price/hour of car')
    }
    else if(this.model.length==0){
      this.toastr.warning('Enter Model of car')
    }
    else if(this.description.length==0){
      this.toastr.warning('Enter description of car')
    }
    else if(this.transmission.length==0)
    {
      this.toastr.warning('Enter transmission of car')
    }
    else if(this.fuel.length==0){
      this.toastr.warning('Enter fuel of car')
    }
    else if(this.image==undefined)
    {
      this.toastr.warning('Select image file of product')
    }
    else{
      this.service.addProduct(this.carName,this.noOfSeats,this.plateNo,this.pricePerHour,this.model,this.description,this.transmission,this.fuel,this.image)
                  .subscribe(response=>{
                    if(response['status']=='success')
                    {
                      this.modal.dismissAll('ok')
                    }
                    else{
                      this.toastr.error(response['error'])
                    }
                  })
    }
  }

  onCancel(){
    this.modal.dismissAll('cancel')
  }

}

