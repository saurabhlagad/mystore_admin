import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { totalmem } from 'os';

@Injectable({
  providedIn: 'root'
})
export class BookedcarService {

  constructor(private http:HttpClient) { }
  url='http://localhost:4000/bookedcars'
  getCars(){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    //console.log(`*************priceperHour=${pricePerHour}`)
   return this.http.get(this.url,httpOptions)
  }


  denyRequest(id:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    console.log(`*****${httpOptions['headers']}*****`)
    return this.http.put(this.url+'/deny/'+id,httpOptions)
  }

  confirmRequest(id:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    console.log(`*****${httpOptions['headers']}*****`)
    return this.http.put(this.url+'/confirm/'+id,httpOptions)
  }


  returnedCar(id:number,returnDate:string,totalBill:string,totalMin:number,bookingTime:string,userEmail:string,pricePerHour:number,carName:string){
    console.log(`return date=${returnDate} totalBill=${totalBill}` )
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const body={
      totalRent:totalBill,
      returnOn:returnDate,
      rideDuration:totalMin,
      bookingTime:bookingTime,
      userEmail:userEmail,
      pricePerHour:pricePerHour,
      carName:carName
    }
    console.log(`*****${httpOptions['headers']}*****`)
    return this.http.put(this.url+'/returned/'+id,body,httpOptions)
  }


  filterCars(returnStatus:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const body={
      returnStatus:returnStatus,

    }
    console.log(`*****${returnStatus} & type=${typeof(returnStatus)} &  body=${body.returnStatus}*****`)
    return this.http.post(this.url+'/filter',body,httpOptions)
  }

  getSearchedProducts(text:string){
    console.log( `!!!!!!!!!!IN search service`)
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.get(this.url+'/search/'+text,httpOptions)

  }
}

