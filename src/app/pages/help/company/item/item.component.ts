import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService, ModalService} from 'ng-zorro-antd-mobile';
import {HelpService} from '../../help.service';

@Component({
  selector: 'app-help-company-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class HelpCompanyItemComponent implements OnInit {
  id = this.route.snapshot.params.id;
  data;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastSvc: ToastService,
              private dialogSvc: ModalService,
              private helpSvc: HelpService) {
  }

  ngOnInit() {
    this.helpSvc.get(this.id).subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  delete() {
    this.toastSvc.loading('删除中...', 0);
    this.helpSvc.delete(this.id).subscribe(res => {
      if (res) {
        this.toastSvc.hide();
        this.dialogSvc.alert('', '删除成功！', [
          {
            text: '我知道了', onPress: () => {
              this.router.navigate(['/help/company/list']);
            }
          }
        ]);
      }
    });
  }
}
