import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'generoProducto'
})
export class generoPipe implements PipeTransform {

  transform(genero: string  ): string {

    if (genero === 'F' ) {
      return 'Femenino'
    }else{
      return 'Masculino'
    }


  }

}
