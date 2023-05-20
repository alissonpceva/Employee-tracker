-- Inserts names of departments into department table
INSERT INTO department  (name)
VALUES  ('Sales')
        ('Engineering')
        ('Finance')
        ('Legal')

-- Inserts roles of employee into role table
INSERT INTO role (title, salary, dept_id)
VALUES ('Sales Lead',10000,1)
        ('Sales Person',80000,2)   
        ('Lead Engineer',150000,3)   
        ('Software Engineer',120000,4)
        ('Account Manager',160000,5)   
        ('Accountant',125000,6)   
        ('Legal Team Lead',250000,7)
        ('LAwyer',190000,8)

-- Inserts employee information into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John','Doe',1,)
        ('Mike','Chan',2,1)
        ('Ashley','Rodriguez',3,)
        ('Kevin','Tupik',4,3)
        ('Kunal','Singh',5,)
        ('Malia','Brown',6,5)
        ('Sarah','Lourd',7,)
        ('Tom','Allen',8,7)
