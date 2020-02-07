import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.css"]
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null
  };

  onSubmit(form) {
    console.log(form.value);

    this.httpClient
      .post("api/user", JSON.stringify(form.value))
      .pipe(map(res => res))
      .subscribe(dados => console.log(dados));
  }

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssError(campo) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "has-feedback": this.verificaValidTouched(campo)
    };
  }

  consultaCEP(cep: string, form) {
    cep = cep.replace(/\D/g, "");

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.httpClient
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDados(dados, form));
      }
    }
  }

  populaDados(dados, form) {
    form.setValue({
      nome: null,
      email: null,
      endereco: {
        cep: dados.cep,
        numero: "",
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }
}
