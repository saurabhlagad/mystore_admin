import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  title=''
  description=''
  id=0
  constructor(private toastr:ToastrService,private service:BrandService,private modal:NgbModal) { }

  ngOnInit(): void {
  }

  onUpdate(){
    if(this.title.length==0)
    {
      this.toastr.warning('Please, Enter title')
    }
    else if(this.description.length==0)
    {
      this.toastr.warning('Please,Enter description')
    }
    else{
    this.service.updateBrand(this.id,this.title,this.description)
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
