-- Sekce (číselník)
CREATE TABLE sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- Podsekce (číselník)
CREATE TABLE subsections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  FOREIGN KEY (section_id) REFERENCES sections(id)
);

-- Články
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL,
  subsection_id INTEGER,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  date TEXT,
  tags TEXT,
  cover TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES sections(id),
  FOREIGN KEY (subsection_id) REFERENCES subsections(id)
);

-- Fotky (volitelně pro galerie)
CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  url TEXT NOT NULL,
  alt TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
