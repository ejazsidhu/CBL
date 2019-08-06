import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-merchandiser-attendance',
  templateUrl: './merchandiser-attendance.component.html',
  styleUrls: ['./merchandiser-attendance.component.scss']
})
export class MerchandiserAttendanceComponent implements OnInit {
  title = 'Merchandiser Attendance';

  @ViewChild('remarksModal') remarksModal: ModalDirective;
  loadingData: boolean;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  zones: any = [];

  regions: any = [];
  channels: any = [];

  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = [];
  startDate = new Date();
  endDate = new Date();
  loading: boolean;
  cities: any = [];
  selectedCity: any = {};
  distributionList: any = [];
  selectedDistribution: any = {};
  tabsData: any = [];
  storeType: any = ['Elite', 'Platinum', 'Gold', 'Silver', 'Others'];
  selectedStoreType = null;
  tableData: any = [];
  // areas: any = [];
  // selectedArea: any = {};
  sortOrder = true;
  sortBy: 'completed';

  constructor(private router: Router, private httpService: DashboardService, private toastr: ToastrService) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
  }

  ngOnInit() {
    this.sortIt('completed');
    this.getTabsData();
  }

  showRemarksModal() {
    this.remarksModal.show();
  }
  hideRemarksModal() {
    // removePlanedCall(item)
    this.remarksModal.hide();
  }
  getPercentage(n) {
    return Math.round(n) + ' %';
  }
  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }

  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? 'arrow_upward' : 'arrow_downward';
    } else {
      return '';
    }
  }
  getTabsData(data?: any, dateType?: string) {
    this.loadingData = true;
    let startDate = dateType === 'start' ? moment(data).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD');
    let endDate = dateType === 'end' ? moment(data).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD');
    // for merchandiser attendance only
    if (this.router.url === '/dashboard/merchandiser_attendance') {
      startDate = moment(this.startDate).format('YYYY-MM-DD');
      endDate = moment(this.startDate).format('YYYY-MM-DD');
    }

    this.loading = true;
    const obj: any = {
      zoneId: this.selectedZone.id ? this.selectedZone.id : -1,
      regionId: this.selectedRegion.id ? this.selectedRegion.id : -1,
      startDate: startDate,
      endDate: endDate,
      cityId: this.selectedCity.id || -1,
      distributionId: this.selectedDistribution.id || -1,
      storeType: this.selectedStoreType || null,
      channelId: -1
    };
    localStorage.setItem('obj', JSON.stringify(obj));
    this.getTableData(obj);

    this.httpService.getDashboardData(obj).subscribe(
      data => {
        // console.log(data, 'home data');
        this.loadingData = false;
        const res: any = data;
        if (res) {
          this.tabsData = data;
        }
        this.loading = false;
        // if (res.planned == 0)
        //   this.toastr.info('No data available for current selection', 'Summary')
      },
      error => {
        // this.clearLoading();

        console.log(error, 'home error');
      }
    );
  }

  getTableData(obj) {
    this.httpService.merchandiserShopListCBL(obj).subscribe(
      data => {
        console.log(data, 'table data');
        const res: any = data;

        if (res) {
          this.tableData = res;
        }
        this.loading = false;
        // if (res.planned == 0)
        //   this.toastr.info('No data available for current selection', 'Summary')
      },
      error => {
        // this.clearLoading();

        console.log(error, 'home error');
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    // this.regions = [];
    // this.channels = [];
    if (this.router.url === '/dashboard/productivity_report' || this.router.url === '/dashboard/merchandiser_attendance') {
      this.getTabsData();
    }

    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          // this.clearLoading();

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => {
        // this.clearLoading();
      }
    );
  }

  regionChange() {
    // this.selectedArea = {};
    this.selectedCity = {};
    this.selectedDistribution = {};

    this.getTabsData();
  }
}