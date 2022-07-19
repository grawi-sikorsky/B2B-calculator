import { Component, OnInit } from '@angular/core';
import { Outcome } from 'src/app/model/outcome';
import { DataService } from '../../service/data.service';

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
    this.dataService.updateUserData(this.dataService.userData);
  }

  addRow() {
    const wydatek: Outcome = new Outcome("Nowy wydatek", 0, 0, 0, 100);
    this.dataService.userData.outcomeList.push(wydatek);
  }

  deleteRow(index: number) {
    this.dataService.userData.outcomeList.splice(index, 1);
    this.onChange();
  }

  onClickVatReduce(index: any) {
    if (this.dataService.userData.outcomeList[index].vatReduce === 100) {
      this.dataService.userData.outcomeList[index].vatReduce = 50
    }
    else if (this.dataService.userData.outcomeList[index].vatReduce === 50) {
      this.dataService.userData.outcomeList[index].vatReduce = 0
    }
    else {
      this.dataService.userData.outcomeList[index].vatReduce = 100
    }

    this.dataService.updateUserData(this.dataService.userData);
  }
}
