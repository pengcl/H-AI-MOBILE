import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess, formData} from '../../utils/utils';
import {Validators} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class HelpService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(page, params): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getAssCustList' + '&page=' + page, formData(params))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  get(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getAssCust' + '&id=' + id).pipe(observableMargeMap((res: any) => {
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

  plan(id, page?): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getPlanList' + '&id=' + id + '&page=' + (page ? page : '1'))
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  delete(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'delAssCust', formData({id: id})).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  validatorName(company): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'findByCompName', formData({company: company})).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  log(id, page): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getAssCustLogList' + '&id=' + id + '&page=' + page).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  protected processResult(res): Observable<any> {
    return resultProcess(res);
  }
}
