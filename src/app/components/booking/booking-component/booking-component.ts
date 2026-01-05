import { Component } from '@angular/core';
import { Car } from '../../../core/models/car.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CarService } from '../../../core/services/car.service';
@Component({
  selector: 'app-booking-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.scss',
})
export class BookingComponent {
  car!: Car;
  bookingForm!: FormGroup;
  totalPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    const carId = Number(this.route.snapshot.paramMap.get('id'));

    this.carService.getCars().subscribe(cars => {
      this.car = cars.find(c => c.id === carId)!;
    });

    this.bookingForm = this.fb.group({
      customerName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    const { startDate, endDate } = this.bookingForm.value;

    if (startDate && endDate && this.car) {
      const days =
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24);

      this.totalPrice = days > 0 ? days * this.car.priceDay : 0;
    } else {
      this.totalPrice = 0;
    }
  }

  submit(): void {
    if (this.bookingForm.invalid) return;

    this.snackBar.open(
      `Prenotazione confermata per ${this.car.brand} ${this.car.model}`,
      'OK',
      { duration: 3000 }
    );

    setTimeout(() => {
      this.router.navigate(['/cars']);
    }, 3000);
  }
}
