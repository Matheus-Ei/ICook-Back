CREATE TABLE users (
  id SERIAL PRIMARY KEY,

  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,

  picture_base64 TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,

  title VARCHAR(100) NOT NULL,
  description TEXT,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,

  owner_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_images (
  id SERIAL PRIMARY KEY,

  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  image_base64 TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_comments (
  id SERIAL PRIMARY KEY,

  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_rates (
  id SERIAL PRIMARY KEY,

  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rate INTEGER CHECK (rate >= 1 AND rate <= 5) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(recipe_id, user_id)
);

CREATE TABLE user_saved_recipes (
  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, recipe_id)
);

CREATE TABLE user_follows (
  id SERIAL PRIMARY KEY,

  follower_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  followed_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(follower_user_id, followed_user_id)
);
