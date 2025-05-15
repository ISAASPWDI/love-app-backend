// src/models/compliments.model.ts
import { Compliment } from '../types';

class ComplimentsModel {
  private compliments: Compliment[] = [];
  private currentId = 1;

  constructor() {
    // Cargar cumplidos por defecto
    const defaultCompliments: Omit<Compliment, 'id' | 'created_at'>[] = [
      { content: 'Aunque nos vimos pocas veces antes, te recuerdo perfectamente xd', is_favorite: false },
      { content: 'Habra más sorpresas cuando nos veamos xd', is_favorite: false },
      { content: 'Me gustan tus ojos', is_favorite: false },
      { content: 'Espero que te guste esta página, lo hice para ti', is_favorite: false }
    ];

    defaultCompliments.forEach(c => {
      this.compliments.push({
        id: this.currentId++,
        content: c.content,
        is_favorite: c.is_favorite,
        created_at: new Date()
      });
    });
  }

  async create(compliment: Compliment): Promise<number> {
    const newCompliment: Compliment = {
      id: this.currentId++,
      content: compliment.content,
      is_favorite: compliment.is_favorite || false,
      created_at: new Date()
    };
    this.compliments.push(newCompliment);
    return newCompliment.id!;
  }

  async findAll(): Promise<Compliment[]> {
    return [...this.compliments].sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
  }

  async findById(id: number): Promise<Compliment | null> {
    const compliment = this.compliments.find(c => c.id === id);
    return compliment || null;
  }

  async update(id: number, compliment: Compliment): Promise<boolean> {
    const index = this.compliments.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.compliments[index] = {
      ...this.compliments[index],
      content: compliment.content,
      is_favorite: compliment.is_favorite || false
    };
    return true;
  }

  async toggleFavorite(id: number): Promise<boolean> {
    const compliment = this.compliments.find(c => c.id === id);
    if (!compliment) return false;
    compliment.is_favorite = !compliment.is_favorite;
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.compliments.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.compliments.splice(index, 1);
    return true;
  }
}

export default new ComplimentsModel();
