import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemeComponent ],
      imports : [ReactiveFormsModule, HttpClientModule],
      providers:[TypeproblemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Zone PRENOM invalide avec 2 caractere', () => {
    let zone = component.problemeForm.get('prenom')
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy()
  });

  it('Zone PRENOM valide avec 3 caractere', () => {
    let zone = component.problemeForm.get('prenom')
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRENOM valide avec 200 caractere', () => {
    let zone = component.problemeForm.get('prenom')
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRENOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.get('prenom')
    zone.setValue(' '.repeat(10));
    expect(zone.invalid).toBeTrue();
  });

  it('Zone PRENOM invalide avec 2 espaces et 1 caractere', () => {
    let zone = component.problemeForm.get('prenom')
    zone.setValue(' '.repeat(2) + 'a');
    expect(zone.invalid).toBeTruthy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {

  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {

  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {

  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {

  });

  
});

