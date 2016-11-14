import {Component, Input} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { Program } from './program';
import { ProgramService } from '../../providers/program-service/program-service';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'program-sharing',
  templateUrl: 'program-sharing.html'
})
export class ProgramSharing {
  @Input() program: Program;
  public email: string;
  public user: {};

  constructor(private navCtrl: NavController, param: NavParams, private programService: ProgramService,
     private af: AngularFire, private alertCtrl : AlertController) {
  	this.program = param.get('program');
  }

  logForm(form) {
    console.log(form.value)
  }

  submitEditForm(key, program: Program) {
    if(this.programService.editProgram(key, program)) {
      this.navCtrl.pop();
    }
  }

  searchEmail(email) {
    email = this.encodeAsFirebaseKey(email);
    console.log(`Searched email : ${email}`);
    const user = this.af.database.object(`/user/${email}`);
    user.subscribe(result => {
      if(result == null) {
        let alert = this.alertCtrl.create({
                                            title: 'User Not Found',
                                            subTitle: 'No user with that email is found.',
                                            buttons: ['OK']
                                          });
        alert.present();
      }
      else {
        this.user = result;
      }
    })
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

}
