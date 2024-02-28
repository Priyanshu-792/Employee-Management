import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../MyService/employee.service';
import { Employee } from '../../MyModels/employee.model';
import Swal from 'sweetalert2';



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

  //to show deletion message on deleting the table row of the data
  deleteEmployee(index: number) {
    const employeeName = this.employee[index].name;
    
    Swal.fire({
      title: ` Are you sure you want to delete ${employeeName}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.employee.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'The Employee ${employeeName} is deleted successfully.',
          timer: 2000, // Time is 2seconds as mentioned in the assignment requirement
        });

      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'Not Deleted',
          timer: 2000, // Time is 2seconds as mentioned in the assignment requirement
        });
      }
    });
  }
  

}

