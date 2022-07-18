import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Outcome } from '../model/outcome';
import { Subject } from 'rxjs/internal/Subject';

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

  addRow() {
    const wydatek: Outcome = new Outcome("Nowy wydatek", 0, 0, 0, 100);
    this.dataService.userData.outcomeList.push(wydatek);
  }
  deleteRow(index:number) {

      this.dataService.userData.outcomeList.splice(index,1);
      this.onChange();
  }

  clearNetto(index:any){
    this.dataService.userData.outcomeList[index].netto = undefined;
  }
  
  onUpdate(index:any){
    this.dataService.userData.outcomeList[index].netto = 0;
    this.dataService.updateUserData(this.dataService.userData);
  }
}
