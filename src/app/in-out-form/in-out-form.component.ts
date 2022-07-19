import { Component, OnInit } from '@angular/core';
import { Outcome } from '../model/outcome';
import { DataService } from '../service/data.service';

@Component({
    selector: 'app-in-out-form',
    templateUrl: './in-out-form.component.html',
    styleUrls: ['./in-out-form.component.css']
})
export class InOutFormComponent implements OnInit {

    constructor(public dataService: DataService) { }

    ngOnInit(): void {
        this.isMobile = this.getIsMobile();
        window.onresize = () => {
            this.isMobile = this.getIsMobile();
        };
    }

    isMobile = false;
    getIsMobile(): boolean {
        const w = document.documentElement.clientWidth;
        const breakpoint = 992;
        console.log(w);
        if (w < breakpoint) {
            return true;
        } else {
            return false;
        }
    }

    onChange() {
        this.dataService.updateUserData(this.dataService.userData);
    }

    onChangePrice(val: any) {
        this.dataService.userData.income = val;
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
