// src/models/compliments.model.ts
import pool from '../config/db.config';
import { Compliment } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class ComplimentsModel {
  async create(compliment: Compliment): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO compliments (content, is_favorite) VALUES (?, ?)',
      [compliment.content, compliment.is_favorite || false]
    );
    return result.insertId;
  }

  async findAll(): Promise<Compliment[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM compliments ORDER BY created_at DESC'
    );
    return rows as Compliment[];
  }

  async findById(id: number): Promise<Compliment | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM compliments WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as Compliment;
  }

  async update(id: number, compliment: Compliment): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE compliments SET content = ?, is_favorite = ? WHERE id = ?',
      [compliment.content, compliment.is_favorite || false, id]
    );
    return result.affectedRows > 0;
  }

  async toggleFavorite(id: number): Promise<boolean> {
    // First get current favorite status
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT is_favorite FROM compliments WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) return false;
    
    const currentStatus = rows[0].is_favorite;
    const newStatus = !currentStatus;
    
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE compliments SET is_favorite = ? WHERE id = ?',
      [newStatus, id]
    );
    
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM compliments WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default new ComplimentsModel();