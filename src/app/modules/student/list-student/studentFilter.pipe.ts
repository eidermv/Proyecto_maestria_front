import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'studentFilter'
})

export class StudentFilterPipe implements PipeTransform
{
  transform(optionsDataStudents: Array<string>, searchTerm: string): Array<string>
  {
    if(!optionsDataStudents || !searchTerm)
    {
      return optionsDataStudents;
    }

    return optionsDataStudents.filter(student => student['codigo'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 );
  }

}


