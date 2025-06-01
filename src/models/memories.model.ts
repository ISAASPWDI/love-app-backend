// src/models/memories.model.ts
import pool from '../config/db.config';
import { Memory } from '../types';

class MemoriesModel {
  async create(memory: Memory): Promise<number> {
    const result = await pool.query(
      'INSERT INTO memories (image_url, caption) VALUES ($1, $2) RETURNING id',
      [memory.image_url, memory.caption || null]
    );
    return result.rows[0].id;
  }

  async findAll(): Promise<Memory[]> {
    const result = await pool.query(
      'SELECT * FROM memories ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: number): Promise<Memory | null> {
    const result = await pool.query(
      'SELECT * FROM memories WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async update(id: number, memory: Memory): Promise<boolean> {
    const result = await pool.query(
      'UPDATE memories SET image_url = $1, caption = $2 WHERE id = $3',
      [memory.image_url, memory.caption || null, id]
    );
    return result.rowCount! > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM memories WHERE id = $1',
      [id]
    );
    return result.rowCount! > 0;
  }
}

export default new MemoriesModel();