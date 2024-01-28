import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class TenantInterceptorService implements HttpInterceptor {
  constructor(private postService: PostService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the tenantId from your authentication service or session
    const tenantId: string | null = this.postService.getTenantId(); // Adjust the type to match your actual logic

    // Clone the request and add the tenantId as a custom header
    const modifiedRequest = req.clone({
      setHeaders: {
        'X-Tenant-Id': tenantId || '', // Default to an empty string if tenantId is null
      },
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
