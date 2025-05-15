// src/models/memories.model.ts
import { Memory } from '../types';

class MemoriesModel {
  private memories: Memory[] = [];
  private currentId = 1;

  async create(memory: Memory): Promise<number> {
    const newMemory: Memory = {
      id: this.currentId++,
      image_url: memory.image_url,
      caption: memory.caption,
      created_at: new Date() // Correctamente como Date
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
      // mantenemos created_at igual
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
