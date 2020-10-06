import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  public addBatches: FormGroup
  public addform: boolean = false
  public batchesList: any[]
  public instituteList: any[]
  editData: boolean
  addData: boolean
  constructor(private batchServive: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.get()
    this.getIns()
    this.addBatches = this.fb.group({
      institute: [],
      name: [],
      subject: [],
      fee: [],
      class: [],
      board: [],
      batch_start_time: [],
      batch_end_time: []
    });
  }
  save() {
    console.log(this.addBatches.value)
    const data = {
      institute: this.addBatches.controls['institute'].value,
      name: this.addBatches.controls['name'].value,
      subject: this.addBatches.controls['subject'].value,
      fee: this.addBatches.controls['fee'].value,
      class: this.addBatches.controls['class'].value,
      board: this.addBatches.controls['board'].value,
      batch_start_time: this.addBatches.controls['batch_start_time'].value,
      batch_end_time: this.addBatches.controls['batch_end_time'].value
    }
    console.log(data);
    this.batchServive.createBatches(data).then(res => {
      console.log(res);
      this.get()
      /*do something here....
      maybe clear the form or give a success message*/
    });
  }
  add() {
    this.editData = false
    this.addData = true
    this.addform = !this.addform

  }
  get() {
    this.batchServive.getBatches().subscribe((data: any) => {
      console.log(data);
      this.batchesList = data;

    })
  }
  getIns() {
    this.batchServive.getInstitute().subscribe((data: any) => {
      console.log(data);
      this.instituteList = data
    })
  }

  edit(data) {
    this.addform = true
    this.editData = true
    this.addData = false
    this.addBatches.controls['institute'].patchValue(data.institute),
      this.addBatches.controls['name'].patchValue(data.name),
      this.addBatches.controls['subject'].patchValue(data.subject),
      this.addBatches.controls['fee'].patchValue(data.fee),
      this.addBatches.controls['class'].patchValue(data.class),
      this.addBatches.controls['board'].patchValue(data.board),
      this.addBatches.controls['batch_start_time'].patchValue(data.batch_start_time),
      this.addBatches.controls['batch_end_time'].patchValue(data.batch_end_time)
    // this.batchServive.updateCoffeeOrder(data);
  }
  update() {

    const data = {
      institute: this.addBatches.controls['institute'].value,
      name: this.addBatches.controls['name'].value.toUpperCase(),
      subject: this.addBatches.controls['subject'].value.toUpperCase(),
      fee: this.addBatches.controls['fee'].value,
      class: this.addBatches.controls['class'].value.toUpperCase(),
      board: this.addBatches.controls['board'].value.toUpperCase(),
      batch_start_time: this.addBatches.controls['batch_start_time'].value,
      batch_end_time: this.addBatches.controls['batch_end_time'].value
    }
    this.batchServive.updateCoffeeOrder(data);
  }

}
