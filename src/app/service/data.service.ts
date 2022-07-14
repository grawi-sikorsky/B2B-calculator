import { Injectable } from '@angular/core';
import { Outcome } from '../model/outcome';
import { TaxProfile } from '../model/taxprofile';
import { ZusProfile } from '../model/zusprofile';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  outcomeList: Outcome[] = [];
  income: number = 0;
  taxProfile: TaxProfile = {};
  bigFamily: boolean = false;
  zusProfile: ZusProfile = {};
  zusChorobowe: boolean = false;

}
