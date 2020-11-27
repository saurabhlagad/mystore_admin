import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FunctionExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url='http://localhost:4000/car'
  constructor(private http:HttpClient) {}


  getProducts(){
    //console.log(sessionStorage['token'])
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.get(this.url,httpOptions)
  }


  addProduct(carName:string,noOfSeats:number,plateNo:string,pricePerHour:string,model:string,description:string,transmission:string,fuel:string,image:any)
  {
    const body=new FormData()
    body.append("carName",carName)
    body.append("noOfSeats",noOfSeats+'')
    body.append("plateNo",plateNo)
    body.append("pricePerHour",pricePerHour+'')
    body.append("model",model)
    body.append("description",description)
    body.append("transmission",transmission)
    body.append("fuel",fuel)
    body.append("image",image)

    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }

    return this.http.post(this.url,body,httpOptions)

  }


  deleteProduct(id:number){
    //console.log(sessionStorage['token'])
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.delete(this.url + '/' + id,httpOptions)
  }

  updateProduct(id:number,carName:string,noOfSeats:number,plateNo:string,pricePerHour:string,model:string,description:string,transmission:string,fuel:string,image:any,isUploaded:number,isAvailable:number)
  {
    console.log(`in updateproduct service`)
    console.log(`id=${id} , carname:${carName} , no of seats=${noOfSeats},plate no=${plateNo},price/hour=${pricePerHour},model=${model},description=${description},transmission=${transmission},fuel=${fuel},image=${image},isAvailable=${isAvailable}`)
    if(isUploaded==1)
    {
      const body=new FormData()
    body.append("carName",carName)
    body.append("noOfSeats",noOfSeats+'')
    body.append("plateNo",plateNo)
    body.append("pricePerHour",pricePerHour+'')
    body.append("model",model)
    body.append("description",description)
    body.append("transmission",transmission)
    body.append("fuel",fuel)
    body.append("image",image)
    body.append("isAvailable",isAvailable+'')
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.put(this.url + '/' + id,body,httpOptions)
    }
    else{
    const body={
      carName:carName,
      noOfSeats:noOfSeats,
      plateNo:plateNo,
      pricePerHour:pricePerHour,
      model:model,
      description:description,
      transmission:transmission,
      fuel:fuel,
      isAvailable:isAvailable
    }

    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })      
    }
    console.log(body)
    return this.http.put(this.url + '/withoutImage/' + id,body,httpOptions)
    }
    
  }

  // getCategory(){
  //   const httpOptions={
  //     headers:new HttpHeaders({
  //       token:sessionStorage['token']
  //     })
  //   }
  //   return this.http.get('http://localhost:4000/category',httpOptions)

  // }

  // getBrands(){
  //   const httpOptions={
  //     headers:new HttpHeaders({
  //       token:sessionStorage['token']
  //     })
  //   }
  //   return this.http.get('http://localhost:4000/brand',httpOptions)

  // }
}
