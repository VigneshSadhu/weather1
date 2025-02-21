import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputcomponentComponent} from './components/inputcomponent/inputcomponent.component'; // Import the component
import { Feature2Component } from './components/feature2/feature2.component';
const routes: Routes = [
  { path: 'feature1', component: InputcomponentComponent }, // Route for Weather
  { path: 'feature2', component: Feature2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
