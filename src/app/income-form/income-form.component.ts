import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  constructor(public dataService:DataService) { }

  ngOnInit(): void {
  }

  onChange(){
    console.log(this.dataService.userData);
    this.dataService.updateUserData(this.dataService.userData);
  }

  onChangePrice(val:any){
    this.dataService.userData.income = val;
    this.dataService.updateUserData(this.dataService.userData);
  }
}
