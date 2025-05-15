import { Request, Response } from 'express';
import ComplimentsModel from '../models/compliments.model';
import { Compliment } from '../types';

export const createCompliment = async (req: Request, res: Response):Promise<void> => {
  try {
    const compliment: Compliment = req.body;
    if (!compliment.content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }
    const id = await ComplimentsModel.create(compliment);
    const createdCompliment = await ComplimentsModel.findById(id);
    res.status(201).json(createdCompliment);
  } catch (error) {
    console.error('Error creating compliment:', error);
    res.status(500).json({ message: 'Error creating compliment', error });
  }
};

export const getAllCompliments = async (req: Request, res: Response):Promise<void> => {
  try {
    const compliments = await ComplimentsModel.findAll();
    res.status(200).json(compliments);
  } catch (error) {
    console.error('Error fetching compliments:', error);
    res.status(500).json({ message: 'Error fetching compliments', error });
  }
};

export const getComplimentById = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const compliment = await ComplimentsModel.findById(id);

    if (!compliment) {
      res.status(404).json({ message: 'Compliment not found' });
      return;
    }

    res.status(200).json(compliment);
  } catch (error) {
    console.error('Error fetching compliment:', error);
    res.status(500).json({ message: 'Error fetching compliment', error });
  }
};

export const updateCompliment = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const compliment: Compliment = req.body;

    if (!compliment.content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }

    const complimentExists = await ComplimentsModel.findById(id);
    if (!complimentExists) {
      res.status(404).json({ message: 'Compliment not found' });
      return;
    }

    await ComplimentsModel.update(id, compliment);
    const updatedCompliment = await ComplimentsModel.findById(id);
    res.status(200).json(updatedCompliment);
  } catch (error) {
    console.error('Error updating compliment:', error);
    res.status(500).json({ message: 'Error updating compliment', error });
  }
};

export const deleteCompliment = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const complimentExists = await ComplimentsModel.findById(id);
    if (!complimentExists) {
      res.status(404).json({ message: 'Compliment not found' });
      return;
    }

    await ComplimentsModel.delete(id);
    res.status(200).json({ message: 'Compliment deleted successfully' });
  } catch (error) {
    console.error('Error deleting compliment:', error);
    res.status(500).json({ message: 'Error deleting compliment', error });
  }
};
