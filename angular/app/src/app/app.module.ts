import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RecordTableComponent } from './record-table/record-table.component';
import { ErrorPopoverComponent } from './error-popover/error-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    RecordTableComponent,
    ErrorPopoverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
