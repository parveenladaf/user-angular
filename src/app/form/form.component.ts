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
  refId = '';
  userId = '';
  disableHash = {
    refId: false
  }
  currLat = 0;
  currLng = 0;
  constructor(private formBuilder: FormBuilder, private readonly route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('reference_id')) {
        this.refId = params.get('reference_id');
        this.disableHash.refId = true;
      }
      if (params.get('user_id')) {
        this.userId = params.get('user_id');
      }
    });
    this.initFormControl();
    this.getCurrentLocation();
  }
  initFormControl() {
    this.userForm = this.formBuilder.group({
      reference_id: [this.refId, Validators.required],
      deliveryDate: [new Date()],
      gender: ['male'],
      name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[6789][0-9]{9}$')]],
      email_id: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
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
    if (this.currLat == 0 && this.currLng == 0) {
      this.userService.openToast('Please Allow browser location', 'Close');
      return;
    }
    var points = new Array();
    points['lat'] = this.currLat;
    points['lng'] = this.currLng;


    const params = {
      name: this.userForm.value.name,
      reference_id: this.userForm.value.reference_id,
      mobile_number: this.userForm.value.mobile_no,
      email: this.userForm.value.email_id,
      dob: formatedDate,
      gender: this.userForm.value.gender,
      location: points,
      user_id: this.userId,
      password: this.userForm.value.password
    }

    console.log(params);
    // Save Api Call 
    this.userService.add(params).subscribe((data) => {
      this.userService.openToast('Added Successfully', 'Close');
    }, (err) => {
      if (err['error']['errors'] == null) {
        this.userService.openToast(err['error']['message'], 'Close');
      } else {
        this.userService.openToast('Something went wrong', 'Close');
      }
    });
  }
}
