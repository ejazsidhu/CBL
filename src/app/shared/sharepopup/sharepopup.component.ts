import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'share-popup',
  templateUrl: './sharepopup.component.html',
  styleUrls: ['./sharepopup.component.scss']
})
export class SharepopupComponent  {

  @ViewChild('childModal') childModal: ModalDirective;
 
  showChildModal(): void {
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }

}
