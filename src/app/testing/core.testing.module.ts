import { SkipSelf, Optional, NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
  imports: [
    HttpClientTestingModule,
  ],
})
export class CoreTestingModule {
  constructor(@Optional() @SkipSelf() parent: CoreTestingModule) {
    if (parent) {
      throw new Error('Core module should be imported in AppModule only');
    }
  }
}
