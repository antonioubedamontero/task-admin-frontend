import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
