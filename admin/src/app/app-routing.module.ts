import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminService } from './admin/admin.service';
import { SigninComponent } from './admin/signin/signin.component';
import { BookedcarListComponent } from './bookedcar/bookedcar-list/bookedcar-list.component';
import { BookingHistoryComponent } from './bookedcar/booking-history/booking-history.component';
import { CountComponent } from './count/count.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserListComponent } from './user/user-list/user-list.component';


const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'car-list',component:ProductListComponent,canActivate:[AdminService]},
  {path:'car-add',component:ProductAddComponent,canActivate:[AdminService]},
    {path:'bookedcar-list',component:BookedcarListComponent,canActivate:[AdminService]},
  {path:'user-list',component:UserListComponent,canActivate:[AdminService]},
  {path:'booking-history',component:BookingHistoryComponent,canActivate:[AdminService]},
  {path:'monthly-report',component:MontlyReportComponent,canActivate:[AdminService]},
  {path:'',component:CountComponent,canActivate:[AdminService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
