import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Program } from '../../components/program/program';
import { PROGRAMS } from './mock-programs';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the ProgramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProgramService {
  public db: any;
  public programs: FirebaseObjectObservable<Program[]>;

  constructor(private http: Http, public af: AngularFire) {
    //this.db = firebase.database().ref('/program/');
  }

  getPrograms() {
    this.programs = this.af.database.object('/program');
    console.log("service " + this.programs);
  }
}
