import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  spinnerActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      profession: ['', Validators.required],
    });
  }
  userImage!: File;
  addNewUser() {
    if (this.userForm.valid) {
      const userFormData = this.userForm.value;
      console.log(userFormData);
      console.log(this.userImage);

      if (this.userImage === undefined) {
        this.userImage = new File([], '');
      }
      this.spinnerActive = true;

      this.userService.registerNewUser(this.userImage, userFormData).subscribe(
        (success) => {
          console.log(success);
          console.log(success.username);

          let snackBarRef = this._snackBar.open(
            `User ${success.username} has successfully registred !!!`,
            'OK',
            {
              duration: 2000,
              // verticalPosition: 'bottom', // Set vertical position to top
              panelClass: ['snackbar'],
            }
          );
          this.spinnerActive = false;
          snackBarRef.afterOpened().subscribe(() => {
            const snackBarContainer = document.querySelector(
              '.snackbar'
            ) as HTMLElement;
            this.renderer.setStyle(snackBarContainer, 'margin-bottom', '10rem'); // Adjust margin as needed
          });

          snackBarRef.afterDismissed().subscribe(() => {
            this.route.navigateByUrl('/login');
          });
        },
        (error) => {
          console.log(error);
          let snackBarRef = this._snackBar.open(
            'Something went wrong !',
            'OK',
            {
              duration: 2000,
              // verticalPosition: 'bottom', // Set vertical position to top
              panelClass: ['snackbar'],
            }
          );
          snackBarRef.afterOpened().subscribe(() => {
            const snackBarContainer = document.querySelector(
              '.snackbar'
            ) as HTMLElement;
            this.renderer.setStyle(snackBarContainer, 'margin-bottom', '10rem'); // Adjust margin as needed
          });
          this.spinnerActive = false;
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  imgUrl: any = './assets/images/userLogo.png';
  onFileSelected(event: any) {
    if (event.target.files) {
      this.userImage = event.target.files[0];
      console.log(this.userImage);
      let reader = new FileReader();
      reader.readAsDataURL(this.userImage);
      reader.onload = (e) => {
        this.imgUrl = e.target?.result;
      };
    }
  }
}
