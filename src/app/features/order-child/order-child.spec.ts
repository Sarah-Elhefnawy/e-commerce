import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChild } from './order-child';

describe('OrderChild', () => {
  let component: OrderChild;
  let fixture: ComponentFixture<OrderChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderChild);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
