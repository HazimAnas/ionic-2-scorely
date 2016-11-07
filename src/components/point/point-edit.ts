import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { PointService } from '../../providers/point-service/point-service';

@Component({
  selector: 'point-edit',
  templateUrl: 'point-edit.html'
})
export class PointEdit {
  @Input() amount: number;
  public name : string;

  constructor(private navCtrl: NavController, public pointService: PointService, private param : NavParams) {

  }

  submitAddForm() {
    this.pointService.updatePoint(this.param.get('programId'), this.param.get('activityId'), this.param.get('teamId'), this.amount);
  }

  logForm(form) {
    console.log(form.value)
  }
}
