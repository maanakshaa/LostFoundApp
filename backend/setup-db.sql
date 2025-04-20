CREATE TABLE IF NOT EXISTS lost_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  last_seen_location TEXT,
  date_lost TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS found_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  found_location TEXT NOT NULL,
  date_found TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
