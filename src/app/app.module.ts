import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { FooterComponent } from './ui/footer/footer.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatFormField, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    FormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NoopAnimationsModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [BsDropdownConfig, TooltipConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
