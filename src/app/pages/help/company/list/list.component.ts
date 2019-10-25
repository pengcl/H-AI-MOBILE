import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {StorageService} from '../../../../@core/utils/storage.service';
import {HelpService} from '../../help.service';
import {ToastService, ModalService, PickerService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-help-company-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class HelpCompanyListComponent implements OnInit {
  page = 1;
  totalPages = 1;
  data;
  refreshState = {
    currentState: 'deactivate',
    drag: false
  };
  index = 0;
  config = {
    grabCursor: true,
    slidesPerView: 'auto',
    pagination: false,
    autoplay: false
  };
  limitData = [
    {label: '不限', value: ''},
    {label: '0-1年', value: '0-1年'},
    {label: '1-2年', value: '1-2年'},
    {label: '2-3年', value: '2-3年'},
    {label: '3年以上', value: '3年以上'}
  ];
  comprehendData = [
    {label: '不限', value: ''},
    {label: '完全不了解', value: '完全不了解'},
    {label: '不了解', value: '听说过，但不了解'},
    {label: '了解但不具备', value: '了解，知道商标、专利和版权'},
    {label: '了解且具备', value: '了解，公司已具备相关知识产权'},
    {label: '非常了解', value: '非常了解，并希望通过知识产权增值'}
  ];
  employeesData = [
    {label: '不限', value: ''},
    {label: '50人以下', value: '50人以下'},
    {label: '100人', value: '51-100人'},
    {label: '200人', value: '101-200人'},
    {label: '500人', value: '201-500人'},
    {label: '2000人', value: '501-2000人'},
    {label: '2000人以上', value: '2000人以上'}
  ];
  revenueData = [
    {label: '不限', value: ''},
    {label: '200万', value: '0-200万'},
    {label: '500万', value: '201-500万'},
    {label: '1000万', value: '501-1000万'},
    {label: '5000万', value: '1001-5000'},
    {label: '1亿', value: '5001-1亿'},
    {label: '5亿', value: '1-5亿'},
    {label: '5亿以上', value: '5亿以上'}
  ];

  params = {
    company: '',
    ageLimit: '',
    employees: '',
    revenue: '',
    comprehend: ''
  };

  constructor(private router: Router,
              private titleSvc: Title,
              private storageSvc: StorageService,
              private pickerSvc: PickerService,
              private helpSvc: HelpService) {
    titleSvc.setTitle('签单助手');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.helpSvc.list(this.page, this.params).subscribe(res => {
      this.data = res.list;
      this.totalPages = res.totalPages;
    });
  }

  showPicker(target, optionData) {
    this.pickerSvc.showPicker({data: optionData}, res => {
      console.log(res);
      this.page = 1;
      this.params[target] = res[0].value;
      this.getData();
    });
  }

  change(e) {
    this.page = 1;
    this.params.company = e;
    this.helpSvc.list(this.page, this.params).subscribe(res => {
      this.data = res.list;
      this.totalPages = res.totalPages;
    });
  }

  add() {
    this.storageSvc.remove('companyForm');
    this.router.navigate(['/help/company/edit/step0', 0]);
  }

  loadMore(event) {
    if (this.page < this.totalPages) {
      this.page++;
      this.refreshState.currentState = 'release';
      this.helpSvc.list(this.page, this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        this.refreshState.currentState = 'finish';
      });
    }
  }
}
