import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminService } from './admin/admin.service';
import { SigninComponent } from './admin/signin/signin.component';
import { BookedcarListComponent } from './bookedcar/bookedcar-list/bookedcar-list.component';
import { BookingHistoryComponent } from './bookedcar/booking-history/booking-history.component';
// import { BrandAddComponent } from './brand/brand-add/brand-add.component';
// import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
// import { BrandListComponent } from './brand/brand-list/brand-list.component';
// import { CategoryAddComponent } from './category/category-add/category-add.component';
// import { CategoryEditComponent } from './category/category-edit/category-edit.component';
// import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserListComponent } from './user/user-list/user-list.component';


const routes: Routes = [
  //{path:'/',component:SigninComponent},
  {path:'signin',component:SigninComponent},
  {path:'car-list',component:ProductListComponent,canActivate:[AdminService]},
  {path:'car-add',component:ProductAddComponent,canActivate:[AdminService]},
  // {path:'category-add',component:CategoryAddComponent,canActivate:[AdminService]},
  // {path:'category-list',component:CategoryListComponent,canActivate:[AdminService]},
    {path:'bookedcar-list',component:BookedcarListComponent,canActivate:[AdminService]},
  // {path:'brand-add',component:BrandAddComponent,canActivate:[AdminService]},
  {path:'user-list',component:UserListComponent,canActivate:[AdminService]},
  {path:'booking-history',component:BookingHistoryComponent,canActivate:[AdminService]}
  // {path:'category-edit',component:CategoryEditComponent,canActivate:[AdminService]},
  // {path:'brand-edit',component:BrandEditComponent,canActivate:[AdminService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
