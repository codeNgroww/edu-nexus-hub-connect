
export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export type RegistrationRequest = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'created_at' | 'updated_at'>>;
      };
      registration_requests: {
        Row: RegistrationRequest;
        Insert: Omit<RegistrationRequest, 'id' | 'created_at'>;
        Update: Partial<Omit<RegistrationRequest, 'id' | 'created_at'>>;
      };
    };
  };
};
