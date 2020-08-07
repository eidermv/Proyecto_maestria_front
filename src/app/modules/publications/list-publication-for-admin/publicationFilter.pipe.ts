import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'publicationFilter'
})

export class PublicationFilterPipe implements PipeTransform {
  transform(optionsPublicationsStudents: Array<string>, searchTerm: string): Array<string> {
    if (!optionsPublicationsStudents || !searchTerm) {
      return optionsPublicationsStudents;
    }

    return optionsPublicationsStudents.filter(publication => (publication['autor'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                              || (publication['estudiante']['codigo'].toLowerCase()
                                                  .indexOf(searchTerm.toLowerCase()) !== -1)
                                              || (publication['estado'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                              || (publication['tipoDocumento'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }

}
