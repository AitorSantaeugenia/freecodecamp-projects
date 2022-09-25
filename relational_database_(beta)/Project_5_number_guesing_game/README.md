# Project 5 - Number Guesing Game

### My steps for the completition of this project

#### 1- Create a number_guessing_game folder in the project folder for your program
~~~ bash
mkdir number_guessing_game
~~~

#### 2- Create number_guess.sh in your number_guessing_game folder and give it executable permissions
~~~ bash
touch number_guess.sh
chmod +x number_guess.sh
~~~

#### 3- Your script should have a shebang at the top of the file that uses #!/bin/bash
~~~ bash
## add the shebang in the top of the script (frist line)
#!/bin/bash
~~~

#### 4- Turn the number_guessing_game folder into a git repository
~~~ sql
git init
~~~

#### 5- Your git repository should have at least five commits
~~~ sql
ALTER TABLE elements ALTER COLUMN symbol SET NOT NULL;
ALTER TABLE elements ALTER COLUMN name SET NOT NULL;
~~~

<code>Here we create a database named number_guess</code>

~~~ sql
CREATE DATABASE number_guess;
\c number_guess
CREATE TABLE users(user_id SERIAL PRIMARY KEY);
ALTER TABLE users ADD COLUMN username VARCHAR(20) NOT NULL UNIQUE;

CREATE TABLE games(game_id SERIAL PRIMARY KEY);
-- we fucked with the name, so rename
ALTER TABLE games RENAME COLUMN column_guesses TO guesses;
ALTER TABLE games ADD COLUMN user_id INT REFERENCES users(user_id);
~~~

<code>Check the code of the script for these tasks</code>

#### 6- Your script should randomly generate a number that users have to guess
#### 7- When you run your script, you should prompt the user for a username with Enter your username:, and take a username as input. Your database should allow usernames of at least 22 characters
#### 8- If that username has been used before, it should print Welcome back, < username >! You have played < games_played > games, and your best game took < best_game > guesses., with < username > being a users name from the database, < games_played > being the total number of games that user has played, and < best_game > being the fewest number of guesses it took that user to win the game
#### 9- If the username has not been used before, you should print Welcome, <username>! It looks like this is your first time here.
#### 10- The next line printed should be Guess the secret number between 1 and 1000: and input from the user should be read
#### 11- Until they guess the secret number, it should print It's lower than that, guess again: if the previous input was higher than the secret number, and It's higher than that, guess again: if the previous input was lower than the secret number. Asking for input each time until they input the secret number.
#### 12- If anything other than an integer is input as a guess, it should print That is not an integer, guess again:
#### 13- When the secret number is guessed, your script should print You guessed it in <number_of_guesses> tries. The secret number was <secret_number>. Nice job!

<code>---</code>

#### 14- The message for the first commit should be Initial commit
#### &&
#### 15- The rest of the commit messages should start with fix:, feat:, refactor:, chore:, or test:
~~~ bash
git commit -m "Initial commit"

## we can see all the comits done git git log --oneline
1ef9a07 (HEAD -> main) feat: added username features again
a3faae5 fix: changed the variable 24879 to  cos 30843 is a bash word
4465516 feat: random number guesser done
003c59b feat: show message if user exist or is created
1a02996 (master) feat: added the connection to the database for the script
e6cc3a9 Initial commit
~~~

### 16- You should finish your project while on the main branch, your working tree should be clean, and you should not have any uncommitted changes
~~~ bash
### if anything:
git checkout main
git merge master

### but it was not needed this time
~~~

### You can check the script with all these instructions, [here](https://github.com/AitorSantaeugenia/freecodecamp-projects/tree/main/relational_database_(beta)/Project_5_number_guesing_game/submit)



