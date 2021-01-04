import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = [
      { id: 11, name: 'Hyundai i20', img: '', details: 'Neque porro quisquam ', pricePerHour: 5.34, category: 'sedan', isRented: false },
      { id: 12, name: 'Kia Seltos', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 3.99, category: 'suv', isRented: false },
      { id: 13, name: 'Kia Sonet', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 2.99, category: 'sedan', isRented: false },
      { id: 14, name: 'Tata Altroz', img: '', details: 'Neque porro quisquam est', pricePerHour: 2.34, category: 'suv', isRented: false },
      { id: 15, name: 'Tato Nexon', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 6.25, category: 'compact', isRented: false },
      { id: 16, name: 'Hyundai Venue', img: '', details: 'Neque porro quisquam', pricePerHour: 3.25, category: 'compact', isRented: false },
      { id: 17, name: 'Mazda', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 3.10, category: 'compact', isRented: false },
      { id: 18, name: 'Ferrari', img: '', details: 'Neque porro', pricePerHour: 2.66, category: 'compact', isRented: false },
      // { id: 19, name: 'McLaren', img: '', details: '', pricePerHour: 1.55, category: 'compact', isRented: false },
      // { id: 20, name: 'Mercedes Benz', img: '', details: '', pricePerHour: 2.99, category: 'compact', isRented: false }
    ];
    return {cars};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(cars: Car[]): number {
    return cars.length > 0 ? Math.max(...cars.map(hero => hero.id)) + 1 : 11;
  }
}
