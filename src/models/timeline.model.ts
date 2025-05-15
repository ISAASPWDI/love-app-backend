// src/models/timeline.model.ts
import { TimelineEvent } from '../types';

class TimelineModel {
  private events: TimelineEvent[] = [];
  private currentId = 1;

  async create(event: TimelineEvent): Promise<number> {
    const newEvent: TimelineEvent = {
      id: this.currentId++,
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      created_at: new Date()
    };
    this.events.push(newEvent);
    return newEvent.id!;
  }

  async findAll(): Promise<TimelineEvent[]> {
    return [...this.events].sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());
  }

  async findById(id: number): Promise<TimelineEvent | null> {
    const event = this.events.find(e => e.id === id);
    return event || null;
  }

  async update(id: number, event: TimelineEvent): Promise<boolean> {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.events[index] = {
      ...this.events[index],
      title: event.title,
      description: event.description,
      event_date: event.event_date
      // created_at no cambia
    };
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.events.splice(index, 1);
    return true;
  }
}

export default new TimelineModel();
