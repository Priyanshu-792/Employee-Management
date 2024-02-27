# Employee Management Application

## Overview
This application provides functionality to manage employees. Users can add, edit, and delete employee records.

## Functionality
- **Add Employee**: Allows users to add a new employee with details such as name, contact number, email, gender, and skills.
- **Edit Employee**: Allows users to edit existing employee details.
- **Delete Employee**: Allows users to delete an employee after confirmation.
- **Employee List**: Displays a list of all employees with options to edit or delete each employee.

## Routing
The application has three routes:
1. **Employee List**: Route displaying all employee records.
2. **Employee Add**: Route for adding a new employee.
3. **Employee Edit**: Route for editing an existing employee.

## Components and Pages
### Employee List Page
- Displays a table with all employee records.
- Provides options to edit or delete each employee.
- Contains a button to add a new employee.

### Employee Add/Edit Page
- Form for adding or editing employee details.
- Fields include employee name, ID, contact number, email, gender (radio button), and skills (dynamic fields with add and delete options).

## Variables and Models
- **Employee Model**: Represents the structure of an employee record, including name, ID, contact number, email, gender, and skills.
- **Skill Model**: Represents a skill, including the skill name and experience level.

## File Structure
