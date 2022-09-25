# Project 4 - Periodic table database

### My steps for the completition of this project
#### Log into PSQL
~~~ bash
psql --username=freecodecamp --dbname=postgres
~~~

<code>Connect to the database</code>

~~~ sql
\c periodic_table
~~~

<code>Check the structure of the database</code>

~~~ sql
             List of relations
 Schema |    Name    | Type  |    Owner     
--------+------------+-------+--------------
 public | elements   | table | freecodecamp
 public | properties | table | freecodecamp
(2 rows)
~~~

~~~ sql
Table "public.elements"
    Column     |         Type          | Collation | Nullable | Default 
---------------+-----------------------+-----------+----------+---------
 atomic_number | integer               |           | not null | 
 symbol        | character varying(2)  |           |          | 
 name          | character varying(40) |           |          | 
Indexes:
    "elements_pkey" PRIMARY KEY, btree (atomic_number)
    "elements_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)
~~~

~~~ sql
 Table "public.properties"
    Column     |         Type          | Collation | Nullable | Default 
---------------+-----------------------+-----------+----------+---------
 atomic_number | integer               |           | not null | 
 type          | character varying(30) |           |          | 
 weight        | numeric(9,6)          |           | not null | 
 melting_point | numeric               |           |          | 
 boiling_point | numeric               |           |          | 
Indexes:
    "properties_pkey" PRIMARY KEY, btree (atomic_number)
    "properties_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)
~~~

#### 1- You should rename the weight column to atomic_mass
~~~ sql
ALTER TABLE properties RENAME weight TO atomic_mass;
~~~

#### 2- You should rename the melting_point column to melting_point_celsius and the boiling_point column to boiling_point_celsius
~~~ sql
ALTER TABLE properties RENAME melting_point TO melting_point_celsius;
ALTER TABLE properties RENAME boiling_point TO boiling_point_celsius;
~~~

#### 3- Your melting_point_celsius and boiling_point_celsius columns should not accept null values
~~~ sql
ALTER TABLE properties ALTER COLUMN melting_point_celsius SET NOT NULL;
ALTER TABLE properties ALTER COLUMN boiling_point_celsius SET NOT NULL;
~~~

#### 4- You should add the UNIQUE constraint to the symbol and name columns from the elements table
~~~ sql
ALTER TABLE elements ADD UNIQUE(symbol);
ALTER TABLE elements ADD UNIQUE(name);
~~~

#### 5- Your symbol and name columns should have the NOT NULL constraint
~~~ sql
ALTER TABLE elements ALTER COLUMN symbol SET NOT NULL;
ALTER TABLE elements ALTER COLUMN name SET NOT NULL;
~~~

#### 6- You should set the atomic_number column from the properties table as a foreign key that references the column of the same name in the elements table
~~~ sql
ALTER TABLE properties ADD FOREIGN KEY(atomic_number) REFERENCES elements(atomic_number);
~~~

#### 7- You should create a types table that will store the three types of elements
~~~ sql
CREATE TABLE types(type_id SERIAL NOT NULL);
~~~

#### 8- Your types table should have a type_id column that is an integer and the primary key
~~~ sql
ALTER TABLE types ADD PRIMARY KEY(type_id);
~~~

#### 9- Your types table should have a type column that's a VARCHAR and cannot be null. It will store the different types from the type column in the properties table
~~~ sql
ALTER TABLE types ADD COLUMN type VARCHAR(20) NOT NULL;
~~~

#### 10- You should add three rows to your types table whose values are the three different types from the properties table
~~~ sql
INSERT INTO types(type) VALUES('nonmetal'),('metal'),('metalloid');
~~~

#### 11- Your properties table should have a type_id foreign key column that references the type_id column from the types table. It should be an INT with the NOT NULL constraint
#### &&
#### 12- Each row in your properties table should have a type_id value that links to the correct type from the types table
~~~ sql
ALTER TABLE types ADD PRIMARY KEY(type_id);
ALTER TABLE properties ADD COLUMN type_id INT REFERENCES types(type_id);
UPDATE properties SET type_id =1 WHERE type='nonmetal';
UPDATE properties SET type_id =2 WHERE type='metal';
UPDATE properties SET type_id =3 WHERE type='metalloid';
ALTER TABLE properties ALTER COLUMN type_id SET NOT NULL;
~~~

