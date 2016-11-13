import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Program } from './program';
import { ProgramService } from '../../providers/program-service/program-service';

@Component({
  selector: 'program-add',
  templateUrl: 'program-add.html'
})
export class ProgramAdd {
  public newProgram: Program;

  constructor(private navCtrl: NavController, public programService: ProgramService) {
    this.newProgram = new Program;
  }

  submitAddForm() {
    if(this.programService.addProgram(this.newProgram)) {
      this.navCtrl.pop();
    }
  }

  logForm(form) {
    console.log(form.value)
  }
}
