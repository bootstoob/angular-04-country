import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
    )
    /*
    .subscribe( ({params:any})=> {
      console.log({params:params['id']})
      this.countriesService.searchCountryByAlphaCode(id)
    }
    */
    /*
    .subscribe( ({id})=> {
        console.log({id})
        this.countriesService.searchCountryByAlphaCode(id)
      }
      
    );
    */
    /*
    .subscribe( ({id})=> {
      this.countriesService.searchCountryByAlphaCode(id)
      .subscribe(country=>{
        console.log({country})
      });
    });
    */
    .subscribe( country => {
      console.log({country})
      if ( !country ) 
        return this.router.navigateByUrl('');
      console.log('TENEMOS UN COUNTRY');
      return this.country = country;
    });
  }
}