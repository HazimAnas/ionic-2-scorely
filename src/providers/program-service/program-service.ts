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
  public program: FirebaseObjectObservable<Program>;
  public programs: FirebaseObjectObservable<Program[]>;
  public programsList : FirebaseListObservable<Program[]>;
  public sharedProgramsList: any;
  public newProgram : Program;
  private userID;

  constructor(private http: Http, private af: AngularFire,public as : AuthService) {
    this.programs = af.database.object(`/program/${this.userID}`);
    this.userID = as.getUser().uid;
  }

  getProgramById(programId, userID) {
    if(userID){
      return this.af.database.object(`/program/${userID}/${programId}`);
    }
    else {
      return this.af.database.object(`/program/${this.userID}/${programId}`);
    }
  }

  getPrograms() {
    this.programsList = this.af.database.list(`/program/${this.userID}`);
  }

  getSharedPrograms() {
    var sharedList: FirebaseListObservable <any>;
    var programRef: FirebaseObjectObservable <Program>;
    this.sharedProgramsList = [];

    sharedList= this.af.database.list(`/shareList/${this.userID}`);

    sharedList.subscribe(programs => {

      programs.forEach((program) => {

        programRef = this.af.database.object(`/program/${program.uid}/${program.$key}`);
        console.log(`shared program url /program/${program.uid}/${program.$key}`);
        programRef.subscribe(programOb => {
          this.sharedProgramsList[programOb.$key] = {'$key': programOb.$key, 'name': programOb.name, 'description': programOb.description, 'sharedBy': program.sharedBy, 'uid' : program.uid};
          console.log(this.sharedProgramsList);
        });
      });
    });
  }

  addProgram(program): boolean {
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
      return true;
  }

  editProgram(key : string, program: Program): boolean {
    this.programsList.update(key, {
      name: program.name,
      description: program.description
    }).then( newProgram => {
      console.log(newProgram);
    }
      , error => {
        console.log(error);
      });
      return true;
  }

  deleteProgram(key) {
    this.programsList.remove(key);
  }

  shareProgram(user, userEmailKey, program) {
    var userEmail = this.as.getUser().google.email;
    this.af.database.object(`/program/${this.userID}/${program.$key}/sharedWith/${user.uid}`)
    .set({
      name : user.name,
      email : user.email
    }).catch(error => {
      console.log(error);
    });

    this.af.database.object(`/shareList/${user.uid}/${program.$key}`)
    .set({
      name : program.name,
      description : program.description,
      sharedBy : userEmail,
      uid : this.userID
    }).catch(error => {
      console.log(error);
    });

   /*
    let update = {};
     update[`/program/${this.userID}/${program.$key}/sharedWith/${user.uid}`] = {
       name : user.name,
       email : user.email
     };

     update[`/shareList/${user.uid}/${program.$key}`] = {
       name : program.name,
       sharedBy: this.as.getUser().email
     };

     this.af.database.object('').update(update).catch(error => {
       console.log(error);
     });
*/
   console.log(`shared user url /shareList/${user.uid}/${program.$key}`);

  }

  encodeAsFirebaseKey(string) {
    return string.replace(/\./g, '%2E')
      .replace(/\%/g, '%25')
      .replace(/\#/g, '%23')
      .replace(/\$/g, '%24')
      .replace(/\//g, '%2F')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

}
