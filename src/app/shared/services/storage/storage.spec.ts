import { TestBed } from '@angular/core/testing';
import { AppStorage } from './storage';

describe('AppStorage', () => {
  let service: AppStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStorage);
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get data', () => {
    service.set('users', [{ Email: 'a@a.com', Name: 'A', LastName: 'B', Password: '123' }]);
    const users = service.get<any[]>('users');
    expect(users?.length).toBe(1);
    expect(users?.[0].Email).toBe('a@a.com');
  });

  it('should return null for missing key', () => {
    expect(service.get('missing')).toBeNull();
  });
});
