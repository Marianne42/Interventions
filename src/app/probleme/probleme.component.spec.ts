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

  it('#1 Zone PRENOM invalide avec 2 caractere', () => {
    let zone = component.problemeForm.get('prenom')
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy()
  });

  it('#2 Zone PRENOM valide avec 3 caractere', () => {
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
    component.appliquerNotifications("pasnotification");

    let zone = component.problemeForm.get('telephone')
    expect(zone.disabled).toBeTrue();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications("pasnotification");
    let zone = component.problemeForm.get('telephone')
    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("pasnotification");

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeTrue();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("pasnotification");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
  });

  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('pasnotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.enabled).toBeTrue();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.enabled).toBeTrue();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup.courriel')
    zone.setValue(null);
    expect(zone.invalid).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone.setValue(null);
    expect(zone.invalid).toBeTruthy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup.courriel')
    zone.setValue('a'.repeat(10));
    expect(zone.invalid).toBeTruthy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup')
    let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone1.setValue('aa@aa.com');
    expect(zone.invalid).toBeTruthy();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup')
    let zone1 = component.problemeForm.get('courrielGroup.courriel')
    zone1.setValue('aa@aa.com');
    expect(zone.invalid).toBeTruthy();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup')
    let zone1 = component.problemeForm.get('courrielGroup.courriel')
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone1.setValue('aa@aa.com');
    zone2.setValue('aa@ba.com');
    expect(zone.invalid).toBeTruthy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications("parCourriel");
    let zone = component.problemeForm.get('courrielGroup')
    let zone1 = component.problemeForm.get('courrielGroup.courriel')
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone1.setValue('aa@aa.com');
    zone2.setValue('aa@aa.com');
    expect(zone.valid).toBeTruthy();
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('telephone')
    expect(zone.enabled).toBeTrue();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeTrue();
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTrue();
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('telephone')
    zone.setValue(null);
    expect(zone.invalid).toBeTrue();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('telephone')
    zone.setValue('aaaaaaaaaa');
    expect(zone.invalid).toBeTrue();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('telephone')
    zone.setValue('123456789');
    expect(zone.invalid).toBeTrue();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('telephone')
    zone.setValue('12345678910');
    expect(zone.invalid).toBeTrue();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications("parTelephone");

    let zone = component.problemeForm.get('telephone')
    zone.setValue('1234567890');
    expect(zone.valid).toBeTrue();
  });

  
});

