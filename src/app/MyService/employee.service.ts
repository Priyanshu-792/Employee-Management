import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../MyModels/employee.model';

@Injectable({
  providedIn: 'root' // Injectable decorator provided in root
})
// Array to store employee data
export class EmployeeService {
  employees: Employee[] = [];
  constructor() { }



// methods to add and update a new employee to the array
  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }
  updateEmployee(employeeId: string, updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.employeeId === employeeId);

     // If employee found then update then allow updating the employee details
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

   // Method to retrieve an employee by ID
  getEmployeeById(employeeId: string): Employee | undefined{
    return this.employees.find(emp => emp.employeeId === employeeId);
  }
}
