INSERT INTO departments (id, department)
VALUES (1, "Engineering"),
        (2, "Weapons"),
        (3, "Navigation"),
        (4, "Supply"),
        (5, "Executive");

INSERT INTO roles (id, department_id, title, salary)
VALUES (1,1, "Eng Dep LPO", 50000),
        (2,1,"Eng Dep LCPO", 60000),
        (3,1,"Eng Dep DIVO", 70000),

        (4,2, "Weapons Dep LPO", 50000),
        (5,2,"Weapons Dep LCPO", 60000),
        (6,2,"Weapons Dep DIVO", 70000),


        (7,3, "Navigation Dep LPO", 50000),
        (8,3,"Navigation Dep LCPO", 60000),
        (9,2,"AOPS/COMMO", 70000),

        (10,4, "CHOP", 80000),
        (11,4, "Leading LS", 60000),

        (12,5, "Lead YMN", 60000),
        (13,5,"YMN", 40000);

INSERT INTO employees (id, role_id, first_name, last_name, manager_id)
VALUES (1,1,"Rosie","Cotten",null),
        (2,2,"Hamfast","Gamgee",1),
        (3,3,"Otho","Sackville-Baggins",1),
        (4,4,"Josh","Homer",1),
        (5,5,"Jack","Torrence",1),
        (6,6,"Bilbo","Baggins",1),
        (7,7,"Frodo","Baggins",1),
        (8,8,"Samwise","Gamgee",1),
        (9,9,"Merry","Brandybuck",1),
        (10,10,"Pippin","Took",1),
        (11, 11, "Fatty", "Lumpkin",1),
        (12, 12, "Carl", "Cotten",1),
        (13,13, "Daisy", "Gardner",1);
        


