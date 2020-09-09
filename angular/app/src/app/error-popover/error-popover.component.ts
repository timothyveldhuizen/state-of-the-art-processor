import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-error-popover',
  templateUrl: './error-popover.component.html',
  styleUrls: ['./error-popover.component.css']
})
export class ErrorPopoverComponent implements OnInit {
  @Input() message: string;
  showPopover: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showPopover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showPopover = false;
  }

}
