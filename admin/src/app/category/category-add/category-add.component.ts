import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  title:''
  description=''
  constructor(private service:CategoryService,private toastr:ToastrService,private modal:NgbModal) { }

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
      this.service.addCategory(this.title,this.description)
          .subscribe(response=>{
            this.modal.dismissAll('ok')
          })
    }
  }
  onCancel(){
    this.modal.dismissAll('cancel')
  }
}
