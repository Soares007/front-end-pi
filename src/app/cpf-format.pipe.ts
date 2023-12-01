import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    // Remove caracteres não numéricos
    const numericValue = value.toString().replace(/\D/g, '');

    // Formatação do CPF (XXX.XXX.XXX-XX)
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}