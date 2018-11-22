import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'internshipFilter'
})

export class InternshipFilterPipe implements PipeTransform
{
  transform(optionsInternship: Array<string>, searchTerm: string): Array<string>
  {
    if(!optionsInternship || !searchTerm)
    {
      return optionsInternship;
    }

    return optionsInternship.filter(internship =>
                                      (internship['estudiante']['nombres'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      ||(internship['estudiante']['apellidos'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      ||(internship['estudiante']['codigo'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      ||(internship['estado'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                                      ||(internship['tipoPasantia'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }

}
