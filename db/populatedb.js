const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) UNIQUE
);

CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) UNIQUE
);

CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) UNIQUE
);
  
CREATE TABLE IF NOT EXISTS game_genres (
    game_name VARCHAR ( 255 ),
    genre_name VARCHAR ( 255 ),
    FOREIGN KEY (game_name) REFERENCES games(name),
    FOREIGN KEY (genre_name) REFERENCES genres(name),
    CONSTRAINT game_genres_id PRIMARY KEY (game_name, genre_name)
);

CREATE TABLE IF NOT EXISTS game_developers (
  game_name VARCHAR ( 255 ),
  developer_name VARCHAR ( 255 ),
  FOREIGN KEY (game_name) REFERENCES games(name),
  FOREIGN KEY (developer_name) REFERENCES developers(name),
  CONSTRAINT game_developers_id PRIMARY KEY (game_name, developer_name)
);
  

INSERT INTO games (name) 
  VALUES
  ('Batman Arkham Asylum'),
  ('Hellblade Senuas Sacrifice'),
  ('God Of War');

INSERT INTO genres (name) 
  VALUES
  ('Action'),
  ('Adventure'),
  ('Horror');


INSERT INTO developers (name) 
  VALUES
  ('Mark Hamil'),
  ('Hideo Kojima'),
  ('Cory Barlog');

INSERT INTO game_genres (game_name, genre_name) 
  VALUES
  ('Batman Arkham Asylum', 'Action'),
  ('Hellblade Senuas Sacrifice', 'Horror'),
  ('God Of War', 'Adventure'),
  ('Batman Arkham Asylum', 'Horror');

INSERT INTO game_developers (game_name, developer_name) 
  VALUES
  ('Batman Arkham Asylum', 'Mark Hamil'),
  ('Hellblade Senuas Sacrifice', 'Hideo Kojima'),
  ('God Of War', 'Cory Barlog'),
  ('Batman Arkham Asylum', 'Hideo Kojima');
`;

async function main() {
  console.log("seeding...");
  const connectionString = process.env.DATABASE_URL;
  const client = new Client(connectionString || {
    host: process.env.HOST || "localhost",
    user: process.env.USER || "postgres",
    database: process.env.DB || "inventory",
    password: process.env.PASSWORD || "postgres",
    port: process.env.PORT || 5432
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();