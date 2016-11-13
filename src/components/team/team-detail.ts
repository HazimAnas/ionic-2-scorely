import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {Team} from './team';
import {FirebaseObjectObservable} from 'angularfire2';
import { TeamService } from '../../providers/team-service/team-service';
import { PointEdit } from '../point/point-edit';

@Component({
  selector: 'team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetail {

  public team: Team
  public teamObs : FirebaseObjectObservable<Team>;

  constructor(private navCtrl: NavController, public param: NavParams, public teamservice: TeamService) {
    this.team = new Team;
    this.getTeam();
  }

  getTeam() {

    this.teamObs = this.teamservice.getTeamsById(this.param.get('teamId'));
    this.teamObs.subscribe(team=>{
         this.team.$key = team.$key;
         this.team.name = team.name;
         this.team.description = team.description;
         if(team.activity) {
           this.team.activity = Object.keys(team.activity).map(key => Object.assign({ key }, team.activity[key]))
         }
         else {
           this.team.activity = [];
         }
         console.log("team values " + team);
       });



    console.log(this.team);
  }

  editPoint(name, activityId, teamId) {
    this.navCtrl.push(PointEdit, {
      name : name,
      programId : this.teamservice.activeProgram,
      activityId : activityId,
      teamId : teamId,
    })
  }
}
