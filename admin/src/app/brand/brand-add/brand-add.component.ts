import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  title=''
  description=''
  constructor(private modal:NgbModal,private service:BrandService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onAdd(){
    if(this.title.length==0)
    {
      this.modal.dismissAll('ok')
      this.toastr.warning('Please, Enter title')
    }
    else if(this.description.length==0)
    {
      this.toastr.warning('Please, Enter Description')
    }
    else{
      this.service.addBrand(this.title,this.description)
          .subscribe(response=>{
            this.modal.dismissAll('ok')
          })
    }
  }
  onCancel(){
    this.modal.dismissAll('cancel')
  }
}
