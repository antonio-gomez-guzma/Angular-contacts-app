import { Directive, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(()=> DateValueAccessorDirective),
  multi: true, 
};

@Directive({
  selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]'
})
export class DateValueAccessorDirective {

  constructor(private element: ElementRef) { }

  writeValue(newValue:any){
    if(newValue instanceof Date)
      {
        //yyyy-mm-dd
        this.element.nativeElement.value = newValue.toISOString().split('T')[0];
        //yyyy-mm-ddThh:mm:ss.000Z -> yyyy-mm-dd
      }
  }

}
