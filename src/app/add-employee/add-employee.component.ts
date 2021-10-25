import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { User } from '../user';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})


export class AddEmployeeComponent implements OnInit {

public getId;
data;
public value:any;

   /**
   * 
   * @param sendData to load service
   * @param router to get id from pathparameter
   * @param nevigate to navigate to another page according to function
   */
    constructor(private sendData:DataTransferService, private router:ActivatedRoute, private nevigate:Router) { }

  ngOnInit(): void {

    this.getId=this.router.snapshot.paramMap.get("id");
    console.log(this.getId);
    this.data=new User();
    this.sendData.getDataById(this.getId).subscribe(
      (getData:any) => 
      {
        this.value=getData.data;
        this.data.name=this.value.name;
        this.data.profile=this.value.profile;
        this.data.gender=this.value.gender;
        this.data.salary=this.value.salary;
        this.data.startDate=this.value.startDate;
        this.data.note=this.value.note;
        this.data.department=this.value.department;
      }
      );
  }

     onsubmit(){
      console.log(this.data);
      this.sendData.enrollEmployee(this.data).subscribe(data=>console.log("successful"));
      this.nevigate.navigate(['home']);
    }
 
    update(){
      this.sendData.updateById(this.data,this.getId).subscribe(data=>console.log("data update successful"));
      this.nevigate.navigate(['home']);
    }

    getVal(value:string){
      this.data.department=value;
    }
}
