import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Car } from './car';
import { CarService } from './car.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

describe('CarService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let carService: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        CarService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    carService = TestBed.get(CarService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// carService method tests begin ///

  describe('#getcares', () => {
    let expectedCars: Car[];

    beforeEach(() => {
      carService = TestBed.get(CarService);
      expectedCars = [
        { id: 11, name: 'Hyundai i20', img: '', details: 'Neque porro quisquam ', pricePerHour: 5.34, category: 'sedan', isRented: false },
      { id: 12, name: 'Kia Seltos', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 3.99, category: 'suv', isRented: false },
      { id: 13, name: 'Kia Sonet', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 2.99, category: 'sedan', isRented: false },
      { id: 14, name: 'Tata Altroz', img: '', details: 'Neque porro quisquam est', pricePerHour: 2.34, category: 'suv', isRented: false },
      { id: 15, name: 'Tato Nexon', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 6.25, category: 'compact', isRented: false },
      { id: 16, name: 'Hyundai Venue', img: '', details: 'Neque porro quisquam', pricePerHour: 3.25, category: 'compact', isRented: false },
      { id: 17, name: 'Mazda', img: '', details: 'ipsum quia dolor sit amet', pricePerHour: 3.10, category: 'compact', isRented: false },
      { id: 18, name: 'Ferrari', img: '', details: 'Neque porro', pricePerHour: 2.66, category: 'compact', isRented: false },
       ] as Car[];
    });

    it('should return expected cars (called once)', () => {

      carService.getCars().subscribe(
        cars => expect(cars).toEqual(expectedCars, 'should return expected cars'),
        fail
      );

      // CarService should have made one request to GET cars from expected URL
      const req = httpTestingController.expectOne(carService.carUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock cars
      req.flush(expectedCars);
    });

    it('should be OK returning no cars', () => {

      carService.getCars().subscribe(
        cars => expect(cars.length).toEqual(0, 'should have empty cars array'),
        fail
      );

      const req = httpTestingController.expectOne(carService.carUrl);
      req.flush([]); // Respond with no cars
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty cars result', () => {

      carService.getCars().subscribe(
        cars => expect(cars.length).toEqual(0, 'should return empty cars array'),
        fail
      );

      const req = httpTestingController.expectOne(carService.carUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected cars (called multiple times)', () => {

      carService.getCars().subscribe();
      carService.getCars().subscribe();
      carService.getCars().subscribe(
        cars => expect(cars).toEqual(expectedCars, 'should return expected cars'),
        fail
      );

      const requests = httpTestingController.match(carService.carUrl);
      expect(requests.length).toEqual(3, 'calls to getCars()');

      // Respond to each request with different mock car results
      requests[0].flush([]);
      requests[1].flush([{id: 11, name: 'bob'}]);
      requests[2].flush(expectedCars);
    });

    it('should return x cars available to rent', () => {

      let car1;
      carService.getCar(1).subscribe(
        function(car) {
        //car1 = car,
        console.log('hello');
        console.log(car);
        expect(car).toEqual(expectedCars[0], 'should return expected cars'),
        fail
        }
      );
      console.log(car1);
      car1.isRented = true;
      carService.rentCar(car1).subscribe(()=> console.log('done'));

      carService.getCarsAvailables().subscribe(
        cars => expect(cars.length).toEqual(expectedCars.filter(x=> x.isRented).length, 'should return expected cars'));
      
      // CarService should have made one request to GET cars from expected URL
      const req = httpTestingController.expectOne(carService.carUrl + '/'+ 1);
      expect(req.request.method).toEqual('GET');

      const req1 = httpTestingController.expectOne(carService.carUrl);
      expect(req1.request.method).toEqual('PUT');

      //const requests = httpTestingController.match(carService.carUrl +'/?isRented=false');;
      //expect(requests.method).toEqual('GET');
      //expect(requests.length).toEqual(9, 'calls to getCarsAvailables()');

      /*
       const req = httpTestingController.expectOne(carService.carUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateCar);
      */

      // Respond with the mock cars
      req.flush(expectedCars[0]);

      /*let car1, car2, car3;
      carService.getCar(11).subscribe(x => car1 = x);
      carService.getCar(12).subscribe(x => car2 = x);
      carService.getCar(13).subscribe(x => car3 = x);
      car1.isRented = car2.isRented = car3.isRented = true;

      carService.rentCar(car1).subscribe(()=> console.log('done'));
      carService.rentCar(car2).subscribe(()=> console.log('done'));
      carService.rentCar(car3).subscribe(()=> console.log('done'));

      let carsToRent;
      carService.getCarsAvailables().subscribe(x => carsToRent = x);
      
      

      const requests = httpTestingController.match(carService.carUrl);
      expect(carsToRent.length).toEqual(3, 'calls to getCarsAvailables()');

      // Respond to each request with different mock car results
      //requests[0].flush([]);
      //requests[1].flush([{id: 11, name: 'bob'}]);
      //requests[2].flush(expectedCars);*/
    });

  });

  describe('#updateCar', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${carService.carUrl}/?id=${id}`;

    it('should update a car and return it', () => {

      const updateCar: Car = { id: 12, name: 'A', pricePerHour: 2, isRented: false, details: '', img: '', category: 'van' };

      carService.updateCar(updateCar).subscribe(
        data => expect(data).toEqual(updateCar, 'should return the car'),
        fail
      );

      // CarService should have made one request to PUT car
      const req = httpTestingController.expectOne(carService.carUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateCar);

      // Expect server to return the car after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateCar });
      req.event(expectedResponse);
    });
    

  });

  // TODO: test other carService methods
});