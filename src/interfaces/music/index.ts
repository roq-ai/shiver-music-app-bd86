import { RoomInterface } from 'interfaces/room';
import { GetQueryInterface } from 'interfaces';

export interface MusicInterface {
  id?: string;
  name: string;
  platform: string;
  room_id: string;
  created_at?: any;
  updated_at?: any;

  room?: RoomInterface;
  _count?: {};
}

export interface MusicGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  platform?: string;
  room_id?: string;
}
