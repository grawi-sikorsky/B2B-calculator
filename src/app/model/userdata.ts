import { Outcome } from "./outcome";
import { TaxProfile } from "./taxprofile";
import { ZusProfile } from "./zusprofile";

export class UserData {
    
    outcomeList: Outcome[] = [];
    income: number = 0;
    taxProfile: TaxProfile = {};
    bigFamily: boolean = false;
    zusProfile: ZusProfile[] = [];
    zusPicked: number = 0;
    zusChorobowe: boolean = false;
}