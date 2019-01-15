import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://alious.promo-21.codeur.online/senegal-patrimoine/public/api/';
  constructor(public http: HttpClient) {

  }
  getRegion() {
    const url = `${this.baseUrl}regions.json`;
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
}
