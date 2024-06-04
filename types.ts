
export enum WasteStatus {
  Recycled = 'recycled',
  Disposed = 'disposed',
  Reused = 'reused',
}

export interface Waste {
  id: number;
  type: string;
  quantity: number;
  unit: string;
  category: string;
  status: WasteStatus;
  location: string;
  notes?: string;
  created_at: string;
  user_id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Password should not be sent to client
  monthly_target?: number; // in kg
  profile_picture_url?: string;
}

export enum LogActionType {
    WASTE_ADDED = 'WASTE_ADDED',
    WASTE_UPDATED = 'WASTE_UPDATED',
    WASTE_DELETED = 'WASTE_DELETED',
    USER_LOGIN = 'USER_LOGIN',
}

export interface SystemLog {
    id: number;
    user_id: number;
    action: LogActionType;
    description: string;
    created_at: string;
}