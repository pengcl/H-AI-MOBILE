import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpService} from '../../help.service';

@Component({
  selector: 'app-help-company-list',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class HelpCompanyLogComponent implements OnInit {
  id = this.route.snapshot.params.id;
  page = 0;
  data;
  refreshState = {
    currentState: 'deactivate',
    drag: false
  };

  constructor(private route: ActivatedRoute,
              private helpSvc: HelpService) {
  }

  ngOnInit() {
    this.helpSvc.log(this.id).subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  loadMore(event) {
    if (event === 'endReachedRefresh') {
      if (this.page < 9) {
        this.page++;
        this.addItems(this.page * 15);
        this.refreshState.currentState = 'release';
        setTimeout(() => {
          this.refreshState.currentState = 'finish';
        }, 1000);
      }
    } else {
      if (event === 'down') {
        this.data = [];
        this.page = 0;
        this.addItems(0);
      } else {
        if (this.page < 9) {
          this.page++;
          this.addItems(this.page * 15);
        }
      }
    }
  }

  addItems(startIndex) {
    for (let i = startIndex; i < 15 * (this.page + 1); i++) {
      this.data.push(i);
    }
  }
}
