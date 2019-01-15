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
  sites: any;
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

  getSite() {
    this.dataService.getSite()
      .then(data => {
        this.sites = data;
        console.log(this.sites);
      });
  }

  ngOnInit() {
  }

  carte(lat, long, nom) {
    const map = L.map('map').setView([14.497401, -14.452362], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);
    // add circle
    const circle = new L.Circle(new L.LatLng(lat, long), 23000, {
      color: '#ffc121',
      fillColor: '#f03',
      fillOpacity: 0.2
    }).addTo(map);

      // ajouter un marqueur
      const marker = new L.Marker(new L.LatLng(lat, long));
      marker.addTo(map).bindPopup(nom).openPopup();
  }

  marker(lat, long) {
    const map = L.map('map').setView([14.497401, -14.452362], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    // ajouter un marqueur
    const marker = new L.Marker(new L.LatLng(lat, long));
    marker.addTo(map).bindPopup('<b>Les mamelles</b><br />').openPopup();
  }

}
