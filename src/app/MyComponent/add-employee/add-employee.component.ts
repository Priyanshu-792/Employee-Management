// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../MyService/employee.service';
import { Employee } from '../../MyModels/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  // Form group to manage employee form
  employeeForm!: FormGroup;
  // Flag to track if editing an employee
  isEdit: boolean = false;

  employeeId: string = '';
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      name: [''],
      contactNumber: [''],
      email: [''],
      skills: this.fb.array([
        this.fb.group({
          skillName: [''],
          experience: [''],
        }),
      ]),
      gender: [''],
    });
  }
  // Lifecycle hook, it executes when component is initialized
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.employeeId = params['id'];
        const employee = this.employeeService.getEmployeeById(this.employeeId);
        // Populate form with employee data
        if (employee) {
          this.openForm(employee);
        } else {
          console.log('employee not found');
        }
      }
    });
  }

  openForm(employee: Employee) {
    this.employeeForm.patchValue({
      employeeId: employee.employeeId,
      name: employee.name,
      contactNumber: employee.contactNumber,
      email: employee.email,
      gender: employee.gender,
    });
    this.employeeForm.setControl('skills', this.fb.array([]));
    employee.skills.forEach((skill) => {
      this.skillForms.push(
        this.fb.group({
          skillName: skill.skillName,
          experience: skill.experience,
        })
      );
    });
  }

  // Function to get skill form array
  get skillForms() {
    return this.employeeForm.get('skills') as FormArray;
  }
  // Function to create skill form group
  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  addSkill() {
    this.skillForms.push(this.createSkillFormGroup());
    console.log(this.skillForms.length);
  }

  removeSkill(index: number) {
    this.skillForms.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      // Display an alert message if name contains special characters or digits
      const name = this.employeeForm.value.name;
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(name)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Name!',
          text: 'Name cannot contain special characters or digits.',
          timer: 4000,
        });
        return;
      }

      // Check if contact number is exactly 10 digits
      const contactNumber = this.employeeForm.value.contactNumber;
      if (!/^\d{10}$/.test(contactNumber)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Mobile Number!',
          text: 'Mobile number should be exactly 10 digits.',
          timer: 4000,
        });
        return;
      }

      // Display an alert message if email format is invalid
      const email = this.employeeForm.value.email;
      if (!/\S+@\S+\.\S+/.test(email)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Invalid email format.',
          timer: 4000,
        });
        return;
      }

      // Proceed with form submission if everything is valid
      const newEmployee = {
        employeeId: this.employeeForm.value.employeeId,
        name: this.employeeForm.value.name,
        contactNumber: this.employeeForm.value.contactNumber,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        skills: this.employeeForm.value.skills,
      };

      if (this.isEdit && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, newEmployee);
      } else {
        this.employeeService.addEmployee(newEmployee);
      }

      this.employeeForm.reset();
      this.router.navigate(['/']);
    }
  }
}
