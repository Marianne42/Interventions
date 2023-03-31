import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Zone PRENOM invalide avec 2 caractere', () => {
    
  });

  it('Zone PRENOM valide avec 3 caractere', () => {
    
  });

  it('Zone PRENOM valide avec 200 caractere', () => {
    
  });

  it('Zone PRENOM valide avec 10 espaces', () => {
    
  });

  it('Zone PRENOM valide avec 2 espaces et 1 caractere', () => {
    
  });
});

