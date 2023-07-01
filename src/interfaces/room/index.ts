import { MusicInterface } from 'interfaces/music';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface RoomInterface {
  id?: string;
  name: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  music?: MusicInterface[];
  company?: CompanyInterface;
  _count?: {
    music?: number;
  };
}

export interface RoomGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  company_id?: string;
}
