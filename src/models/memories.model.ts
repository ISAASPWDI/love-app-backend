// src/models/memories.model.ts 
import { Memory } from '../types';

class MemoriesModel {
  private memories: Memory[] = [];
  private currentId = 1;

  constructor() {
    // Memorias por defecto
    const defaultMemories: Omit<Memory, 'id' | 'created_at'>[] = [
      {
        image_url: 'http://imgfz.com/i/BQyEdDT.jpeg',
        caption: 'Milaneso'
      },
      {
        image_url: 'http://imgfz.com/i/OSV4Pwf.jpeg',
        caption: 'Tommy'
      },
      {
        image_url: 'http://imgfz.com/i/DHYzIdy.jpeg',
        caption: 'Tus gatitos xd'
      },
      {
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAR7NZ0njV5LKv06rsxPb9euz5qrOVfzeEYg&s',
        caption: 'Puedes agregar cualquier imagen jaja'
      },
      {
        image_url: 'https://pbs.twimg.com/media/E_6nbroVgAY8KlL.jpg',
        caption: 'escuero :c xd'
      }
    ];

    defaultMemories.forEach(m => {
      this.memories.push({
        id: this.currentId++,
        image_url: m.image_url,
        caption: m.caption,
        created_at: new Date()
      });
    });
  }

  async create(memory: Memory): Promise<number> {
    const newMemory: Memory = {
      id: this.currentId++,
      image_url: memory.image_url,
      caption: memory.caption,
      created_at: new Date()
    };
    this.memories.push(newMemory);
    return newMemory.id!;
  }

  async findAll(): Promise<Memory[]> {
    return [...this.memories].sort((a, b) => b.created_at!.getTime() - a.created_at!.getTime());
  }

  async findById(id: number): Promise<Memory | null> {
    const memory = this.memories.find(m => m.id === id);
    return memory || null;
  }

  async update(id: number, memory: Memory): Promise<boolean> {
    const index = this.memories.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.memories[index] = {
      ...this.memories[index],
      image_url: memory.image_url,
      caption: memory.caption
    };
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.memories.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.memories.splice(index, 1);
    return true;
  }
}

export default new MemoriesModel();
