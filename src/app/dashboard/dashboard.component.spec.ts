import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

 import { CarSearchComponent } from '../car-search/car-search.component';
 import { CarService } from '../car.service';
import { CARS } from '../mock-cars';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let carService;
  let getCarsSpy;
  let carMainService: CarService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {

    carService = jasmine.createSpyObj(CarService, ['getCar', 'getCars', 'getCarsAvailables', 'rentCar']);
    getCarsSpy = carService.getCars.and.returnValue(of(CARS));

    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, CarSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: CarService, useValue: carService}]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Cars" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Cars');
  });

  it('should call carService', waitForAsync(() => {
       expect(getCarsSpy.calls.any()).toBe(true);
     }));

  it('should display 8 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(8);
     }));

     it('should count 8 cars', waitForAsync(() => {
      carService.getCars().subscribe(value => {
        expect(value.length).toEqual(8)
      });
    }));

/*
    it('should count 5 cars availables', waitForAsync(() => {

      //carMainService = new CarService(new HttpClient(null), new MessageService());

      let getCar1, getCar2, getCar3;
      carMainService.getCar(10).subscribe(car => getCar1 = car);
      getCar1.isRented = true;
      carMainService.getCar(11).subscribe(car => getCar2 = car);
      getCar2.isRented = true;
      carMainService.getCar(12).subscribe(car => getCar3 = car);
      getCar3.isRented = true;

      carMainService.rentCar(getCar1).subscribe(() => console.log('done'));
      carMainService.rentCar(getCar2).subscribe(() => console.log('done'));
      carMainService.rentCar(getCar3).subscribe(() => console.log('done'));

      carMainService.getCarsAvailables().subscribe(value => {
        expect(value.length).toEqual(0)
      });
    }));
*/
});
