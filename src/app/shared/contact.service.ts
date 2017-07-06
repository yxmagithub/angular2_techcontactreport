import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

const CONTACT_URL = `./app/contacts.json`;

@Injectable()
export class ContactService {
  constructor(
    private http:Http
  ) {}

  request(url:string, opts:any) {
    return this.http.request(url, new RequestOptions(opts))
    .map(res => {
      let _res = res.json();
      if(opts.id){
        for(let i=0; i<_res.length; i++){
          if(_res[i].id == opts.id){
            _res = _res[i];
          }
        }
      }
      if(opts.collection){
        let temp:any = [];
        for(let i=0; i<_res.length; i++){
          if(_res[i].collection == opts.collection){
            temp.push(_res[i]);
          }
        }
        _res = temp;
      }
      return _res;
    })
  }

  get(url:string, opts?:Object) {
    return this.request(url, (<any>Object).assign({
      method: 'get'
    }, opts));
  }

  getContactsData() {
    return this.get(CONTACT_URL);
  }

  getContactById(id:number) {
    return this.get(CONTACT_URL, { id: id });
  }

  getCollections() {
    return this.get(CONTACT_URL, { collection: 1 });
  }

  addContact(obj:Object = {}) {
    //let body = JSON.stringify(obj);
    let body = obj;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const SERVER_URL = 'http://localhost:4000';
    //return this.http.post(CONTACT_URL, {body}, options).map(res => res.json());
    //return this.http.post(SERVER_URL, body, options).map(res => res.json()).catch(this.handleError);
    return this.http.post(SERVER_URL,body,options).map(res => res.json()).subscribe(
        (data) =>  {
          console.log('success');
          //this.myFunction(); //call any function
        },
        (error) => {
          console.log(error)
        });
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
