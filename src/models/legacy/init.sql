-- Enums
CREATE TYPE subscription_status AS ENUM ('Active', 'Inactive', 'Suspended', 'Canceled');
CREATE TYPE visibility_type AS ENUM ('Public', 'Private');

-- Tables
CREATE TABLE account (
  id SERIAL PRIMARY KEY,

  full_name VARCHAR(100) NOT NULL,
  nickname VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,

  is_verified BOOLEAN DEFAULT FALSE,
  picture VARCHAR(400),
  bio TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE account_settings (
  id SERIAL PRIMARY KEY,

  language VARCHAR(50) DEFAULT 'EN',
  country VARCHAR(50) DEFAULT 'US',
  theme VARCHAR(100) DEFAULT 'Default',

  account_id INT REFERENCES account (id) ON DELETE CASCADE
);

CREATE TABLE subscription_plan (
  id SERIAL PRIMARY KEY,

  title VARCHAR(100) NOT NULL UNIQUE,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE subscription (
  id SERIAL PRIMARY KEY,

  last_paid DATE DEFAULT CURRENT_DATE,
  status subscription_status DEFAULT 'Active',

  subscription_plan_id INT REFERENCES subscription_plan (id) ON DELETE CASCADE,
  account_id INT REFERENCES account (id) ON DELETE CASCADE
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,

  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE project (
  id SERIAL PRIMARY KEY,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  owner_account_id INT REFERENCES account (id) ON DELETE CASCADE
);

CREATE TABLE project_settings (
  id SERIAL PRIMARY KEY,

  visibility visibility_type DEFAULT 'Private',

  project_id INT UNIQUE REFERENCES project (id) ON DELETE CASCADE
);

CREATE TABLE shared_project (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  role_id INT REFERENCES role (id),
  account_id INT REFERENCES account (id) ON DELETE CASCADE,
  project_id INT REFERENCES project (id) ON DELETE CASCADE,

  UNIQUE (account_id, project_id)
);

CREATE TABLE module (
  id SERIAL PRIMARY KEY,

  title VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE page (
  id SERIAL PRIMARY KEY,

  title VARCHAR(100) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  position FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  parent_page_id INT REFERENCES page (id) ON DELETE CASCADE,
  project_id INT REFERENCES project (id) ON DELETE CASCADE,
  module_id INT REFERENCES module (id),

  UNIQUE(project_id, parent_page_id, position)
);

-- Note page type
CREATE TABLE note_page_data (
  page_id INT PRIMARY KEY REFERENCES page (id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note_node (
  id SERIAL PRIMARY KEY,

  content TEXT,
  metadata TEXT,
  type VARCHAR(100) NOT NULL,

  next_id INT REFERENCES note_node (id) ON DELETE SET NULL,
  page_id INT REFERENCES note_page_data (page_id) ON DELETE CASCADE
);

CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,

  email VARCHAR(200) NOT NULL,
  commentary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rating INT CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE tool (
  id SERIAL PRIMARY KEY,

  title VARCHAR(50) UNIQUE,
  description VARCHAR(500),
  endpoint VARCHAR(200) NOT NULL
);

-- Functions
CREATE OR REPLACE FUNCTION get_child(parent_id INT)
RETURNS JSONB
LANGUAGE SQL 
AS $$
  SELECT COALESCE(
    JSONB_AGG(
      JSONB_BUILD_OBJECT(
        'id', child_page.id,
        'emoji', child_page.emoji,
        'title', child_page.title,
        'description', child_page.description,
        'position', child_page.position,
        'child_pages', get_child(child_page.id)
      )
      ORDER BY child_page.position, child_page.id
    ), '[]'::JSONB
  )
  FROM page AS child_page
  WHERE child_page.parent_page_id = parent_id;
$$;

CREATE OR REPLACE FUNCTION insert_node()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO note_node (content, next_id, type, page_id) 
  VALUES (' ', NULL, 'paragraph', NEW.page_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_insert_node
AFTER INSERT ON note_page_data
FOR EACH ROW
EXECUTE FUNCTION insert_node();
