import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchesComponent } from './batches/batches.component';
import { InstitutesComponent } from './institutes/institutes.component';


const routes: Routes = [

  { path: '', redirectTo: 'institutes', pathMatch: 'full' },
  {
    path: 'institutes',
    component: InstitutesComponent
  },
  { path: 'batches', component: BatchesComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
