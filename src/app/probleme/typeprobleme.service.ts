import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITypeProbleme } from './probleme';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeproblemeService {

  private URLDonnees = "api/typesprobleme";

  constructor(private http: HttpClient) { }

  obtenirProbleme(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.URLDonnees).pipe(
      tap(data => console.log('obtenirProblemes: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `'An error occured: ' ${err.error.message}`;

    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}` 
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
