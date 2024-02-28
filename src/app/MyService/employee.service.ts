import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../MyModels/employee.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Injectable decorator provided in root
})
// Array to store employee data
export class EmployeeService {
  employees: Employee[] = [];
  constructor() { }





 
   // Method to retrieve an employee by ID
   getEmployeeById(employeeId: string): Employee | undefined{
    return this.employees.find(emp => emp.employeeId === employeeId);
  }

  isEmployeeIdExists(employeeId: string): boolean {
    return this.employees.some(emp => emp.employeeId === employeeId);
  }


// methods to add and update a new employee to the array

  addEmployee(employee: Employee): Observable<void> {
    this.employees.push(employee);
    return of(undefined);

  }

  updateEmployee(employeeId: string, updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.employeeId === employeeId);

     // If employee found then update then allow updating the employee details
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }



}
