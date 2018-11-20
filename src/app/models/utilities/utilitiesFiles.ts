export class UtilitiesFile
{
  determineTypeFile(file: File)
  {
    const returnFile = file.type.split('/');
    if(returnFile[1] == 'jpeg')
    {
      returnFile[1] = 'jpg';
    }
    return returnFile[1];
  }
}