#### 13- You should capitalize the first letter of all the symbol values in the elements table. Be careful to only capitalize the letter and not change any others
~~~ sql
UPDATE elements SET symbol='He' WHERE symbol='he';
UPDATE elements SET symbol='Li' WHERE symbol='li';
UPDATE elements SET symbol='Mt' WHERE symbol='mT';
~~~

#### 14- You should remove all the trailing zeros after the decimals from each row of the atomic_mass column. You may need to adjust a data type to DECIMAL for this. Be careful not to change the value
~~~ sql
ALTER TABLE properties ALTER COLUMN atomic_mass TYPE real;
~~~

### 15- You should add the element with atomic number 9 to your database. Its name is Fluorine, symbol is F, mass is 18.998, melting point is -220, boiling point is -188.1, and it's a nonmetal
### &&
### 16- You should add the element with atomic number 10 to your database. Its name is Neon, symbol is Ne, mass is 20.18, melting point is -248.6, boiling point is -246.1, and it's a nonmetal
~~~ sql
INSERT INTO elements (atomic_number, symbol, name) VALUES(9, 'F', 'Fluorine');
INSERT INTO elements (atomic_number, symbol, name) VALUES(10, 'Ne', 'Neon');
INSERT INTO properties(atomic_number, typ, atomic_mass, melting_point_celsius, boiling_point_celsius, type_id) VALUES(9, 'nonmetal', 18.998, -220, -188.1, 1);
INSERT INTO properties(atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, type_id) VALUES(10, 'nonmetal', 20.18, -248.6, -246.1, 1);
~~~

### 16- You should create a periodic_table folder in the project folder and turn it into a git repository with git init
~~~ bash
mkdir periodic_table
cd periodic_table
git init
~~~

### 17- Your repository should have a main branch with all your commits
~~~ bash
## We solve this after first commit, that creates master
~~~

### 18- Your periodic_table repo should have at least five commits
~~~ bash
## We solve this while working with the script
~~~

### 19- You should create an element.sh file in your repo folder for the program I want you to make
~~~ bash
touch element.sh
~~~

### 20- Your script (.sh) file should have executable permissions
~~~ bash
chmod +x element.sh
~~~

<code>Check the code of the script for these tasks</code>

### 21- If you run ./element.sh, it should output Please provide an element as an argument. and finish running.
### 22- If you run ./element.sh 1, ./element.sh H, or ./element.sh Hydrogen, it should output The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.
### 23- If you run ./element.sh script with another element as input, you should get the same output but with information associated with the given element.
### 24- If the argument input to your element.sh script doesn't exist as an atomic_number, symbol, or name in the database, the output should be I could not find that element in the database.

<code>---</code>

### 25- The message for the first commit in your repo should be Initial commit
### &&
### 26- The rest of the commit messages should start with fix:, feat:, refactor:, chore:, or test:
~~~ bash
## We can check all the commits below

## Our first commit was file: added element.sh
## so yeah, fun
f0594ea (HEAD -> main, master) feat: script done
55c6360 feat: show message if it's not in the ddbb
f27386b feat: echo if it does not exist
6d68ed8 feat: add shebang and ddbb connection
27ca26c file: added element.sh
~~~

~~~ bash
## and then change the first commit to Initial commit
git rebase --interactive --root

## While playing with it, I changed the last commit we have done (first in order)
## git rebase -i HEAD~1
5bb95c8 (HEAD -> main) test: testing
73c08ea feat: show message if it's not in the ddbb
e5c20ea feat: echo if it does not exist
00f4639 feat: add shebang and ddbb connection
d3b4db4 Initial commit
~~~

### 27- You should delete the non existent element, whose atomic_number is 1000, from the two tables
~~~ sql
DELETE FROM properties WHERE atomic_number=1000;
DELETE FROM elements WHERE atomic_number=1000;
~~~

### 28- Your properties table should not have a type column
~~~ sql
ALTER TABLE properties DROP COLUMN type;
~~~

### 29- You should finish your project while on the main branch. Your working tree should be clean and you should not have any uncommitted changes
~~~ bash
## I was working and commiting to master so:
git checkout main
git merge master
~~~

### You can check the script with all these instructions, [here](https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/relational_database_(beta)/Project_4_Periodic_table_database/submit)