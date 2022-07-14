import { Injectable } from '@angular/core';
import { Outcome } from '../model/outcome';
import { TaxProfile } from '../model/taxprofile';
import { ZusProfile } from '../model/zusprofile';
import { UserData } from '../model/userdata';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    this.prepareData();
  }

  public userData: UserData = {
    outcomeList: [],
    income: 0,
    taxFormPicked: 0,
    taxRatePicked: 0.12,
    zusProfile: [],
    zusPicked: 0,
    zusChorobowe: false,
    bigFamily: false,
    taxFree: false,
  };


  private userDataSubject = new BehaviorSubject<UserData>(this.userData);
  currentUserData = this.userDataSubject.asObservable();

  updateUserData(data: UserData) {
    this.userDataSubject.next(data);
    console.log("next.");
  }

  // INPUT
  dataChanged: boolean = false;
  outcomeList: Outcome[] = [];
  income: number = 0;
  taxProfile: TaxProfile = {};
  taxPicked: number = 0;
  bigFamily: boolean = false;
  zusProfile: ZusProfile[] = [];
  zusPicked: number = 0;
  zusChorobowe: boolean = false;

  prepareData() {
    this.userData.zusProfile.push(new ZusProfile("Lubię duży ZUS'ik (lubię schylać się w więzieniu po mydełko)", 1500));
    this.userData.zusProfile.push(new ZusProfile("Lubię mały ZUS'ik (2 lata)", 750));
    this.userData.zusProfile.push(new ZusProfile("ZUS'ik plusik (120k / rok)", 500));
    this.userData.zusProfile.push(new ZusProfile("Morawiecki to mój wuj (ZUS'iku nie płacę)", 0));
  }



}

