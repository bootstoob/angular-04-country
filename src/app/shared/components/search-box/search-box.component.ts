import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>();    
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder:string = '';
  @Input()
  public initialValue:string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      console.log('DEBOUNCER VALEU: ',value)
      this.onDebounce.emit(value);
    });
  }
  
  emitValue( value: string ):void {
    this.onValue.emit( value );
  }
  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

}
