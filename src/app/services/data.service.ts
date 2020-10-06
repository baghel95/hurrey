import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }
  createInstitutes(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Institutes")
        .add(data)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });


  }
  getInstitute() {
    return this.firestore.collection("Institutes").valueChanges()
  }
  createBatches(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Batches")
        .add(data)
        .then(res => { resolve(res) }, err => reject(err));
    });
  }
  getBatches() {
    return this.firestore.collection("Batches").valueChanges()
  }

  updateCoffeeOrder(data) {
    return this.firestore
      .collection("Batches")
      .doc(data.payload.doc.id)
      .set(data);
  }

}
