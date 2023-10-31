INSERT INTO departments (name)
VALUES ("Rap Line"),
       ("Vocal Line");

INSERT INTO roles (title, salary, department_id)
VALUES ("Koya", 19940912, 1),
       ("Shooky", 19930309, 1), 
       ("Mang", 19940218, 1),
       ("RJ", 19921204, 2),
       ("Chimmy", 19951013, 2),
       ("Tata", 19951230, 2),
       ("Kooky", 19970901, 2);              

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Namjoon", "Kim", 1, NULL),
       ("Yoongi", "Min", 2, 1),
       ("Hoseok", "Jung", 3, 1),
       ("Seokjin", "Kim", 4, NULL),
       ("Jimin", "Park", 5, 4),
       ("Taehyung", "Kim", 6, 4),
       ("Jungkook", "Jeon", 7, 4); 
       
    

