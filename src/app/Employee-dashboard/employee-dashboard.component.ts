import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { EmployeeModels } from './employee-dashboard.models';
import {ApiService} from '../shared/api.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  // เปรียบเหมือนคลาส
  formEmployee! : FormGroup;
  EmployeeModel = new EmployeeModels();
  EmployeeData: any
  showAdd!: boolean
  showUpdate!: boolean

  constructor(private api :  ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      Product: new FormControl(),
      Price: new FormControl(),
      Stock: new FormControl(),
      Img: new FormControl(),
      //Salary: new FormControl(),
    })
    this.getEmployee()
  }
  postEmployee(){
    this.EmployeeModel.Product = this.formEmployee.value.Product
    this.EmployeeModel.Price = this.formEmployee.value.Price
    this.EmployeeModel.Stock = this.formEmployee.value.Stock
    this.EmployeeModel.Img = this.formEmployee.value.Img
    //this.EmployeeModel.Salary = this.formEmployee.value.Salary
    //console.log(this.EmployeeModel)
    this.api.postEmployee(this.EmployeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Add Product Complete","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    error=>{
      Swal.fire("Error","Add Product Error","error")
    })
  }

  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.EmployeeData = res;
    },)
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe(res=>{
      Swal.fire("Complete","Delete Product Complete","success")
      this.getEmployee()
    },
    error=>{
      Swal.fire("Error","Delete Product Error","error")
    })
  }
  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showUpdate = false
    this.EmployeeData.id = 0
  }
  clickEdit(data : any){
    this.showAdd = false
    this.showUpdate = true

    this.EmployeeData.id = data.id
    this.formEmployee.controls['Product'].setValue( data.Product)
    this.formEmployee.controls['Price'].setValue(data.Price)
    this.formEmployee.controls['Stock'].setValue(data.Stock)
    this.formEmployee.controls['Img'].setValue(data.Img)
    //this.formEmployee.controls['Salary'].setValue(data.Salary)
  }
  updateEmployee(){
    this.EmployeeModel.Product = this.formEmployee.value.Product
    this.EmployeeModel.Price = this.formEmployee.value.Price
    this.EmployeeModel.Stock = this.formEmployee.value.Stock
    this.EmployeeModel.Img = this.formEmployee.value.Img
    //this.EmployeeModel.Salary = this.formEmployee.value.Salary
    this.api.updateEmployee(this.EmployeeData.id,this.EmployeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Update Product Complete","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    error=>{
      Swal.fire("Error","Update Product Error","error")
    })

  }
}
