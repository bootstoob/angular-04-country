import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl:string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital:   { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion:    { region: '', countries: [] },
      }

    constructor(private http: HttpClient) { 
        console.log('COUNTRY SERVICE INIT FUNCA')
    }

    private getCountriesRequest( url: string ): Observable<Country[]> {
        return this.http.get<Country[]>( url )
        .pipe(
            catchError( () => of([]) ),
            // delay( 2000 ),
        );
    }

    searchCountryByAlphaCode(code:string):Observable<Country | null>{
        const url = `${ this.apiUrl }/alpha/${ code }`;
        return this.http.get<Country[]>( url )
        .pipe(
            map( countries => countries.length > 0 ? countries[0]: null ),
            catchError( () => of(null) )
        );
    }
    
    searchCapital( term:string ):Observable<Country[]>{
        //esto:
        //return this.http.get<Country[]>(`${this.apiUrl}/capital/san`)
        //ó esto:
        const url = `${ this.apiUrl }/capital/${ term }`;
        //return this.http.get<Country[]>( url )
            //.pipe(
                //1
                //tap(countries => console.log('Pasop por el TAP', countries))
                //2
                //catchError(error=>{
                //    console.log(error);
                //    return of([])
                //})
                //3
                //catchError(( ) => of([]))
            //);
        return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byCapital = { term:term, countries:countries }),
          //tap( () => this.saveToLocalStorage() ),
        );
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ term }`;
        return this.getCountriesRequest(url);
    }
    
    searchRegion( region: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ region }`;
        return this.getCountriesRequest(url);
    }
    
}