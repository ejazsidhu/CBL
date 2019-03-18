import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardDataService } from '../../dashboard-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  @Input() title;
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  channels: any = [];
 
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = {};
  startDate = new Date();
  endDate = new Date();
  areas: any = [];
  selectedArea: any = {};
  lastVisit: any = [];
  selectedLastVisit = 0;
  mustHave: any=[]
  selectedMustHave = false;
  merchandiserList: any = [];
  selectedMerchandiser: any = {};
  clickedOnce = 1;
  categoryList: any = [];
  selectedCategory: any = {}
  cities: any = [];
  selectedCity: any = {};
  productsList: any = [];
  selectedProduct: any = {}

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService
  ) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
    this.categoryList = JSON.parse(localStorage.getItem('assetList'));
    this.channels = JSON.parse(localStorage.getItem('channelList'));

    console.log(this.categoryList)
  }

  ngOnInit() {
    console.log('router', this.router.url);
    this.lastVisit = this.dataService.getLastVisit();
    this.mustHave = this.dataService.getYesNo();
    this.httpService.getZone();
  }

  zoneChange() {
    this.loadingData = true;
    // this.regions = [];
    // this.channels = [];

    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {


        let res: any = data;
        this.regions = res;
        setTimeout(() => {
          this.loadingData = false;

        }, 500);
      },
      error => { }
    );
  }

  regionChange() {
    this.loadingData = true;

    console.log('regions id', this.selectedRegion);
    this.httpService.getCities(this.selectedRegion.id).subscribe(
      data => {

        // this.channels = data[0];
        let res: any = data
        this.areas = res.areaList;
        this.cities = res.cityList;

        setTimeout(() => {
          this.loadingData = false;

        }, 500);
      },
      error => { }
    );
  }


  categoryChange() {
    this.loadingData = true;
    debugger
    this.httpService.getProducts(this.selectedCategory).subscribe(
      data => {
        this.productsList = data;
        setTimeout(() => {
          this.loadingData = false;

        }, 500);
      },
      error => { }
    );
  }

  cityChange() {
    // this.httpService.getAreas(this.selectedChannel).subscribe(
    //   data => {
    //     this.areas = data;
    //     // this.filterAllData();
    //   },
    //   error => { }
    // );
  }

  chanelChange() {
    // console.log('seelcted chanel', this.selectedChannel);
    // this.httpService.getAreas(this.selectedChannel).subscribe(
    //   data => {
    //     this.areas = data;
    //     // this.filterAllData();
    //   },
    //   error => { }
    // );
  }

  getReport() {
    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      channelId: this.selectedChannel.id || -1,
      areaId: '',
      distId: '',
      actionType: '1',
      pageType: '8'
    };
    let url = 'oosDetail';

    this.httpService.DownloadResource(obj, url);
  }

  getMerchandiserList(event) {
    console.log(event);
    this.clickedOnce = 1;
    this.startDate = event;
    this.merchandiserList = [];
    if (!this.selectedZone.id || !this.selectedRegion.id) {
      // console.log(this.selectedZone.id,this.selectedRegion.id)
      this.toastr.info('Please select zone and region to proceed', 'PDF Download');
    } else {
      let obj = {
        zoneId: this.selectedZone.id,
        regionId: this.selectedRegion.id,
        startDate: moment(this.startDate).format('YYYY-MM-DD')
      };
      this.httpService.getMerchandiserList(obj).subscribe(
        data => {
          console.log('merchandiser', data);
          let res: any = data;
          if (!res) {
            this.toastr.warning('NO record found', 'Merchandiser List');
            this.merchandiserList = [];
          } else if (res.length == 0) {
            this.toastr.info('NO record found,Please try again', 'Merchandiser List');
          } else {
            this.merchandiserList = res;
          }
        },
        error => {
          error.status === 0
            ? this.toastr.error('Please check Internet Connection', 'Error')
            : this.toastr.error(error.description, 'Error');
        }
      );
    }
  }

  downloadDailyReport() {
    this.clickedOnce++;

    let obj = {
      zoneId: this.selectedZone.id,
      regionId: this.selectedRegion.id,
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      reportType: '',
      surveyorId: this.selectedMerchandiser.id,
      excelDump: 'Y',
      mailData: 'Y',
      reportLink: ''
    };
    let url = 'cbl-pdf';
    // this.httpService.downloadMerchandiserPDF(obj).subscribe(d => { }, error => {

    // });

    this.httpService.DownloadResource(obj, url);
  }

  getOOSShopListReport() {
    debugger
    let obj = {
      zoneId: this.selectedZone.id,
      regionId: this.selectedRegion.id,
      cityId: this.selectedCity.id,
      areaId: this.selectedArea.id,
      channelId:this.selectedChannel.id,
      startDate:moment(this.startDate).format('YYYY-MM-DD'),
      endDate:moment(this.endDate).format('YYYY-MM-DD'),
      category:this.selectedCategory.id,
      lastVisit:-1,
      productId:1,
      mustHave:this.selectedMustHave
    }

    let url='shopwise-ost-report';
    this.httpService.DownloadResource(obj,url);
  }
}
