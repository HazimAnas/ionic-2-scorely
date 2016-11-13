import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Activity} from './activity';
import {FirebaseObjectObservable} from 'angularfire2';
import { ActivityService } from '../../providers/activity-service/activity-service';

@Component({
  selector: 'activity-detail',
  templateUrl: 'activity-detail.html'
})
export class ActivityDetail {
  public activity: Activity;
  public activityObs: FirebaseObjectObservable<any>;

  constructor(private navCtrl: NavController, public param: NavParams, public activityService : ActivityService) {
    this.activity = new Activity;
    this.getActivity();
  }

  getActivity() {
    this.activityObs = this.activityService.getActivitiesById(this.param.get('activityId'));
    this.activityObs.subscribe(activity=>{
         this.activity.$key = activity.key;
         this.activity.name = activity.name;
         this.activity.description = activity.description;
         if(activity.team) {
           this.activity.team = Object.keys(activity.team).map(key => Object.assign({ key }, activity.team[key]))
         }
         else {
           this.activity.team = [];
         }
        });

    //this.activity.team = Object.keys(this.activity.team).map((key)=>{ return this.activity.team[key]});

    console.log(this.activity);
  }
}
