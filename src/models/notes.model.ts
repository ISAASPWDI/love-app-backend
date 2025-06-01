// src/models/notes.model.ts
import pool from '../config/db.config';
import { Note } from '../types';

class NotesModel {
  async create(note: Note): Promise<number> {
    const result = await pool.query(
      'INSERT INTO notes (content) VALUES ($1) RETURNING id',
      [note.content]
    );
    return result.rows[0].id;
  }

  async findAll(): Promise<Note[]> {
    const result = await pool.query(
      'SELECT * FROM notes ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: number): Promise<Note | null> {
    const result = await pool.query(
      'SELECT * FROM notes WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async update(id: number, note: Note): Promise<boolean> {
    const result = await pool.query(
      'UPDATE notes SET content = $1 WHERE id = $2',
      [note.content, id]
    );
    return result.rowCount! > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1',
      [id]
    );
    return result.rowCount! > 0;
  }
}

export default new NotesModel();