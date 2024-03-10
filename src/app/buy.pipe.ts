import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy',
})
export class BuyPipe implements PipeTransform {
  transform(text: string): string {
    return `${text} Buy`;
  }
}
