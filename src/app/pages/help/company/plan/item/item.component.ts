import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {HelpService} from '../../../help.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-help-company-plan-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class HelpCompanyPlanItemComponent implements OnInit {
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
    this.helpSvc.plan(this.id).subscribe(res => {
      const url = this.FILE_PREFIX_URL + res.planFileId;

      // Loaded via <script> tag, create shortcut to access PDF.js exports.
      const pdfjsLib = window['pdfjs-dist/build/pdf'];

      // The workerSrc property shall be specified.
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.bootcss.com/pdf.js/2.0.466/pdf.worker.min.js';

      // Asynchronous download of PDF
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then((pdf) => {
        this.pdfDoc = pdf;
        this.titleSvc.setTitle(this.pageNum + '/' + this.pdfDoc.numPages);
        // Fetch the first page
        this.canvas = document.getElementById('the-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.renderPage(this.pageNum);
      });
    });
  }

  renderPage(num) {
    this.pageRendering = true;
    // Using promise to fetch the page
    this.pdfDoc.getPage(num).then((page) => {
      if (!page) {
        return false;
      }
      const viewport = page.getViewport(2.0);
      this.canvas.height = viewport.height;
      this.canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: this.ctx,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(() => {
        this.pageRendering = false;
        if (this.pageNumPending !== null) {
          // New page rendering is pending
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
        this.titleSvc.setTitle(this.pageNum + '/' + this.pdfDoc.numPages);
      });
    });

    // Update page counters
  }

  queueRenderPage(num) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  onPrevPage() {
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }

  onNextPage() {
    if (this.pageNum >= this.pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }

  back() {
    this.location.back();
  }
}
