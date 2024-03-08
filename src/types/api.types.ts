export interface ScheduleApi {
  editionKey: string;
  mainLanguage: string;
  rooms: ScheduleRoomApi[];
  items: ScheduleItemApi[];
}

export interface ScheduleItemApi {
  period: SchedulePeriodApi;
  room: ScheduleRoomApi;
  session: ScheduleSessionApi;
}

export interface SchedulePeriodApi {
  start_date: string | Date;
  end_date: string | Date;
}

export interface ScheduleRoomApi {
  key: string;
  name: string;
  description: string;
}

export type ScheduleSessionApi = ScheduleBreakApi | ScheduleTalkApi;

export interface ScheduleBreakApi {
  type: 'Break';
  id: string;
  title: string;
  description: string | undefined;
  pictureUrl: string | undefined;
}

export interface ScheduleTalkApi {
  type: 'Talk';
  id: string;
  title: string;
  description: string;
  speakers: ScheduleSpeakerApi[];
  language: string;
  tags: ScheduleTagApi[];
}

export interface ScheduleSpeakerApi {
  id: string;
  full_name: string;
  avatar_url: string;
  company: string;
}

export interface ScheduleTagApi {
  id: string;
  name: string;
}
