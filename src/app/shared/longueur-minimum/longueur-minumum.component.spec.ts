import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe ('longueurMinimum Validator', () => {
    
    
   
   
   
    it('#7 une chaîne avec 10 espaces est invalide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });   
       
       
       
   it('#8 une phrase avec des mots est valide', () => {
        let control = { value: 'Je suis valide' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
    });
       
     
   it('#9 une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: '   Je suis valide   ' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#10 une phrase avec 1 espace et 2 caractère est invalide', () => {
        let control = { value: ' xx' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it('#11 une phrase avec 2 espace et 1 caractère est invalide', () => {
        let control = { value: '  x' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it('#12 une phrase avec 3 espace et 3 caractère est valide', () => {
        let control = { value: '  xxx' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#13 une phrase avec 5 espace et 5 caractère et 5 espaces est valide', () => {
        let control = { value: '    xxxxx     ' }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#14 une chaine nulle est invalide', () => {
        let control = { value: null }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });
});