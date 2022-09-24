# Project 3 - Salon appointment scheduler

### My steps for the completition of this project
#### Log into PSQL
~~~ bash
psql --username=freecodecamp --dbname=postgres
~~~

#### 1- YYou should create a database named salon
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
~~~ sql
DROP TABLE customers;
DROP TABLE appointments;
DROP TABLE services;
CREATE TABLE teams(team_id SERIAL PRIMARY KEY);
ALTER TABLE teams ADD COLUMN name VARCHAR(50) UNIQUE NOT NULL;
~~~

#### 4- Your games table should have a game_id column that is a type of SERIAL and is the primary key, a year column of type INT, and a round column of type VARCHAR
~~~ sql
CREATE TABLE games(game_id SERIAL PRIMARY KEY);
ALTER TABLE games ADD COLUMN round VARCHAR(50) NOT NULL;
ALTER TABLE games ADD COLUMN year INT NOT NULL;
~~~

#### 5- Your games table should have winner_id and opponent_id foreign key columns that each reference team_id from the teams table
~~~ sql
ALTER TABLE games ADD COLUMN winner_id INT REFERENCES teams(team_id);
ALTER TABLE games ADD COLUMN opponent_id INT REFERENCES teams(team_id);
~~~

#### 6- Your games table should have winner_goals and opponent_goals columns that are type INT
~~~ sql
ALTER TABLE games ADD COLUMN winner_goals INT NOT NULL;
ALTER TABLE games ADD COLUMN opponent_goals INT NOT NULL;
~~~

#### 7- All of your columns should have the NOT NULL constraint
~~~ sql
ALTER TABLE games ALTER COLUMN winner_id SET NOT NULL;
ALTER TABLE games ALTER COLUMN opponent_id SET NOT NULL;
~~~

#### 8- Your two script (.sh) files should have executable permissions. Other tests involving these two files will fail until permissions are correct. When these permissions are enabled, the tests will take significantly longer to run
~~~ bash
chmod +x queries.sh
chmod +x insert_data.sh
~~~

#### 9 && 10- Instructions 9/10 in /submit/insert_data.sh
Check [insert_data.sh](https://github.com/AitorSantaeugenia/freecodecamp-projects/blob/main/relational_database_(beta)/Project_2_World_cup_database/submit/insert_data.sh)

#### 11- Instruction 11 in /submit/queries.sh
Check [queries.sh](https://github.com/AitorSantaeugenia/freecodecamp-projects/blob/main/relational_database_(beta)/Project_2_World_cup_database/submit/queries.sh)
