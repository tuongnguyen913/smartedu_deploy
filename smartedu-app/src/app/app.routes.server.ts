import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tin-tuc/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'gioi-thieu/:section',
    renderMode: RenderMode.Server
  },
  {
    path: 'chuong-trinh-hoc/:sub',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
