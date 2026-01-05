import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private cars: Car[] = [
    { id: 1, brand: 'Fiat', model: 'Panda', priceDay: 35, available: true },
    { id: 2, brand: 'BMW', model: 'Serie 1', priceDay: 80, available: true },
    { id: 3, brand: 'Tesla', model: 'Model 3', priceDay: 120, available: false },
    { id: 4, brand: 'Tesla', model: 'Model 5', priceDay: 15, available: false },
    { id: 5, brand: 'Fiat', model: 'Stilo', priceDay: 20, available: false }
  ];

  getCars(): Observable<Car[]>{
    return of(this.cars);
  }
}
