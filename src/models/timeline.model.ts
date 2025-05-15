// src/models/timeline.model.ts
import pool from '../config/db.config';
import { TimelineEvent } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class TimelineModel {
  async create(event: TimelineEvent): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO timeline (title, description, event_date) VALUES (?, ?, ?)',
      [event.title, event.description || null, event.event_date]
    );
    return result.insertId;
  }

  async findAll(): Promise<TimelineEvent[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM timeline ORDER BY event_date DESC'
    );
    return rows as TimelineEvent[];
  }

  async findById(id: number): Promise<TimelineEvent | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM timeline WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as TimelineEvent;
  }

  async update(id: number, event: TimelineEvent): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE timeline SET title = ?, description = ?, event_date = ? WHERE id = ?',
      [event.title, event.description || null, event.event_date, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM timeline WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default new TimelineModel();