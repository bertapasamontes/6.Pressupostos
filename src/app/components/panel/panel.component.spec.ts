import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetService } from '../../services/budget.service';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let service: BudgetService;
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent],
      providers: [BudgetService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BudgetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return 30 when numPages and numLanguajes are 1', ()=>{
    component.numPages = 1;
    component.numLanguajes = 1;

    service.calculaCosteAdicional(component.numPages, component.numLanguajes);
    expect(component.coste).toBe(30);
  });

  it('should return 60 when numPages == 2 and numLanguajes == 1', ()=>{
    component.numPages = 2;
    component.numLanguajes = 1;

    service.calculaCosteAdicional(component.numPages, component.numLanguajes);
    expect(component.coste).toBe(60);
  });
  
});
