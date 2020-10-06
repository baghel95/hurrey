import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { LocationService } from '../services/location.service';
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss']
})
export class InstitutesComponent implements OnInit {
  public addinstitute: FormGroup
  public addform: boolean = false
  public latitude: any;
  public longitude: any;
  public instituteList: any[]
  constructor(private instituteServive: DataService, private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit() {
    this.get()
    this.addinstitute = this.fb.group({
      name: [''],
      address: this.fb.group({
        city: [''],
        district: [''],
        latlong: ['']
      })
    });
  }
  save() {
    console.log(this.addinstitute.value)
    const data = {
      name: this.addinstitute.controls['name'].value.toUpperCase(),
      address: {
        city: this.addinstitute.controls['address'].value.city.toUpperCase(),
        district: this.addinstitute.controls['address'].value.district,
        latlong: new firebase.firestore.GeoPoint(this.latitude, this.longitude)
      }
    }
    console.log(data);
    this.instituteServive.createInstitutes(data).then(res => {
      console.log(res);
      this.get()
      /*do something here....
      maybe clear the form or give a success message*/
    });
  }
  add() {
    this.addform = !this.addform
    this.locate()
  }
  get() {
    this.instituteServive.getInstitute().subscribe((data: any) => {
      console.log(data);
      this.instituteList = data;

    })
  }

  locate() {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }
}
