// src/models/timeline.model.ts
import pool from '../config/db.config';
import { TimelineEvent } from '../types';

class TimelineModel {
  async create(event: TimelineEvent): Promise<number> {
    const result = await pool.query(
      'INSERT INTO timeline (title, description, event_date) VALUES ($1, $2, $3) RETURNING id',
      [event.title, event.description || null, event.event_date]
    );
    return result.rows[0].id;
  }

  async findAll(): Promise<TimelineEvent[]> {
    const result = await pool.query(
      'SELECT * FROM timeline ORDER BY event_date DESC'
    );
    return result.rows;
  }

  async findById(id: number): Promise<TimelineEvent | null> {
    const result = await pool.query(
      'SELECT * FROM timeline WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async update(id: number, event: TimelineEvent): Promise<boolean> {
    const result = await pool.query(
      'UPDATE timeline SET title = $1, description = $2, event_date = $3 WHERE id = $4',
      [event.title, event.description || null, event.event_date, id]
    );
    return result.rowCount! > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM timeline WHERE id = $1',
      [id]
    );
    return result.rowCount! > 0;
  }
}

export default new TimelineModel();