CREATE DATABASE leaguemgmt;

CREATE TABLE admin_users (
    admin_email VARCHAR (255) PRIMARY KEY,
    hashed_password VARCHAR(255));

INSERT INTO admin_users  (admin_email, hashed_password) VALUES($1, $2)
INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ('WOMENS DOUBLES', '2023-08-01', '2023-08-15', '2023-08-29');


CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    league_name VARCHAR(40),
    starting_date VARCHAR(10),
    midway_point VARCHAR(10),
    end_date VARCHAR(10),
    isFinished BOOLEAN DEFAULT false
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    player_firstname VARCHAR(40),
    player_lastname VARCHAR(40),
    player_phonenumber VARCHAR(14),
    player_email VARCHAR(40));

CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    player1_id INTEGER REFERENCES players(player_id),
    player2_id INTEGER REFERENCES players(player_id), 
    CHECK (player1_id <> player2_id)
);

-- Create a functional index for the unique constraint
-- Preventing duplicated teams in different order
CREATE UNIQUE INDEX unique_player_order_idx ON teams (LEAST(player1_id, player2_id), GREATEST(player1_id, player2_id));

CREATE TABLE events (
    league_id INTEGER REFERENCES leagues(id),
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(40),
    -- participating_teams INTEGER[]
    );

CREATE TABLE event_teams (
    event_id INTEGER REFERENCES events(event_id),
    team_id INTEGER REFERENCES teams(team_id),
    PRIMARY KEY (event_id, team_id));

/* CREATE TABLE teams (
    event_id INTEGER REFERENCES events(event_id)
    team_id SERIAL PRIMARY KEY,
    player1_fullname VARCHAR(40),
    player2_fullname VARCHAR (40),
    players_emails integer ARRAY[2],
    players_phonenumbers integer ARRAY[2],
); */


CREATE TABLE matches (
    event_id INTEGER REFERENCES events(event_id),
    match_id SERIAL PRIMARY KEY,
    team1_id INTEGER REFERENCES teams(team_id),
    team2_id INTEGER REFERENCES teams(team_id),
    isFinished BOOLEAN,
    withdrawal BOOLEAN,
    match_date DATE,
    winner_id INTEGER REFERENCES teams(team_id),
    winner_score VARCHAR(40),
    points INTEGER);

INSERT INTO matches (event_id, team1_id, team2_id) VALUES ($1, $2, $3)



DROP TABLE named;

('SELECT * FROM leagues WHERE user_email = $1', [user_email])

ALTER TABLE players
ALTER COLUMN player_phonenumber TYPE VARCHAR(14);


SELECT e.event_id, e.event_name, e.participating_teams
FROM events e
JOIN leagues l ON e.league_id = l.id
WHERE l.id = 1;