import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {MatMenuModule} from '@angular/material/menu';


import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TableEntranceComponent } from './table/table-entrance/table-entrance.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { LoginComponent } from './auth/login/login/login.component';
import { ShowDeleteComponent } from './add-table/show-delete/show-delete.component';
import { OrderComponent } from './posts/order/order.component';
import { PopupComponent } from './posts/popup/popup.component';
import { FeedbackComponent } from './posts/feedback/feedback/feedback.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item/add-menu-item.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    DashboardComponent,
    TableEntranceComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    ShowDeleteComponent,
    OrderComponent,
    PopupComponent,
    FeedbackComponent,
    AddMenuItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatGridListModule,
    MatDividerModule,
    MatMenuModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
