import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Activity } from '../../components/activity/activity';
import { Team } from '../../components/team/team';
//import { PROGRAMS } from './mock-programs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth-service/auth-service';
import { TeamService } from '../team-service/team-service';
/*
  Generated class for the ProgramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActivityService {
  public activityList : FirebaseListObservable <Activity[]>;
  public newActivity : Activity;
  public activeProgram : string;
  public teamList : FirebaseListObservable <Team[]>;

  constructor(private http: Http, private af: AngularFire) {

  }

  getActivities(programId) {
    this.activeProgram = programId;
    this.activityList = this.af.database.list('/activity/'+programId);
  }

  getActivitiesById(activityId) {
    console.log('/activity/'+this.activeProgram+'/'+activityId);
    return this.af.database.object('/activity/'+this.activeProgram+'/'+activityId);
  }

  addActivity(activity){
    var activityTeamList = {};
    this.teamList = this.af.database.list('/team/'+this.activeProgram);

    this.teamList.subscribe(teams=>{
     teams.forEach(team => {
       activityTeamList[team.$key] = {"name" : team.name};
     });
    });
    JSON.stringify(activityTeamList)

    this.activityList.push({
      name: activity.name,
      description: activity.description,
      team: activityTeamList
    }).then( newActivity => {
      this.newActivity = newActivity;
      this.teamList.subscribe(teams => {
        teams.forEach( team => {
          console.log('activity object url :' +`/team/${this.activeProgram}/${team.$key}/activity/${newActivity.getKey()}`);
          this.af.database.object(`/team/${this.activeProgram}/${team.$key}/activity/${newActivity.getKey()}`)
          .set({ name : activity.name});
        });
      }).unsubscribe();
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
      });
  }

  deleteActivity(key) {
    this.activityList.remove(key);
    this.teamList = this.af.database.list('/team/'+this.activeProgram);

    this.teamList.subscribe(teams => {
      teams.forEach( team => {
        console.log('activity object url :' +`/team/${this.activeProgram}/${team.$key}/activity/`);
        this.af.database.list(`/team/${this.activeProgram}/${team.$key}/activity/`)
        .remove(key);
      });
    }).unsubscribe();

  }
}
