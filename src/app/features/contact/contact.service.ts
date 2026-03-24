import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO: move to environment config
// Register at https://web3forms.com with hello@codecraftsolutions.rs to get the key
const WEB3FORMS_ACCESS_KEY = '8332cb97-b663-4180-80fa-8653e592938d';
const RECIPIENT_EMAIL = 'hello@codecraftsolutions.rs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submit(data: Record<string, unknown>) {
    return this.http.post('https://api.web3forms.com/submit', {
      access_key: WEB3FORMS_ACCESS_KEY,
      to: RECIPIENT_EMAIL,
      subject: 'New enquiry from CodeCraft website',
      ...data,
    });
  }
}
