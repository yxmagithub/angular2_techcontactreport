import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
	constructor() {

	}

	//validate the cell phone number format
	checkPhoneNum(str: string) {
	  //return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
		return /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(str);
	}


	//validate the email format
	checkEmail(str: string) {
	  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str)
	}

}
