import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DrivinglicenceComponent } from '../bookedcar/drivinglicence/drivinglicence.component';
import { MontlyReportService } from './montly-report.service';
import   { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-montly-report',
  templateUrl: './montly-report.component.html',
  styleUrls: ['./montly-report.component.css']
})
export class MontlyReportComponent implements OnInit {
  years=[]
  months=[]
  bookedcars=[]
  year=0
  month=0
  cars=[]
  carId=0
  monthlyRent=0
  constructor(private service:MontlyReportService,private toastr:ToastrService,private modal:NgbModal) { }

  ngOnInit(): void {
    this.getYears()
    this.getMonths()
    this.getBookedCars()
    this.getAllCars()
  }

  public generatePDF(): void {
  
    var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`MonthlyReport${this.year}${this.month}${this.carId}${new Date()}.pdf`); // Generated PDF
      });
  
  
  }

  getYears(){
    this.service.getYears()
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.years=response['data']
                    console.log(`years=${this.years}`)
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  getMonths(){
    this.service.getMonths(this.year)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.months=response['data']
                    console.log(`months=${this.months}`)
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  getAllCars(){
    this.service.getCars()
    .subscribe(response=>{
      if(response['status']=='success')
      {
        this.cars=response['data']
      }
      else{
        this.toastr.error(response['error'])
      }
    })
  }

  getBookedCars(){
    this.getMonths()
    this.monthlyRent=0
    console.log(`****year.year=${this.year}`)
    this.service.postReport(this.month,this.year,this.carId)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.bookedcars=response['data']
                    console.log(`bookedcar=${this.bookedcars}`)
                    for(let i=0;i<this.bookedcars.length;i++)
                    {
                      if(this.bookedcars[i]['totalRent']!=null)
                      this.monthlyRent+=parseInt(this.bookedcars[i]['totalRent'])
                    }
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  getBookedCars1(){
    //this.getMonths()
    this.monthlyRent=0
    console.log(`****year.year=${this.year}`)
    this.service.postReport(this.month,this.year,this.carId)
                .subscribe(response=>{
                  if(response['status']=='success')
                  {
                    this.bookedcars=response['data']
                    console.log(`bookedcar=${this.bookedcars}`)
                    for(let i=0;i<this.bookedcars.length;i++)
                    {
                      if(this.bookedcars[i]['totalRent']!=null)
                      this.monthlyRent+=parseInt(this.bookedcars[i]['totalRent'])
                    }
                  }
                  else{
                    this.toastr.error(response['error'])
                  }
                })
  }

  showLicence(car){
    const modalRef=this.modal.open(DrivinglicenceComponent,{size:'lg'})
    const component=modalRef.componentInstance as DrivinglicenceComponent
    component.image=car.drivingLicence
    modalRef.result.finally(()=>{
      this.getMonths()
      this.getYears()
    })
  }

}

