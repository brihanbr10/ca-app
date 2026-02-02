import { Injectable } from '@angular/core';

export interface Client {
  id: string;
  tenant_id: string;
  client_name: string;
  client_status: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://ca-tenant-guard.onrender.com/client';

  constructor() { }

  async getClients(tenantKey: string): Promise<Client[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'ca-tenant-key': tenantKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error fetching clients:', response.statusText);
        return [];
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }
}
