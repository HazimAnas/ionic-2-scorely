import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {Team} from './team';
import {FirebaseObjectObservable} from 'angularfire2';
import { TeamService } from '../../providers/team-service/team-service';

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
         this.team.name = team.name,
         this.team.activity = team.activity
        });

    this.team.activity = Object.keys(this.team.activity).map((key)=>{ return this.team.activity[key]});

    console.log(this.team);
  }
}
