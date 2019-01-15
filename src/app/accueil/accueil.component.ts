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

}
