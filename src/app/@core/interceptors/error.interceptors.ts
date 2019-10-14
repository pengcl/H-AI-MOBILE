import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {ModalService} from 'ng-zorro-antd-mobile';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private status = false;

  constructor(private router: Router, private dialogSvc: ModalService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res),
      err => this.handleResponse(err)
    ));
  }

  private handleResponse(res: any): void {
    if (res.body) {
      if (res.body.code !== '0000') {
        if (!this.status) {
          this.status = true;
          if (res.body.code === '1001') {
            // this.authSvc.requestAuth();
          } else {
            this.dialogSvc.alert('', res.body.msg, [{text: '我知道了'}]);
          }
        }
      }
    }
  }
}
