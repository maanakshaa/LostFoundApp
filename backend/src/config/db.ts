import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export default open({
  filename: path.join(__dirname, '../../data/database.db'),
  driver: sqlite3.Database
});
