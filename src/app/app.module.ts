import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import {BrowserModule} from '@angular/platform-browser';
import {ChartsModule} from "ng2-charts";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule} from "ngx-pagination";
import { LoginServices} from "./material-component/login/login.services";
import {MaterialComponentsModule} from "./material-component/material.module";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    ChartsModule,
    DragDropModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MaterialComponentsModule,
  ],
  // AppRoutes
  providers: [
    LoginServices,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
