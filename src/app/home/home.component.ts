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

  public employees=[]
  public update:number;

  constructor(private data:DataTransferService, private navigate:Router) { }

  ngOnInit(): void {
    this.data.getEmployees()
    .subscribe(
      (value:any) => {
        this.employees= value.data;
      console.log(this.employees);
      }
    );

    this.data.getEmployees().subscribe( data => console.log(data));
  }

  edit(value){
    this.update=value;
    console.log(this.update);
    this.navigate.navigate(['add',this.update]);
  }


  remove(getId:number){
    this.data.removeEmployee(getId).subscribe(data=>console.log("delete successful"));  
    window.location.reload();
  }
}
