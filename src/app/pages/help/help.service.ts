import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess, formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class HelpService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  get(id?): Observable<any> {
    const url = id ? this.PREFIX_URL + 'getAssCust' + '&id=' + id : this.PREFIX_URL + 'getAssCustList';
    return this.http.get(url).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  research(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'addAssCust', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  update(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'updateAssCust', formData(body)).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  delete(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'delAssCust', formData({id: id})).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  log(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getAssCustLogList' + '&id=' + id).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  protected processResult(res): Observable<any> {
    return resultProcess(res);
  }
}
