import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ClientsTableComponent } from './app/components/clients-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClientsTableComponent],
  template: `
    <app-clients-table></app-clients-table>
  `
})
export class App {}

bootstrapApplication(App);
