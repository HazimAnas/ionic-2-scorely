import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Team } from '../../components/team/team';
import { TEAMS } from './mock-teams';
/*
  Generated class for the TeamService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TeamService {

  constructor(private http: Http) {}

  getTeams(): Promise<Team[]> {
  	return Promise.resolve(TEAMS);
  }
}
