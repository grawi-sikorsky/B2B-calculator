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
    localStorage.setItem("userData", JSON.stringify(this.userData));
  }

  prepareData() {
    this.userData.zusProfile.push(new ZusProfile("Lubię duży ZUS'ik", 1500));
    this.userData.zusProfile.push(new ZusProfile("Lubię mały ZUS'ik (2 lata)", 750));
    this.userData.zusProfile.push(new ZusProfile("ZUS'ik plusik (do 120k / rok)", 500));
    this.userData.zusProfile.push(new ZusProfile("ZUS'iku nie płacę", 0));

    if(localStorage.getItem("userData") !== null){
      this.userData = JSON.parse(localStorage.getItem("userData")!);
    }
  }
}