// Import necessary packages
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Table } from '@/app/enum/tables';

// Function to open SQLite database and create tables
export async function openDatabase() {
  // Open database connection
  const db = await open({
    filename: './db/database.sqlite',
    driver: sqlite3.Database,
  });

  // Create users table if not exists
  await db.run(`
    CREATE TABLE IF NOT EXISTS ${Table.USERS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Create tickets table if not exists
  await db.run(`
    CREATE TABLE IF NOT EXISTS ${Table.TICKETS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      priority NCHAR(55) DEFAULT 'medium',
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES ${Table.USERS}(id) ON DELETE CASCADE
    )
  `);

  return db;
}