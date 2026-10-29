import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PageSeo, SeoService } from './seo.service';

/**
 * Replaces Angular's default title handling: after every navigation (including
 * each prerendered route at build time) it applies the deepest route's `seo` data.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route: ActivatedRouteSnapshot = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.seo.apply(route.data['seo'] as PageSeo | undefined, snapshot.url);
  }
}
