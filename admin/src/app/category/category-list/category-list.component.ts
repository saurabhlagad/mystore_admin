import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories=[]
  constructor(private toastr:ToastrService,private service:CategoryService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.loadCategory()
  }
  loadCategory(){
    const observable=this.service.getCategory()
    observable.subscribe(response=>{
      if(response['status']=='success')
      {
        this.categories=response['data']
      }
      else{
        this.toastr.error(response['error'])
      }
      console.log(this.categories)
    })
  }

  onAdd(){
    const modalRef=this.modalService.open(CategoryAddComponent)
    modalRef.result.finally(()=>{
      this.loadCategory()
    })
  }

  onDelete(category){
    console.log(category)
    this.service.deleteCategory(category['id'])
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.loadCategory()
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  onEdit(category){
    const modalRef=this.modalService.open(CategoryEditComponent)
    const component=modalRef.componentInstance as CategoryEditComponent
    component.title=category.title
    component.description=category.description
    component.id=category.id
    modalRef.result.finally(()=>{
      this.loadCategory()
    })
  }
}

