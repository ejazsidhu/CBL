import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { MatCardModule } from '@angular/material';
import { MatGridListModule, MatIconModule } from '@angular/material';
import { SharepopupComponent } from '../../sharepopup/sharepopup.component';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
    imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule,ModalModule.forRoot(),],
    declarations: [StatComponent,SharepopupComponent],
    exports: [StatComponent,SharepopupComponent]
})
export class StatModule {}
