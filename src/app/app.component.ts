import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  theme = 'dark';

  constructor(private router: Router) {

    if (Capacitor.isNativePlatform()) {
      void App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
          return;
        }

        const cleanUrl = this.router.url.split('?')[0];
        const segments = cleanUrl.split('/').filter(Boolean);

        if (segments.length > 1) {
          void this.router.navigate(['/', segments[0]]);
          return;
        }

        if (cleanUrl !== '/station-calculator') {
          void this.router.navigate(['/station-calculator']);
          return;
        }

        void App.exitApp();
      });
    }
  }
}
