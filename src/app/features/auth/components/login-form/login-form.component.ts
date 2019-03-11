import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authenticate } from '../../models';

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
export class LoginFormComponent implements OnInit {

  @Input() loginPending: boolean;
  @Input() registerPending: boolean;

  @ViewChild('submitBtn') submitBtn: ElementRef; // FIXME: comments

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
