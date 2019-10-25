import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastService, ModalService} from 'ng-zorro-antd-mobile';
import {HelpService} from '../../help.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-help-company-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class HelpCompanyItemComponent implements OnInit {
  id;
  data;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleSvc: Title,
              private toastSvc: ToastService,
              private dialogSvc: ModalService,
              private helpSvc: HelpService) {
    titleSvc.setTitle('企业详情');
  }

  ngOnInit() {
    this.route.paramMap.pipe(map(params => this.id = params.get('id'))).subscribe(id => {
      this.helpSvc.get(this.id).subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
    });
  }

  onCall(mobile) {
    window.location.href = 'tel:' + mobile;
  }

  delete() {
    this.dialogSvc.alert('提醒', '是否确认删除【' + this.data.company + '】企业信息？', [
      {
        text: '取消'
      },
      {
        text: '确认删除', onPress: () => {
          this.toastSvc.loading('删除中...', 0);
          this.helpSvc.delete(this.id).subscribe(res => {
            this.toastSvc.hide();
            this.router.navigate(['/help/company/list']);
            /*this.dialogSvc.alert('', '删除成功！', [
              {
                text: '我知道了', onPress: () => {
                  this.router.navigate(['/help/company/list']);
                }
              }
            ]);*/
          });
        }
      }
    ]);
  }
}
