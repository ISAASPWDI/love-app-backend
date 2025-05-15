import { Request, Response } from 'express';
import MemoriesModel from '../models/memories.model';
import { Memory } from '../types';

export const createMemory = async (req: Request, res: Response):Promise<void> => {
  try {
    const memory: Memory = req.body;
    if (!memory.image_url) {
      res.status(400).json({ message: 'Image URL is required' });
      return;
    }

    const id = await MemoriesModel.create(memory);
    const createdMemory = await MemoriesModel.findById(id);
    res.status(201).json(createdMemory);
  } catch (error) {
    console.error('Error creating memory:', error);
    res.status(500).json({ message: 'Error creating memory', error });
  }
};

export const getAllMemories = async (req: Request, res: Response):Promise<void> => {
  try {
    const memories = await MemoriesModel.findAll();
    res.status(200).json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    res.status(500).json({ message: 'Error fetching memories', error });
  }
};

export const getMemoryById = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const memory = await MemoriesModel.findById(id);

    if (!memory) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }

    res.status(200).json(memory);
  } catch (error) {
    console.error('Error fetching memory:', error);
    res.status(500).json({ message: 'Error fetching memory', error });
  }
};

export const updateMemory = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const memory: Memory = req.body;

    if (!memory.image_url) {
      res.status(400).json({ message: 'Image URL is required' });
      return;
    }

    const memoryExists = await MemoriesModel.findById(id);
    if (!memoryExists) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }

    await MemoriesModel.update(id, memory);
    const updatedMemory = await MemoriesModel.findById(id);
    res.status(200).json(updatedMemory);
  } catch (error) {
    console.error('Error updating memory:', error);
    res.status(500).json({ message: 'Error updating memory', error });
  }
};

export const deleteMemory = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const memoryExists = await MemoriesModel.findById(id);
    if (!memoryExists) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }

    await MemoriesModel.delete(id);
    res.status(200).json({ message: 'Memory deleted successfully' });
  } catch (error) {
    console.error('Error deleting memory:', error);
    res.status(500).json({ message: 'Error deleting memory', error });
  }
};
