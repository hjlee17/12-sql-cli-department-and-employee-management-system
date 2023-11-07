# 12-SQL-CLI-Department-and-Employee-Tracker
![License badge.](https://img.shields.io/badge/License-MIT-yellow.svg) 

## Description
An application to help business owners view and manage the departments, roles, and employees in their company.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
1. Clone this [repository](https://github.com/hjlee17/12-sql-cli-department-and-employee-management-system.git).

2. Install [MySQL](https://www.mysql.com/downloads/).
3. Run MYSQL using ```mysql -u root -p```.
4. Set up the schema using ```source ./db/schema.sql``` and seed the data using ```source ./db/seed.sql```.

5. Install [Node.js] (https://nodejs.org/).
6. Install the dependencies using the ```npm i``` command. The following packages will be installed:
   - [Inquirer v.8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4)
   - [MySQL2 v.2.2.5](https://www.npmjs.com/package/mysql2/v/2.2.5)
   - [dotenv v.8.2.0](https://www.npmjs.com/package/dotenv/v/8.2.0)

7. In [.env.EXAMPLE](.env.EXAMPLE), fill in the user and password, and save as an .env file (remove .EXAMPLE extension).

## Usage
Invoke the application by using the following command:
```bash
node index.js
``` 
or 
```bash
npm start
``` 
and use the application according to the prompts.  
  
  
[Video Demonstration](https://drive.google.com/file/d/1zB161U1vGJb_15qMaNvRWZThsOOKK_T_/view?usp=sharing/)  


## License
[The MIT License](https://opensource.org/licenses/MIT/)

## Contributing
- W3 Schools
- Stack Overflow
- BootCampSpot


## Questions
- Github: [hjlee17](https://github.com/hjlee17)
