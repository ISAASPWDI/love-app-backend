// src/models/compliments.model.ts
import pool from '../config/db.config';
import { Compliment } from '../types';

class ComplimentsModel {
  async create(compliment: Compliment): Promise<number> {
    const result = await pool.query(
      'INSERT INTO compliments (content, is_favorite) VALUES ($1, $2) RETURNING id',
      [compliment.content, compliment.is_favorite || false]
    );
    return result.rows[0].id;
  }

  async findAll(): Promise<Compliment[]> {
    const result = await pool.query(
      'SELECT * FROM compliments ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: number): Promise<Compliment | null> {
    const result = await pool.query(
      'SELECT * FROM compliments WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async update(id: number, compliment: Compliment): Promise<boolean> {
    const result = await pool.query(
      'UPDATE compliments SET content = $1, is_favorite = $2 WHERE id = $3',
      [compliment.content, compliment.is_favorite || false, id]
    );
    return result.rowCount! > 0;
  }

  async toggleFavorite(id: number): Promise<boolean> {
    // First get current favorite status
    const selectResult = await pool.query(
      'SELECT is_favorite FROM compliments WHERE id = $1',
      [id]
    );
    
    if (selectResult.rows.length === 0) return false;
    
    const currentStatus = selectResult.rows[0].is_favorite;
    const newStatus = !currentStatus;
    
    const updateResult = await pool.query(
      'UPDATE compliments SET is_favorite = $1 WHERE id = $2',
      [newStatus, id]
    );
    
    return updateResult.rowCount! > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM compliments WHERE id = $1',
      [id]
    );
    return result.rowCount! > 0;
  }
}

export default new ComplimentsModel();