import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'kababCase',
    standalone: true
})


export class KababCasePipe implements PipeTransform {
    transform(value: any) {
        return value.toLowerCase().replace(/ /g, '-');
    }

}