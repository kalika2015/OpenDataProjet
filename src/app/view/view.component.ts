import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

// declare variable
declare let L;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  regions: any;
  sites: any;
  id: any;
  constructor(private dataService: DataService) {
    this.getRegion();
    this.getSite();
  }
  getRegion() {
    this.dataService.getRegion()
      .then(data => {
        this.regions = data;
        console.log(this.regions);
      });
  }

  ngOnInit() {

  }

  carte(lat, long) {
    const map = L.map('map').setView([14.73, -17.33], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    // add circle
    const circle = new L.Circle(new L.LatLng(lat, long), 23000, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.15
    }).addTo(map);
  }

  getSite() {
    this.dataService.getSite()
      .then(data => {
        this.sites = data;
        console.log(this.sites);
      });
  }
}



