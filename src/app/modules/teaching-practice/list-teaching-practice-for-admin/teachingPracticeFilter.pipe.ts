import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'teachingPracticeFilter'
})

export class TeachingPracticeFilterPipe implements PipeTransform {
  transform(optionsTeachingPractice: Array<string>, searchTerm: string): Array<string> {
    if (!optionsTeachingPractice || !searchTerm) {
      return optionsTeachingPractice;
    }

    return optionsTeachingPractice.filter(teachingPractice =>
                                      (teachingPractice['estudiante']['nombres'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      || (teachingPractice['estudiante']['apellidos']
                                          .toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      || (teachingPractice['estudiante']['codigo'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      || (teachingPractice['estado'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      || (teachingPractice['tipoPracticaDocente'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }

}
