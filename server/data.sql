CREATE DATABASE leaguesdata;

CREATE TABLE admin_users (
    admin_email VARCHAR (255) PRIMARY KEY,
    hashed_password VARCHAR(255));

INSERT INTO admin_users  (admin_email, hashed_password) VALUES($1, $2)

CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    league_name VARCHAR(40),
    starting_date VARCHAR(10),
    midway_point VARCHAR(10),
    end_date VARCHAR(10),
    league_events text ARRAY,
    isFinished BOOLEAN
);

INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ('WOMENS DOUBLES', '2023-08-01', '2023-08-15', '2023-08-29');


CREATE TABLE events (
    id VARCHAR (255) PRIMARY KEY,
    event_name VARCHAR(40),
    participating_teams 
);

CREATE TABLE teams (
    id VARCHAR (255) PRIMARY KEY,
    player1_fullname VARCHAR(40),
    player2_fullname VARCHAR (40),
    players_emails integer ARRAY[2],
    players_phonenumbers integer ARRAY[2],
);


CREATE TABLE players (
    player_email VARCHAR(255) PRIMARY KEY,
    player_firstname VARCHAR(40),
    player_lastname VARCHAR(40),
    player_phonenumber INT,
);


DROP TABLE named;

('SELECT * FROM leagues WHERE user_email = $1', [user_email])


