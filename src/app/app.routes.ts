import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list-component/car-list-component';
import { BookingComponent } from './components/booking/booking-component/booking-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full',
  },
  {
    path: 'cars',
    component: CarListComponent,
  },
  {
    path: 'booking/:id',
    component: BookingComponent,
  },
  {
    path: '**',
    redirectTo: 'cars',
  },
];
