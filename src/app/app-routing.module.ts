import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[Flashlight]
})
export class AppRoutingModule { }
