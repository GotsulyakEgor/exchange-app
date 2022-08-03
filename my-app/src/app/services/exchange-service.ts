import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {debounceTime, distinctUntilChanged, Observable} from "rxjs";
import {IRate} from "../interfaces/rate.interface";
import {IConvert} from "../interfaces/convert.interface";
@Injectable({
    providedIn: 'root'
  })



export class ExchangeService {



  constructor(private http:HttpClient) {

  }


getUSDtoUAH(): Observable<IRate>  {
let url = "https://v6.exchangerate-api.com/v6/d048697217e9c45a59b33c6a/pair/USD/UAH";
// @ts-ignore
  return this.http.get(url);
}

  getEURtoUAH(): Observable<IRate>  {
    let url = "https://v6.exchangerate-api.com/v6/d048697217e9c45a59b33c6a/pair/EUR/UAH";
// @ts-ignore
    return this.http.get(url);
  }

getConvertByAmount(baseCode: string | null, targetCode: string | null, amount: number | null) : Observable<number>  {
  let url = `https://v6.exchangerate-api.com/v6/d048697217e9c45a59b33c6a/pair/${baseCode}/${targetCode}/${amount}`;
  // @ts-ignore
  return this.http.get<IConvert>(url).pipe(map(x => {
    return x.conversion_result
  }))
}

}
