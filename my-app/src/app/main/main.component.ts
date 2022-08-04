import {Component, OnInit} from '@angular/core';
import {ExchangeService} from "../services/exchange-service";
import {debounce, debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedFirst = "USD";
  selectedSecond = "UAH";
  firstInputValue = '0';
  secondInputValue = '0';

  form = new FormGroup(
    {
      firstSelect: new FormControl('USD'),
      secondSelect: new FormControl('UAH'),
      firstInput: new FormControl(0),
      secondInput: new FormControl(0)
    }
  )

  constructor(private exchangeService: ExchangeService) {

  }



  onChangeSecondInputAmount() {
    if (this.secondInputValue.length > 0) {
      this.exchangeService.getConvertByAmount(this.form.controls.secondSelect.value,
        this.form.controls.firstSelect.value, this.form.controls.secondInput.value)
        .subscribe(data => {
          this.form.controls.firstInput.setValue(data)

        })
    }
  }

  onChangeSelect() {
    this.form.controls.secondInput.setValue(0)
    this.form.controls.firstInput.setValue(0)
  }

  ngOnInit(): void {
    this.form.controls.firstInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(_ => !!_),
        switchMap((_) => {
          return this.exchangeService.getConvertByAmount(this.form.controls.firstSelect.value, this.form.controls.secondSelect.value, _)
        })
      )
      .subscribe(x => {

        this.form.controls.secondInput.setValue(x)
      })

  }

}
