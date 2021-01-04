import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  heroes: Car[];

  constructor(private heroService: CarService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getCars()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addCar({ name } as Car)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Car): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteCar(hero).subscribe();
  }

}
