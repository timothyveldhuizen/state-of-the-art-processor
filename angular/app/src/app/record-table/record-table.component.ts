import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit {
  @Input() records: Array<any>;
  activeFilter: string = 'all';
  filteredRecords: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.filteredRecords = this.records;
  }

  handleFilterRecords(filter: string) {

    if (filter === 'all') {
      this.activeFilter = 'all';
      this.filteredRecords = this.records;
    }
    if (filter === 'valid') {
      this.activeFilter = 'valid';
      this.filteredRecords = this.records.filter(item => item.isUniqueReference === true && item.isValidTotalAmount === true);
    }
    if (filter === 'invalid') {
      this.activeFilter = 'invalid';
      this.filteredRecords = this.records.filter(item => item.isUniqueReference !== true || item.isValidTotalAmount !== true);
    }
  }

  transformDiscount(discount: number): string {
    return Number.isInteger(discount) ? '€ ' + discount : discount * 100 + '%';
  }

}
