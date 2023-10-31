INSERT INTO departments (name)
VALUES ("rap line"),
       ("vocal line");

INSERT INTO roles (title, salary, department_id)
VALUES ("koya", 19940912, 1),
       ("shooky", 19930309, 1), 
       ("mang", 19940218, 1),
       ("rj", 19921204, 2),
       ("chimmy", 19951013, 2),
       ("tata", 19951230, 2),
       ("kooky", 19970901, 2);              

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("namjoon", "kim", 1, NULL),
       ("yoongi", "min", 2, 1),
       ("hoseok", "jung", 3, 1),
       ("seokjin", "kim", 4, NULL),
       ("jimin", "park", 5, 4),
       ("taehyung", "kim", 6, 4),
       ("jungkook", "jeon", 7, 4); 
       
    

