import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe(car => this.cars = car);
  }

  onNativeChange(e) {

    if(e.target.checked){
        //this.cars = this.cars.filter(car => !car.isRented);
        this.carService.getCarsAvailables()
          .subscribe(car => this.cars = car);
    }else{
      this.carService.getCars()
      .subscribe(car => this.cars = car);
    }
  }
}
