import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef,
         ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authenticate } from '../../models';
import { race } from 'rxjs';
import { take } from 'rxjs/operators';

enum SubmitType {
  Login,
  Register,
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnChanges {

  @Input() error: string;
  @Input() loginPending: boolean;
  @Input() registerPending: boolean;

  // hidden submit button in order to submit form after click on login and register button (as there is no programmatic way to do it)
  @ViewChild('submitBtn') submitBtn: ElementRef;

  @Output() login = new EventEmitter<Authenticate>();
  @Output() register = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  private submitType: SubmitType;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.error && changes.error.currentValue) {
      const controls = [this.form.controls.username, this.form.controls.password];
      controls.forEach(c => c.setErrors({ apiError: true }));

      // remove errors on any input change
      race(controls.map(c => c.valueChanges))
        .pipe(take(1))
        .subscribe(() => {
          this.error = undefined;
          controls.forEach(c => {
            c.setErrors({ apiError: false });
            c.updateValueAndValidity();
          });
        });
    }
  }

  submit(type: 'login' | 'register') {
    if (this.loginPending || this.registerPending) {
      return;
    }

    if (type === 'login') {
      this.submitType = SubmitType.Login;
    }

    if (type === 'register') {
      this.submitType = SubmitType.Register;
    }

    this.submitBtn.nativeElement.click();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    switch (this.submitType) {
      case SubmitType.Login:
        this.login.emit(this.form.value);
        break;
      case SubmitType.Register:
        this.register.emit(this.form.value);
        break;
    }
  }

}
