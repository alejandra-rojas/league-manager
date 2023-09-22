CREATE DATABASE leaguemgmt;

CREATE TABLE admin_users (
    admin_email VARCHAR (255) PRIMARY KEY,
    hashed_password VARCHAR(255));



INSERT INTO admin_users  (admin_email, hashed_password) VALUES('alerojasmal@gmail.com', '$2b$10$GAJMhAmO7U5QcucFZuL29.3UXZPlHBKRVAbInqX2eTiQ/sNYiAQim');



CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    league_name VARCHAR(40),
    starting_date VARCHAR(10),
    midway_point VARCHAR(10),
    end_date VARCHAR(10),
    isFinished BOOLEAN DEFAULT false);

INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ('WOMENS DOUBLES', '2023-08-01', '2023-08-15', '2023-08-29');


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
    CHECK (player1_id <> player2_id));

-- Create a functional index for the unique constraint
-- Preventing duplicated teams in different order
CREATE UNIQUE INDEX unique_player_order_idx ON teams (LEAST(player1_id, player2_id), GREATEST(player1_id, player2_id));

CREATE TABLE events (
    league_id integer REFERENCES leagues(id) ON DELETE CASCADE REFERENCES leagues(id) ON DELETE CASCADE REFERENCES leagues(id) ON DELETE CASCADE,
    event_id SERIAL PRIMARY KEY,
    event_name character varying(40),
    midway_matches integer
);

CREATE TABLE event_teams (
    event_id integer REFERENCES events(event_id) ON DELETE CASCADE,
    team_id integer REFERENCES teams(team_id),
    challenger_bonus integer DEFAULT 0,
    all_bonus integer DEFAULT 0,
    team_withdrawn boolean DEFAULT false,
    mid_bonus integer DEFAULT 0,
    set_points integer DEFAULT 0,
    total_points integer DEFAULT 0,
    CONSTRAINT event_teams_pkey PRIMARY KEY (event_id, team_id)
);

CREATE TABLE matches (
    event_id integer REFERENCES events(event_id) ON DELETE CASCADE,
    match_id SERIAL PRIMARY KEY,
    team1_id integer REFERENCES teams(team_id),
    team2_id integer REFERENCES teams(team_id),
    isfinished boolean DEFAULT false,
    withdrawal boolean DEFAULT false,
    match_date character varying(10) DEFAULT NULL::character varying,
    winner_id integer REFERENCES teams(team_id),
    winner_score character varying(40) DEFAULT '""'::character varying,
    team1_sets integer DEFAULT 0,
    team2_sets integer DEFAULT 0,
    bymidpoint boolean DEFAULT false
);

INSERT INTO matches (event_id, team1_id, team2_id) VALUES ($1, $2, $3)

CREATE TABLE challenger_matches (
    league_id integer REFERENCES leagues(id),
    match_id SERIAL PRIMARY KEY,
    team1_id integer REFERENCES teams(team_id),
    team2_id integer REFERENCES teams(team_id),
    isfinished boolean,
    match_date character varying(10) DEFAULT NULL::character varying,
    winner_id integer REFERENCES teams(team_id),
    winner_score character varying(40),
    team1_bonus integer,
    team2_bonus integer,
    team1_event_id integer REFERENCES events(event_id),
    team2_event_id integer REFERENCES events(event_id)
);


DROP TABLE named;

('SELECT * FROM leagues WHERE user_email = $1', [user_email])

ALTER TABLE players
ALTER COLUMN player_phonenumber TYPE VARCHAR(14);


SELECT e.event_id, e.event_name, e.participating_teams
FROM events e
JOIN leagues l ON e.league_id = l.id
WHERE l.id = 1;