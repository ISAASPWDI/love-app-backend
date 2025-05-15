// src/models/notes.model.ts
import pool from '../config/db.config';
import { Note } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class NotesModel {
  async create(note: Note): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO notes (content) VALUES (?)',
      [note.content]
    );
    return result.insertId;
  }

  async findAll(): Promise<Note[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM notes ORDER BY created_at DESC'
    );
    return rows as Note[];
  }

  async findById(id: number): Promise<Note | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM notes WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as Note;
  }

  async update(id: number, note: Note): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE notes SET content = ? WHERE id = ?',
      [note.content, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM notes WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default new NotesModel();