import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST to web3forms submit endpoint', () => {
    const data = { name: 'Jane', email: 'jane@example.com' };
    service.submit(data).subscribe();

    const req = httpMock.expectOne('https://api.web3forms.com/submit');
    expect(req.request.method).toBe('POST');
  });

  it('should include access_key in the payload', () => {
    service.submit({ name: 'Jane' }).subscribe();

    const req = httpMock.expectOne('https://api.web3forms.com/submit');
    expect(req.request.body['access_key']).toBeTruthy();
    req.flush({});
  });

  it('should merge provided data into the payload', () => {
    const data = { name: 'Jane', email: 'jane@example.com', message: 'Hello' };
    service.submit(data).subscribe();

    const req = httpMock.expectOne('https://api.web3forms.com/submit');
    expect(req.request.body['name']).toBe('Jane');
    expect(req.request.body['email']).toBe('jane@example.com');
    expect(req.request.body['message']).toBe('Hello');
    req.flush({});
  });
});
