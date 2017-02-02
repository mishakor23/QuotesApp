import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.prod';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map