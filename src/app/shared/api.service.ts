import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postEmployee(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res : any)=>{
      return res
    }))
    // pipe ท่อลำเรียง หรือการส่งค่า //mapการส่งค่าเป็นก้อนๆ
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res : any)=>{
      return res
    }))
  }
  // ลบ ต้องทำการใส่ / ตามหลังด้วย
  deleteEmployee(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/" +id)
    .pipe(map((res : any)=>{
      return res
    }))
  }
  // อัพเดต
  updateEmployee(id : number,data: any){
    return this.http.put<any>("http://localhost:3000/posts/" +id,data)
    .pipe(map((res : any)=>{
      return res
    }))
  }
}
