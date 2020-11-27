import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url='http://localhost:4000/category'

  constructor(private http:HttpClient) { }
  getCategory(){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.http.get(this.url,httpOptions)
  }
  addCategory(title:string,description:string){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const body={
      title:title,
      description:description
    }
    return this.http.post(this.url,body,httpOptions)
  }

  deleteCategory(id:number){
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
  }
  return this.http.delete(this.url + "/" + id,httpOptions)
  }

  updateCategory(id:number,title:string,description:string)
  {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }

    const body={
      title:title,
      description:description
    }

    return this.http.put(this.url + '/' + id,body,httpOptions)
  }
}
