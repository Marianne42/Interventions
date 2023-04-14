import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './probleme';



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
      noTypeProbleme: ['', [Validators.required]]
    });

    this.probleme.obtenirProbleme()
    .subscribe(cat => this.typeProblemes = cat, 
      error => this.errorMessage = <any>error)


  }
  
  save(): void {
  }


}
