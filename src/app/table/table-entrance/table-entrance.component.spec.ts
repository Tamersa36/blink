import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEntranceComponent } from './table-entrance.component';

describe('TableEntranceComponent', () => {
  let component: TableEntranceComponent;
  let fixture: ComponentFixture<TableEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEntranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
