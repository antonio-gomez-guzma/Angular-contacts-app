import { Directive, ElementRef, HostListener, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(()=> DateValueAccessorDirective),
  multi: true, 
};

@Directive({
  selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function; 

  @HostListener('blur')
  private onTouch!: Function

  registerOnChange(fn:Function)
  {
    this.onChange = (valueAsDate:Date) => {fn(valueAsDate);  }
  }

  registerOnTouched(fn: Function){
    this.onTouch = fn;
  }

  writeValue(newValue:any){
    if(newValue instanceof Date)
      {
        //yyyy-mm-dd
        this.element.nativeElement.value = newValue.toISOString().split('T')[0];
        //yyyy-mm-ddThh:mm:ss.000Z -> yyyy-mm-dd
      }
  }


}
