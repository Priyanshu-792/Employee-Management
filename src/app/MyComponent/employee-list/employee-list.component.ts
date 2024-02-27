import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../MyService/employee.service';
import { Employee } from '../../MyModels/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  employee: Employee[] = [];
  constructor(private employeeService: EmployeeService,private router:Router) {
    
  }
  ngOnInit(): void {
       // Fetch employees from the service
    this.employee = this.employeeService.employees;
  }

   // Navigate to the "Add Employee" page
  addEmployee() {
    this.router.navigate(['/add-employee'])
  }
    // Navigate to the "Edit Employee" page with the employee ID
  editEmployee(employeeId: string) {
    this.router.navigate(['/edit-employee', employeeId]);
  }
  deleteEmployee(index: number) {
    const employeeName = this.employee[index].name;
    const confirmation = confirm(`Are you sure want to delete ${employeeName}?`);
    if (confirmation) {
       // Remove the employee from the list
      this.employee.splice(index, 1);
       // Show success message after deleting the employee
      this.DeleteMessage(`The Employee ${employeeName} is deleted successfully.`);
    }
  }

  
  // Show success message for a short duration
 DeleteMessage(message: string) {
    const successElement = document.getElementById('del-msg');
    if (successElement) {
      successElement.innerText = message;
      const messageWidth = message.length * 8;
      successElement.style.width = `${messageWidth}px`;
      successElement.style.display = 'block';
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 2000);

  }
}
}

