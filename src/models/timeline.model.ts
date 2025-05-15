// src/models/timeline.model.ts
import { TimelineEvent } from '../types';

class TimelineModel {
  private events: TimelineEvent[] = [];
  private currentId = 1;

  constructor() {
    const defaultEvents: Omit<TimelineEvent, 'id' | 'created_at'>[] = [
      {
        title: 'Primera y única salida xd',
        description: 'Me acuerdo que te invité un helado :v , pero la fecha exacta no sé xd',
        event_date: '2019-01-10'
      },
      {
        title: 'Mientras pasaba el tiempo',
        description: 'Luego pudimos salir más veces, pero tenía miedo xd',
        event_date: '2019-01-27'
      },
      {
        title: 'No estoy seguro de las fechas xd',
        description: 'xddd',
        event_date: '2019-02-17'
      }
    ];

    defaultEvents.forEach(e => {
      this.events.push({
        id: this.currentId++,
        title: e.title,
        description: e.description,
        event_date: e.event_date,
        created_at: new Date()
      });
    });
  }

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
