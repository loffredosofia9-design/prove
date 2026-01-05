import { Component } from '@angular/core';
import { Car } from '../../../core/models/car.model';
import { Router } from '@angular/router';
import { CarService } from '../../../core/services/car.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-car-list-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    //angular material
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './car-list-component.html',
  styleUrl: './car-list-component.scss',
})
export class CarListComponent {

  cars: Car[] = []
  brandFilter = '';
  maxPrice?: number;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.carService.getCars().subscribe(cars => this.cars = cars);
  }

  get filteredCars(): Car[] {
    return this.cars.filter(car =>
      (!this.brandFilter || car.brand.toLowerCase().includes(this.brandFilter.toLowerCase())) &&
      (!this.maxPrice || car.priceDay <= this.maxPrice)
    );
  }

    goToBooking(id: number) {
    this.router.navigate(['/booking', id]);
  }
}
