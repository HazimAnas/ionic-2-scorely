import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Team } from '../../components/team/team';
import { Activity } from '../../components/activity/activity';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth-service/auth-service';
import { ActivityService } from '../activity-service/activity-service';
/*
  Generated class for the TeamService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TeamService {

  public teamList : FirebaseListObservable <Team[]>;
  public newTeam : Team;
  public activeProgram : string;
  public activityList : FirebaseListObservable <Activity[]>;

  constructor(private http: Http, private af: AngularFire) {}

  getTeams(programId) {
    this.activeProgram = programId;
    this.teamList = this.af.database.list('/team/'+programId);
  }

  getTeamsById(teamId) {
    return this.af.database.object('/team/'+this.activeProgram+'/'+teamId);
  }

  addTeam(team){
    var teamActivityList = {};
    this.activityList = this.af.database.list('/activity/'+this.activeProgram);

    this.activityList.subscribe(activities=>{
     activities.forEach(activity => {
       teamActivityList[activity.$key] = {"name" : activity.name};
     });
    });
    JSON.stringify(teamActivityList)

    this.teamList.push({
      name: team.name,
      description: team.description,
      activity: teamActivityList
    }).then( newTeam => {
      this.newTeam = newTeam;
      this.activityList.subscribe(activities => {
        activities.forEach( activity => {
          console.log('team object url :' +`/activity/${this.activeProgram}/${activity.$key}/team/${newTeam.getKey()}`);
          this.af.database.object(`/activity/${this.activeProgram}/${activity.$key}/team/${newTeam.getKey()}`)
          .set({ name : team.name});
        });
      }).unsubscribe();
    }
      , error => {
        console.log(error);
        this.newTeam = null;
      });
  }

  editTeam(key : string, team: Team) {
    this.teamList.update(key, {
      name: team.name,
    }).then( newTeam => {
      console.log(newTeam);
    }
      , error => {
        console.log(error);
      });
  }

  deleteTeam(key) {
    this.teamList.remove(key);
    this.activityList = this.af.database.list('/activity/'+this.activeProgram);

    this.activityList.subscribe(activities => {
      activities.forEach( activity => {
        this.af.database.list(`/activity/${this.activeProgram}/${activity.$key}/team/`)
        .remove(key);
      });
    }).unsubscribe();

  }
}
