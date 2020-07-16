import { Component } from '@angular/core';
import { helloWorld } from 'form-submission-processor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = helloWorld();
}
