const express = require('express');
const app = express();
const port = 888;

app.use(express.json());

// Sample data (replace with your data storage solution)

let employees = [
    {id : 492, name: "Dharam"},
    {id: 1158, name: "Shubham"},
    {id: 1169, name: "Ajinkya"},
];

//Get all employees

app.get('/rest/employees', (req, res) => {
    res.json(employees);
});

//Get specific employee

app.get('/rest/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employee = employees.find((employee) => employee.id === employeeId);

    if(!employee){
        return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
});

//Add an employee

app.post('/rest/employees', (req, res) => {
    const { id, name } = req.body;

    // Check if an employee with the same ID already exists
    const existingEmployee = employees.find((employee) => employee.id === id);
    if (existingEmployee) {
        return res.status(400).json({ error: "Employee with this ID already exists" });
    }

    const newEmployee = { id, name };
    employees.push(newEmployee);

    res.status(201).json(newEmployee);
});

//Update an existing employee

app.put('/rest/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex((employee => employee.id === employeeId));

    if(employeeIndex === -1){
        return res.status(404).json({error: "Employee not found"});
    }

    employees[employeeIndex] = {...employees[employeeIndex], ...req.body};

    res.json(employees[employeeIndex]);
});

app.delete('/rest/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    employees = employees.filter((employee) => employee.id !== employeeId);
    res.json({message: "Employee deleted successfully"});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});