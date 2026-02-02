import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService, Client } from '../services/client.service';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  clients: Client[] = [];
  loading = false;
  selectedTenant = 'empresa_demo';
  tenants = [
    { value: 'empresa_demo', label: 'Tenant 1' },
    { value: 'empresa_demo_2', label: 'Tenant 2' }
  ];

  constructor(private clientService: ClientService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadClients();
  }

  async loadClients(): Promise<void> {
    this.loading = true;
    this.clients = await this.clientService.getClients(this.selectedTenant);
    this.loading = false;
    this.cdr.detectChanges();
  }

  async onTenantChange(): Promise<void> {
    await this.loadClients();
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'status-active';
      case 'INACTIVE':
        return 'status-inactive';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }
}
