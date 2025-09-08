import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUserChild } from './order-user-child';

describe('OrderUserChild', () => {
  let component: OrderUserChild;
  let fixture: ComponentFixture<OrderUserChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUserChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUserChild);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
