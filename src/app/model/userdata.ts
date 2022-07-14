import { Outcome } from "./outcome";
import { ZusProfile } from "./zusprofile";

export class UserData {

    outcomeList: Outcome[] = [];
    income: number = 0;
    taxRatePicked: number = 0;
    taxFormPicked: number = 0;
    zusProfile: ZusProfile[] = [];
    zusPicked: number = 0;
    zusChorobowe: boolean = false;
    bigFamily: boolean = false;
    taxFree: boolean = false;
}