import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

// declare variable
declare let L;


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  regions: any;
  constructor(private dataService: DataService) {
    this.getRegion();
  }
  getRegion() {
    this.dataService.getRegion()
      .then(data => {
        this.regions = data;
        console.log(this.regions);
      });
  }
  ngOnInit() {}
  onSelect() {

  }
}
