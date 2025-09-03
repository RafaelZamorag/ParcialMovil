import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private base = environment.newsApiUrl;
  private key = environment.newsApiKey;

  getNews(q: string, from: string, to: string): Observable<any> {
    const params = new HttpParams()
      .set('q', q)
      .set('from', from)
      .set('to', to)
      .set('sortBy', 'popularity')
      .set('apiKey', this.key);

    return this.http.get(`${this.base}/everything`, { params });
  }
}
