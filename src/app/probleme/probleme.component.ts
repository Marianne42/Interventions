import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './probleme';
import { emailMatcherValidator } from '../shared/email-matcher.component';



@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent {
problemeForm: FormGroup;
typeProblemes : ITypeProbleme[];
errorMessage: string;
constructor(private fb: FormBuilder, private probleme: TypeproblemeService){ }
  ngOnInit(){
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      noTypeProbleme: ['', [Validators.required]],
      
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      notification: ['pasnotification']
    });

    this.probleme.obtenirProbleme()
    .subscribe(cat => this.typeProblemes = cat, 
      error => this.errorMessage = <any>error)

      this.problemeForm.get('notification').valueChanges
 .subscribe(value => this.appliquerNotifications(value));

  }
  
  save(): void {
  }

  appliquerNotifications(typeNotification: string): void {
    const courrielControle = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControle = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupeControle = this.problemeForm.get('courrielGroup');      
    const telephoneControle = this.problemeForm.get('telephone');      

    // Tous remettre à zéro
    courrielControle.clearValidators();
    courrielControle.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControle.disable();  

    courrielConfirmationControle.clearValidators();
    courrielConfirmationControle.reset();    
    courrielConfirmationControle.disable();

    telephoneControle.clearValidators();
    telephoneControle.reset();    
    telephoneControle.disable();

    courrielGroupeControle.clearValidators();
    courrielGroupeControle.reset();    
    courrielGroupeControle.disable();

    if (typeNotification === 'parCourriel') {   
            courrielControle.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);    
            courrielControle.enable();  
            courrielConfirmationControle.setValidators([Validators.required]);              
            courrielConfirmationControle.enable();  
            // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
            courrielGroupeControle.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
      }   
      else
      {
        if(typeNotification === 'parTelephone')
        {
          telephoneControle.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);      
          telephoneControle.enable();           
        }
      }
      courrielControle.updateValueAndValidity();   
      courrielConfirmationControle.updateValueAndValidity();   
      telephoneControle.updateValueAndValidity();     
  }


}
