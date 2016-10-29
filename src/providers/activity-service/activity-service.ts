import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Activity } from '../../components/activity/activity';
//import { PROGRAMS } from './mock-programs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth-service/auth-service';
/*
  Generated class for the ProgramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActivityService {
  public activityList : FirebaseListObservable <Activity[]>;
  public newActivity : Activity;

  constructor(private http: Http, private af: AngularFire) {
  }

  getActivities(programId) {
    this.activityList = this.af.database.list('/activity/'+programId);
  }

  addActivity(activity){
    this.activityList.push({
      name: activity.name,
      description: activity.description,
    }).then( newActivity => {
      this.newActivity = newActivity;
    }
      , error => {
        console.log(error);
        this.newActivity = null;
      });
  }

  editActivity(key : string, activity: Activity) {
    this.activityList.update(key, {
      name: activity.name,
      description: activity.description
    }).then( newActivity => {
      console.log(newActivity);
    }
      , error => {
        console.log(error);
      });;
  }

  deleteActivity(key) {
    this.activityList.remove(key);
  }
}
