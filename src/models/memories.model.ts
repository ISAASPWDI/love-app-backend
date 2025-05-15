// src/models/memories.model.ts
import pool from '../config/db.config';
import { Memory } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class MemoriesModel {
  async create(memory: Memory): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO memories (image_url, caption) VALUES (?, ?)',
      [memory.image_url, memory.caption || null]
    );
    return result.insertId;
  }

  async findAll(): Promise<Memory[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM memories ORDER BY created_at DESC'
    );
    return rows as Memory[];
  }

  async findById(id: number): Promise<Memory | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM memories WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as Memory;
  }

  async update(id: number, memory: Memory): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE memories SET image_url = ?, caption = ? WHERE id = ?',
      [memory.image_url, memory.caption || null, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM memories WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default new MemoriesModel();