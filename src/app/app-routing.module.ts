import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/Home/home-page/home-page.component';


const routes: Routes = [
  {path:'Home', component:HomePageComponent},
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'**',redirectTo:'Home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
