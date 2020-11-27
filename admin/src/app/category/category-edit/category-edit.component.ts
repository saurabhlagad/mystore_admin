import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  constructor(private modal:NgbModal,private service:CategoryService,private toastr:ToastrService) { }
  title=''
  description=''
  id=0
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
      this.service.updateCategory(this.id,this.title,this.description)
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

  onCancel(){
    this.modal.dismissAll('cancel')
  }
}

