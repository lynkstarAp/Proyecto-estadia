import { Component } from '@angular/core';
import {InfoService} from "../../../services/info.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(public  info: InfoService) {
  }

  remove(){
    this.info.removeInfo();
  }
}


