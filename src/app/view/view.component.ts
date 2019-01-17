import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router, ActivatedRoute} from '@angular/router';

// declare variable
declare let L;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  sites: any;
  id: any;
  lat: any;
  long: any;
  constructor(private dataService: DataService, private  activateRoote: ActivatedRoute) {
    this.getSite();
  }
  getSite() {
    this.dataService.getSite()
      .then(data => {
        this.sites = data;
        console.log(this.sites);
      });
  }

  ngOnInit() {
    this.activateRoote.params.subscribe(params => {
      if (typeof params['id'] !== undefined) {
        this.id = params['id'];
        console.log(this.id);
      } else { this.id = ''; }
      if (typeof params['lat'] !== undefined) {
        this.lat = params['lat'];
        console.log(this.lat);
      } else { this.lat = ''; }
      if (typeof params['long'] !== undefined) {
        this.long = params['long'];
        console.log(this.long);
      } else { this.long = ''; }
    });

    const map = L.map('map').setView([this.lat, this.long], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    // add circle
    const circle = new L.Circle(new L.LatLng(this.lat, this.long), 26000, {
      color: '#ffc121',
      fillColor: 'red',
      fillOpacity: 0.15
    }).addTo(map);



    const myIcon = L.icon({
      iconUrl: 'http://iconshow.me/media/images/Application/Map-Markers-icons/png/48/MapMarker_Flag3_Right_Pink.png'
    });
    L.marker([this.lat, this.long], {icon: myIcon}).addTo(map);


    // ajouter un marqueur
    const marker = new L.Marker(new L.LatLng(this.lat, this.long));
    marker.addTo(map).bindPopup('<b>' + this.id + '</b><br />').openPopup();

    for (const site of this.sites) {
      const marker = new L.Marker(new L.LatLng(site.latitude, site.longitude));
      marker.addTo(map).bindPopup('<b>' + site.description + '</b><br />').openPopup();
    }

  }
}



