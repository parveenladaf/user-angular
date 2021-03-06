import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  loader = false;
  refId = '';
  userId = '';
  isDisabled = false;

  constructor(private formBuilder: FormBuilder, private readonly route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('reference_id')) {
        this.refId = params.get('reference_id');
      }
      if (params.get('user_id')) {
        this.userId = params.get('user_id');
      }
    });
    this.initFormControl();
  }
  initFormControl() {
    this.userForm = this.formBuilder.group({
      reference_id: [this.refId, Validators.required],
      deliveryDate: [new Date()],
      gender: ['male'],
      name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      email_id: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }


  onSave() {
    if (!this.userForm.valid) {
      this.userService.openToast('Please Enter All The Required Fields', 'Close');
      return;
    }

    const formatedDate = (this.userForm.value.deliveryDate)
      .toISOString()
      .replace(
        /^(?<year>\d+)-(?<month>\d+)-(?<day>\d+)T.*$/,
        '$<year>-$<month>-$<day>'
      );

    const params = {
      name: this.userForm.value.name,
      reference_id: this.userForm.value.reference_id,
      mobile_number: this.userForm.value.mobile_no.e164Number,
      email: this.userForm.value.email_id,
      dob: formatedDate,
      gender: this.userForm.value.gender,
      user_id: this.userId,
      password: this.userForm.value.password
    }

    console.log(params);
    this.loader = true;
    this.isDisabled = true;
    // Save Api Call 
    this.userService.add(params).subscribe((data) => {
      this.loader = false;
      this.userService.openToast('Added Successfully', 'Close');
    }, (err) => {
      this.loader = false;
      this.isDisabled = false;
      if (err['error']['message']) {
        this.userService.openToast(err['error']['message'], 'Close');
      } else {
        this.userService.openToast('Something went wrong', 'Close');
      }
    });
  }
}
