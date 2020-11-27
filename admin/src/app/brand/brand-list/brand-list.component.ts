import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandAddComponent } from '../brand-add/brand-add.component';
import { BrandEditComponent } from '../brand-edit/brand-edit.component';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands=[]
  title=''
  description=''
  constructor(private toastr:ToastrService,private service:BrandService,private modalService:NgbModal) { }


  ngOnInit(): void {
    this.loadBrands()
  }

  loadBrands(){
    const observable=this.service.getBrands()
    observable.subscribe(response=>{
      if(response['status']=='error')
      {
        this.toastr.error(response['error'])
      }
      else{
        this.brands=response['data']
      }
    })
  }

  onAdd(){
    const modalRef=this.modalService.open(BrandAddComponent)
    modalRef.result.finally(()=>{
      this.loadBrands()
    })
  }

  onDelete(brand){
    console.log(brand)
    this.service.deleteBrand(brand['id'])
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.loadBrands()
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  onEdit(brand){
    const modalRef=this.modalService.open(BrandEditComponent)
    const component=modalRef.componentInstance as BrandEditComponent
    component.title=brand.title
    component.description=brand.description
    component.id=brand.id
    modalRef.result.finally(()=>{
      this.loadBrands()
    })
  }

    

}
