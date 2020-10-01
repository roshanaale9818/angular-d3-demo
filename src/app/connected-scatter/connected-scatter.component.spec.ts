import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedScatterComponent } from './connected-scatter.component';

describe('ConnectedScatterComponent', () => {
  let component: ConnectedScatterComponent;
  let fixture: ComponentFixture<ConnectedScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
