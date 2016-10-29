import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Program } from '../../components/program/program';
//import { PROGRAMS } from './mock-programs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth-service/auth-service';
/*
  Generated class for the ProgramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProgramService {
  public programs: FirebaseObjectObservable<Program[]>;
  public programsList :FirebaseListObservable <Program[]>;
  public newProgram : Program;
  private userID;

  constructor(private http: Http, private af: AngularFire,public as : AuthService) {
    this.programs = af.database.object('/program/'+this.userID);
    this.userID = as.getUser().uid;
  }

  getPrograms() {
    this.programsList = this.af.database.list('/program/'+this.userID);
  }

  addProgram(program){
    this.programsList.push({
      name: program.name,
      description: program.description,
    }).then( newProgram => {
      this.newProgram = newProgram;
    }
      , error => {
        console.log(error);
        this.newProgram = null;
      });
  }

  editProgram(key : string, program: Program) {
    this.programsList.update(key, {
      name: program.name,
      description: program.description
    }).then( newProgram => {
      console.log(newProgram);
    }
      , error => {
        console.log(error);
      });;
  }

  deleteProgram(key) {
    this.programsList.remove(key);
  }
}
