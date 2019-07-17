import { Component } from '@angular/core';

@Component({
  selector: 'app-accinf-transaction-get',
  templateUrl: './accinf-transaction-get.component.html'
})
export class AccinfTransactionGetComponent {

  activeSegment = 'documentation';
  headers: object = {
    'X-Request-ID': '2f77a125-aa7a-45c0-b414-cea25a116035',
    'Consent-ID': 'CONSENT_ID',
    'PSU-IP-Address': '1.1.1.1',
  };

  changeSegment(segment) {
    if (segment === 'documentation' || segment === 'play-data') {
      this.activeSegment = segment;
    }
  }
}
