import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit(): void {
  }

  onChange() {
    this.dataService.updateUserData(this.dataService.userData);
  }
}
