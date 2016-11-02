import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Activity } from './activity';
import { ActivityService } from '../../providers/activity-service/activity-service';

@Component({
  selector: 'activity-edit',
  templateUrl: 'activity-edit.html'
})
export class ActivityEdit {
  @Input() activity: Activity;

  constructor(private navCtrl: NavController, param: NavParams, public activityService: ActivityService) {
  	this.activity = param.get('activity');
    console.log(this.activity);
  }

  logForm(form) {
    console.log(form.value)
  }

  submitEditForm(key, activity: Activity) {
    this.activityService.editActivity(key, activity);
  }
}
