INSERT INTO departments (name)
VALUES ("BTS"),
       ("Fandoms"),
       ("HYBE Team"),
       ("Seventeen");

INSERT INTO roles (title, salary, department_id)
VALUES ("RM", 19940912, 1), 
       ("SUGA", 19930309, 1), 
       ("j-hope", 19940218, 1),
       ("Jin", 19921204, 1),
       ("Jimin", 19951013, 1),
       ("V", 19951230, 1),
       ("Jungkook", 19970901, 1),
       ("CEO", 99999999, 3),
       ("Choreographer", 11111111, 3), 
       ("Manager", 11111111, 3), 
       ("Producer", 11111111, 3), 
       ("ARMY", 20130709, 2), 
       ("Leader", 19950808, 4),
       ("Hip-Hop Team", 20130526, 4),
       ("Vocal Team", 20130526, 4),
       ("Performance Team", 20130526, 4),
       ("Carat", 20130709, 2);               

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Namjoon", "Kim", 1, NULL),
       ("Yoongi", "Min", 2, 1),
       ("Hoseok", "Jung", 3, 1),
       ("Seokjin", "Kim", 4, 1),
       ("Jimin", "Park", 5, 1),
       ("Taehyung", "Kim", 6, 1),
       ("Jungkook", "Jeon", 7, 1), 
       ("Sihyuk", "Bang", 8, NULL),
       ("Sungdeuk", "Son", 9, 8),
       ("Sejin", "Kim", 10, 8),
       ("Hobeom", "Song", 10, 8),
       ("Hyowon (Pdogg)", "Kang", 11, 8),
       ("Dohyeong (Slow Rabbit)", "Kwon", 11, 8),
       ("Soohyun (Adora)", "Park", 11, 8),
       ("Donghyuk (Supreme Boi)", "Shin", 11, 8),
       ("Yijeong (El Capitxn)", "Jang", 11, 8),
       ("Becca", "Lee", 12, 2),
       ("Minji", "Kim", 12, 1),
       ("Karen", "Seo", 12, 5),
       ("Janice", "Chung", 12, 7),
       ("Jessica", "Choi", 12, 3),
       ("Sojung", "Kim", 12, 4),
       ("Seungcheol", "Choi", 13, NULL), 
       ("Jeonghan", "Yoon", 15, 23),
       ("Joshua", "Hong", 15, 23),
       ("Junhui", "Moon", 16, 23),
       ("Soonyoung", "Kwon", 16, 23),
       ("Wonwoo", "Jeon", 14, 23),
       ("Jihoon", "Lee", 15, 23),
       ("Seokmin", "Lee", 15, 23),
       ("Mingyu", "Kim", 14, 23),
       ("Myungho", "Seo", 16, 23),
       ("Seungkwan", "Boo", 15, 23),
       ("Vernon", "Choi", 14, 23),
       ("Chan", "Lee", 16, 23),
       ("Kaitlyn", "Lee", 17, 35); 


       

       
    

