import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Outcome } from '../model/outcome';

@Component({
  selector: 'app-outcome-form',
  templateUrl: './outcome-form.component.html',
  styleUrls: ['./outcome-form.component.css']
})
export class OutcomeFormComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  onChange() {
    console.log(this.dataService.userData);
    this.dataService.updateUserData(this.dataService.userData);
  }


  public addRow() {
    const wydatek: Outcome = new Outcome("Nowy wydatek", 0, 0, 0, 100);
    this.dataService.userData.outcomeList.push(wydatek);
  }
}
