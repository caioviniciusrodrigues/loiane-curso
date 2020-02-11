import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { EstadorBr } from "../shared/model/estado-br";
import { DropdownService } from "../shared/services/dropdown.service";
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.css"]
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  //estados: EstadorBr[];
  estados: Observable<EstadorBr[]>;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {

 /*
    this.dropDownService.getEstadosBr().subscribe(dados => {
      this.estados = dados;
      console.table(dados);
    });
*/
    this.estados = this.dropDownService.getEstadosBr();


    this.formulario = this.formBuilder.group({
      nome: [ null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    if (this.formulario.valid) {
      this.httpClient
        .post("https://httpbin.org/post", JSON.stringify(this.formulario.value))
        .pipe(map(res => res))
        .subscribe(dados => {
          console.log(dados);
          this.formulario.reset();
        });
    } else {
      console.log("Formulario Invalido");
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.table(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormulario(controle);
      }
    });
  }

  cancelar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).dirty || this.formulario.get(campo).touched)
    );
  }

  aplicaCssError(campo) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "has-feedback": this.verificaValidTouched(campo)
    };
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    if (cep != null && cep !== '') {
      this.resetaDadosFormulario();
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDados(dados));
      }
  }


  populaDados(dados) {
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosFormulario() {
    this.formulario.patchValue({
      endereco: {
        cep: null,
        numero: '',
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
