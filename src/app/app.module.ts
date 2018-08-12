import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatDialogModule,
  MatRadioModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatTabsModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatDividerModule
} from '@angular/material';
// component
import { GeneralMenuComponent } from './components/shared/general-menu/general-menu.component';
import { LoginComponent } from './components/user/login/login.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { GeneralDialogComponent } from './components/shared/general-dialog/general-dialog.component';
import { GeneralAlertComponent } from './components/shared/general-alert/general-alert.component';
import { TicketsAdmComponent } from './components/admin/tickets-adm/tickets-adm.component';
// import { ApiTokenInterceptor } from './_config/api-jwt-interceptor';
// mdc web
import { MdcFabModule, MdcMenuModule, MdcIconModule } from '@angular-mdc/web';

// npm

@NgModule({
  entryComponents: [GeneralDialogComponent, GeneralAlertComponent],
  declarations: [
    AppComponent,
    GeneralMenuComponent,
    LoginComponent,
    NewUserComponent,
    GeneralDialogComponent,
    GeneralAlertComponent,
    TicketsAdmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MdcFabModule,
    MdcMenuModule,
    MdcIconModule
  ],
  providers: [
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true
    } ,*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
