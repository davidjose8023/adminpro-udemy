import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/service/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public menu : any = [];

  constructor(public _serviceSidebar: SidebarService) { }

  ngOnInit() {
    this.menu = this._serviceSidebar.menu;
    //console.log("this.menu");
    //console.log(this.menu);
  }

}
