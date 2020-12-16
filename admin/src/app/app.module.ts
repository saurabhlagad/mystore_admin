import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './admin/signin/signin.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandAddComponent } from './brand/brand-add/brand-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { BookedcarListComponent } from './bookedcar/bookedcar-list/bookedcar-list.component';
import { BookingHistoryComponent } from './bookedcar/booking-history/booking-history.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import { CountComponent } from './count/count.component';
import { GenerateBillComponent } from './bookedcar/generate-bill/generate-bill.component';
//import { DrivinglicenceComponent } from './drivinglicence/drivinglicence/drivinglicence.component';
//import { BookedcarEditComponent } from './bookedcar/bookedcar-edit/bookedcar-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ProductListComponent,
    ProductAddComponent,
    CategoryAddComponent,
    CategoryListComponent,
    BrandListComponent,
    BrandAddComponent,
    UserListComponent,
    CategoryEditComponent,
    BrandEditComponent,
    ProductEditComponent,
    BookedcarListComponent,
    BookingHistoryComponent,
    MontlyReportComponent,
    CountComponent,
    GenerateBillComponent
    //DrivinglicenceComponent,
    //BookedcarEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
