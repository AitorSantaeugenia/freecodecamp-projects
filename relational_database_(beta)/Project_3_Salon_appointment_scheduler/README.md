# Project 3 - Salon appointment scheduler

### My steps for the completition of this project
#### Log into PSQL
~~~ bash
psql --username=freecodecamp --dbname=postgres
~~~

#### 1- You should create a database named salon
~~~ sql
CREATE DATABASE salon;
~~~

#### 2- You should connect to your database, then create tables named customers, appointments, and services
~~~ bash
\c salon
~~~

~~~ sql
CREATE TABLE customers();
CREATE TABLE appointments();
CREATE TABLE services();
~~~

#### 3- Each table should have a primary key column that automatically increments
#### &&
#### 4- Your games table should have a game_id column that is a type of SERIAL and is the primary key, a year column of type INT, and a round column of type VARCHAR
~~~ sql
DROP TABLE customers;
DROP TABLE appointments;
DROP TABLE services;
CREATE TABLE customers(cutomer_id SERIAL PRIMARY KEY);
CREATE TABLE appointments(appointment_id SERIAL PRIMARY KEY);
CREATE TABLE services(service_id SERIAL PRIMARY KEY);
~~~

#### 5- Your appointments table should have a customer_id foreign key that references the customer_id column from the customers table
~~~ sql
ALTER TABLE appointments ADD COLUMN customer_id INT REFERENCES customers(cutomer_id);
~~~

#### 6- Your appointments table should have a service_id foreign key that references the service_id column from the services table
~~~ sql
ALTER TABLE appointments ADD COLUMN service_id INT REFERENCES services(service_id);
~~~

#### 7- Your customers table should have phone that is a VARCHAR and must be unique
~~~ sql
ALTER TABLE customers ADD COLUMN phone VARCHAR(10) UNIQUE;
~~~

#### 8- Your customers and services tables should have a name column
~~~ sql
 ALTER TABLE customers ADD COLUMN name VARCHAR(20);
 ALTER TABLE services ADD COLUMN name VARCHAR(20);
~~~

#### 9- Your appointments table should have a time column that is a VARCHAR
~~~ sql
ALTER TABLE appointments ADD COLUMN time VARCHAR(10);
~~~

#### 10- You should have at least three rows in your services table for the different services you offer, one with a service_id of 1
~~~ sql
INSERT INTO services(name) VALUES('cut'),('color'),('perm'),('style'),('trim');
SELECT * FROM services;
 service_id | name  
------------+-------
          1 | cut
          2 | color
          3 | perm
          4 | style
          5 | trim
~~~

#### 11- You should create a script file named salon.sh in the project folder
<code>In bash console</code>

~~~ bash
touch salon.sh
~~~

#### 12- Your script file should have a “shebang” that uses bash when the file is executed (use #! /bin/bash)
~~~ bash
### add the shebang in the top of the script
#! /bin/bash
~~~

#### 13- Your script file should have executable permissions
~~~ bash
chmod +x salon.sh 
~~~

## These instructions are for creating the script
~~~bash
#### 14- You should not use the clear command in your script

#### 15- You should display a numbered list of the services you offer before the first prompt for input, each with the format #) < service >. For example, 1) cut, where 1 is the service_id

#### 16- If you pick a service that doesn't exist, you should be shown the same list of services again

#### 17- Your script should prompt users to enter a service_id, phone number, a name if they aren’t already a customer, and a time. You should use read to read these inputs into variables named SERVICE_ID_SELECTED, CUSTOMER_PHONE, CUSTOMER_NAME, and SERVICE_TIME

#### 18- If a phone number entered doesn’t exist, you should get the customers name and enter it, and the phone number, into the customers table

#### 19- You can create a row in the appointments table by running your script and entering 1, 555-555-5555, Fabio, 10:30 at each request for input if that phone number isn’t in the customers table. The row should have the customer_id for that customer, and the service_id for the service entered

#### 20- You can create another row in the appointments table by running your script and entering 2, 555-555-5555, 11am at each request for input if that phone number is already in the customers table. The row should have the customer_id for that customer, and the service_id for the service entered

#### 21- After an appointment is successfully added, you should output the message I have put you down for a < service > at < time >, < name> . For example, if the user chooses cut as the service, 10:30 is entered for the time, and their name is Fabio in the database the output would be I have put you down for a cut at 10:30, Fabio. Make sure your script finishes running after completing any of the tasks above, or else the tests won't pass
~~~

### You can check the script with all these instructions, [here](https://github.com/AitorSantaeugenia/freecodecamp-projects/blob/main/relational_database_(beta)/Project_2_World_cup_database/submit/insert_data.sh)