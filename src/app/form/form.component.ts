import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  refId = false;
  currLat = 0;
  currLng = 0;
  constructor(private formBuilder: FormBuilder, private readonly route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.refId = this.route.snapshot.params.id;
    this.initFormControl();
    this.refId = true
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
      
      const params = {
        name: this.userForm.value.name,
        reference_id: this.userForm.value.reference_id,
        mobile_number: this.userForm.value.mobile_no,
        email: this.userForm.value.email_id,
        dob: formatedDate,
        gender:this.userForm.value.gender,
        location : {
          lat: this.currLat,
          lng: this.currLng
        },
        user_id : 'sdasdsa',
        password:this.userForm.value.password
      }
      
      console.log(params);
      // Save Api Call 
    this.userService.add(params).subscribe((data) => {
      if (data['staus'] === 200) {
        this.userService.openToast('Added Successfully', 'Close');
      } else {
        this.userService.openToast('Something went wrong', 'Close');
      }
    }, (err) => {
      if (err['error']['errors'] == null) {
        this.userService.openToast(err['error']['message'], 'Close');
      }
    });
  }
}
