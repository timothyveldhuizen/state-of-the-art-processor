import { Component, OnInit } from '@angular/core';
import { parseFile, validateRecords } from 'form-submission-processor';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileIsUploaded: boolean = false;
  validatedRecords: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleFileUploadChange(file: File): void {
    this.fileIsUploaded = true;
    if(file) {
      console.log(file)
      // file.stream().getReader().read().then(readerObject => console.log('readerObject',readerObject));
      // file.arrayBuffer().then(buffer => console.log('buffer',buffer));
      file.text().then(text => {
          console.log('text', text)
          const parsedFile = parseFile(text, file.type)
          console.log('parsedFile', parsedFile)
          this.validatedRecords = (validateRecords(parsedFile))
          console.log('validatedRecords', this.validatedRecords)
          this.fileIsUploaded = true;

      });
  }
  this.validatedRecords = [];
  this.fileIsUploaded = false;
  }

}
