import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {PickerService, ToastService, ModalService} from 'ng-zorro-antd-mobile';
import {StorageService} from '../../../../../@core/utils/storage.service';
import {HelpService} from '../../../help.service';

@Component({
  selector: 'app-help-company-edit-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})

export class HelpCompanyEditStep2Component implements OnInit {
  id = this.route.snapshot.params.id;
  step = 2;
  formValue = JSON.parse(this.storageSvc.get('companyForm'));
  data = ['请选择', '完全不了解', '听说过，但不了解', '了解，知道商标、专利和版权', '了解，公司已具备相关知识产权', '非常了解，并希望通过知识产权增值'];
  form: FormGroup = new FormGroup({
    company: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    employees: new FormControl('', []),
    revenue2016: new FormControl('', []),
    revenue2017: new FormControl('', []),
    revenue2018: new FormControl('', []),
    comprehend: new FormControl('', []),
    remark: new FormControl('', [])
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleSvc: Title,
              private storageSvc: StorageService,
              private toastSvc: ToastService,
              private dialogSvc: ModalService,
              private pickerSvc: PickerService,
              private helpSvc: HelpService) {
    titleSvc.setTitle('企业信息录入');
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(res => {
      this.storageSvc.set('companyForm', JSON.stringify(this.form.value));
    });

    if (this.formValue) {
      for (const key in this.formValue) {
        if (this.formValue[key]) {
          this.form.get(key).setValue(this.formValue[key]);
        }
      }
    }
  }

  showPicker(target, optionData) {
    this.pickerSvc.showPicker({data: optionData}, res => {
      this.form.get(target).setValue(res[0] === '请选择' ? '' : res[0]);
    });
  }

  prev() {
    this.router.navigate(['/help/company/edit/step1', this.id]);
  }

  next() {
    if (this.form.invalid) {
      return false;
    }
    this.toastSvc.loading('提交中...', 0);
    this.helpSvc.research(this.form.value).subscribe(res => {
      this.toastSvc.hide();
      if (res) {
        this.storageSvc.remove('companyForm');
        this.dialogSvc.alert('', '您已成功提交！', [
          {
            text: '我知道了', onPress: () => {
              this.router.navigate(['/help/company/plan/list', res.id], {queryParams: {type: 'add'}});
            }
          }
        ]);
      }
    });
  }
}
