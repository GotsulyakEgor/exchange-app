import { Component, OnInit } from '@angular/core';
import {ExchangeService} from "../services/exchange-service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  USD: string | undefined
  EUR: string | undefined
  UAH: string | undefined
  USDtoUAH: number | undefined
  EURtoUAH: number | undefined
  USDtoUAHFix: string | undefined
  EURtoUAHFix: string | undefined

  constructor(private exchangeService: ExchangeService) {
    this.exchangeService.getUSDtoUAH().subscribe(data=>{
      this.USD = data.base_code
      this.UAH = data.target_code
      this.USDtoUAH = data.conversion_rate
      this.USDtoUAHFix = this.USDtoUAH.toFixed(2)
    })

    this.exchangeService.getEURtoUAH().subscribe(data=>{
      this.EUR = data.base_code
      this.UAH = data.target_code
      this.EURtoUAH = data.conversion_rate
      this.EURtoUAHFix = this.EURtoUAH.toFixed(2)
    })
    }

  ngOnInit(): void {
  }

}
