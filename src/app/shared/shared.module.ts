import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaCepService } from './services/consulta-cep.service';


@NgModule({
  declarations: [
    CampoControlErrorComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErrorComponent
  ],
  providers: [
    DropdownService,
    ConsultaCepService
  ]
})
export class SharedModule { }
