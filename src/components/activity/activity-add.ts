import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Activity } from './activity';
import { ActivityService } from '../../providers/activity-service/activity-service';

@Component({
  selector: 'activity-add',
  templateUrl: 'activity-add.html'
})
export class ActivityAdd {
  public newActivity: Activity;

  constructor(private navCtrl: NavController, public activityService: ActivityService) {
    this.newActivity = new Activity;
  }

  submitAddForm() {
    this.activityService.addActivity(this.newActivity);
  }

  logForm(form) {
    console.log(form.value)
  }
}
