CREATE DATABASE mamarecipe;

CREATE TABLE users(
  id_user UUID primary key,
  name varchar(100),
  email varchar(100),
  password text,
  phone varchar(50),
  profile_pic text
);

CREATE TABLE recipe(
  id_recipe UUID primary key,
  iduser UUID references users(id_user) on delete cascade,
  image text,
  ingredients text,
  video text,
  title text
);

CREATE TABLE comments(
  id_comment serial primary key,
  userid UUID references users(id_user) on delete cascade,
  recipeid UUID references recipe(id_recipe) on delete cascade,
  comments_body text
);
