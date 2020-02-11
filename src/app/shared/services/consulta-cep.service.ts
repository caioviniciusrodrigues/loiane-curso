import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ConsultaCepService {
  constructor(private httpClient: HttpClient) {}

  consultaCEP(cep) {
    cep = cep.replace(/\D/g, "");

    if (cep != "") {
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.httpClient
          .get(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }
  }
}
