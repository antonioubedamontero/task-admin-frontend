import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskState',
})
export class TaskStatePipeMock implements PipeTransform {
  transform(value: string): string {
    return `translation ${value}`;
  }
}
