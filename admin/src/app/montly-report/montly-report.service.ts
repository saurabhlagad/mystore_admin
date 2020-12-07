import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MontlyReportService {
  url='http://localhost:4000/bookedcars'
  constructor(private http:HttpClient) { }
  getYears(){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    console.log(`in get years function`)
    return this.http.get(this.url+'/yearreport',httpOptions)
  }

  getMonths(year:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    console.log(`in get months function`)
    return this.http.get(this.url+'/monthreport/'+year,httpOptions)
  }

  postReport(month:number,year:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const body={
      month:month,
      year:year
    }
    return this.http.post(this.url+'/monthlyreport/',body,httpOptions)
  }
}

