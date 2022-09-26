import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerPartsComponent } from './components/computer-parts/computer-parts.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ComputerPartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
