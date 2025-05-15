import { Request, Response } from 'express';
import TimelineModel from '../models/timeline.model';
import { TimelineEvent } from '../types';

export async function createTimelineEvent(req: Request, res: Response):Promise<void> {
  try {
    const event: TimelineEvent = req.body;
    if (!event.title || !event.event_date) {
      res.status(400).json({ message: 'Title and event date are required' });
      return;
    }
    const id = await TimelineModel.create(event);
    const created = await TimelineModel.findById(id);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating timeline event:', error);
    res.status(500).json({ message: 'Error creating timeline event', error });
  }
}

export async function getAllTimelineEvents(req: Request, res: Response):Promise<void> {
  try {
    const events = await TimelineModel.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching timeline events:', error);
    res.status(500).json({ message: 'Error fetching timeline events', error });
  }
}

export async function getTimelineEventById(req: Request, res: Response):Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const event = await TimelineModel.findById(id);
    if (!event) {
      res.status(404).json({ message: 'Timeline event not found' });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching timeline event:', error);
    res.status(500).json({ message: 'Error fetching timeline event', error });
  }
}

export async function updateTimelineEvent(req: Request, res: Response):Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const event: TimelineEvent = req.body;
    if (!event.title || !event.event_date) {
      res.status(400).json({ message: 'Title and event date are required' });
      return;
    }
    const exists = await TimelineModel.findById(id);
    if (!exists) {
      res.status(404).json({ message: 'Timeline event not found' });
      return;
    }
    await TimelineModel.update(id, event);
    const updated = await TimelineModel.findById(id);
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating timeline event:', error);
    res.status(500).json({ message: 'Error updating timeline event', error });
  }
}

export async function deleteTimelineEvent(req: Request, res: Response):Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const exists = await TimelineModel.findById(id);
    if (!exists) {
      res.status(404).json({ message: 'Timeline event not found' });
      return;
    }
    await TimelineModel.delete(id);
    res.status(200).json({ message: 'Timeline event deleted successfully' });
  } catch (error) {
    console.error('Error deleting timeline event:', error);
    res.status(500).json({ message: 'Error deleting timeline event', error });
  }
}
