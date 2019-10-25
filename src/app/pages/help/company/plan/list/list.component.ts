import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {HelpService} from '../../../help.service';

@Component({
  selector: 'app-help-company-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class HelpCompanyPlanListComponent implements OnInit {
  id = this.route.snapshot.params.id;
  type = this.route.snapshot.queryParams.type;
  page = 1;
  totalPages = 1;
  data;
  url: any;
  refreshState = {
    currentState: 'deactivate',
    drag: false
  };

  // pdf
  canvas: any;
  ctx;
  pdfDoc = null;
  pageRendering;
  pageNumPending = null;
  pageNum = 1;

  @ViewChild('scrollable', {static: false}) private container: any;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private sanitizer: DomSanitizer,
              private titleSvc: Title,
              private helpSvc: HelpService,
              @Inject('FILE_PREFIX_URL') private FILE_PREFIX_URL) {
    titleSvc.setTitle('培育方案选择');
  }

  ngOnInit() {
    this.helpSvc.plans(this.id, this.page).subscribe(res => {
      console.log(res);
      this.data = res.list;
      this.totalPages = res.totalPages;
    });
  }

  loadMore(event) {
    if (this.page < this.totalPages) {
      this.page++;
      this.refreshState.currentState = 'release';
      this.helpSvc.plans(this.page).subscribe(res => {
        console.log(res);
        this.data = this.data.concat(res.list);
        this.refreshState.currentState = 'finish';
      });
    }
  }

  back() {
    this.location.back();
  }
}
