import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {path: 'public',component: TableComponent},
  {path: '', pathMatch: 'full', redirectTo: 'public'},
  {path: '**', pathMatch: 'full', redirectTo: 'public'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
