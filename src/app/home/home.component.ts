import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public datas=[]
  public update:number;
  public searchData=false;
  public getObj;
  public flag=0;

  /**
   * 
   * @param data to load service
   * @param navigate for navigation 
   */
  constructor(private data:DataTransferService, private navigate:Router) { }

  /**
   * loading data from database to show into table
   */
  ngOnInit(): void {
    this.data.getEmployees()
    .subscribe(
      (value:any) => {
        this.datas = value.data;
      console.log(this.datas);
      }
    );

    this.data.getEmployees().subscribe( data => console.log(data));
  }


  /**
   * 
   * @param value  get id for updating data according empId
   */
  edit(value){
    this.update=value;
    console.log(this.update);
    this.navigate.navigate(['add',this.update]);
  }

  /**
   * 
   * @param value to delete data from database according to empId
   */

  remove(getId:number){
    this.data.removeEmployee(getId).subscribe(data=>console.log("delete successful"));  
    window.location.reload();
  }

  /**
   * 
   * @param id to search data according to empId for search box
   */
  sendSearchValue(id:any){
    this.searchData=false;

    this.getObj=new User();
    for(let i=0;i<this.datas.length;i++){
      if(this.datas[i].empId==id.value){
        this.getObj.empId=this.datas[i].empId;
        this.getObj.name=this.datas[i].name;
        this.getObj.profile=this.datas[i].profile;
        this.getObj.gender=this.datas[i].gender;
        this.getObj.department=this.datas[i].department;
        this.getObj.salary=this.datas[i].salary;
        this.getObj.startDate=this.datas[i].startDate;
        this.flag=1;
      }
    }
    if(this.flag==1){
      this.searchData=true;
      this.flag=0;
    }else{
      alert("Employee Id not Found");
    }
 }
}
