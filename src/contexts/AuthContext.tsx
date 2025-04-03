
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/supabase';
import { useToast } from "@/hooks/use-toast";

// Define types for our context
type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isApproved: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, userData: Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'approved'>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Auth state change listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(true);
        
        if (session?.user) {
          // Fetch user profile data
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Initial session check
    const initSession = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    };

    initSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error fetching profile',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Sign up function
  const signUp = async (
    email: string, 
    password: string, 
    userData: Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'approved'>
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
          },
        },
      });

      if (error) {
        toast({
          title: 'Registration failed',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      toast({
        title: 'Registration successful',
        description: 'Your account is pending approval by an administrator.',
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      if (data?.user) {
        await fetchUserProfile(data.user.id);
        
        if (profile && !profile.approved) {
          await signOut();
          toast({
            title: 'Account not approved',
            description: 'Your account is pending approval by an administrator.',
            variant: 'destructive',
          });
          throw new Error('Account not approved');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: 'Sign out failed',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Computed properties
  const isAdmin = !!profile && profile.role === 'admin' && profile.approved;
  const isTeacher = !!profile && profile.role === 'teacher' && profile.approved;
  const isStudent = !!profile && profile.role === 'student' && profile.approved;
  const isApproved = !!profile && profile.approved;

  const value = {
    user,
    profile,
    session,
    isAdmin,
    isTeacher,
    isStudent,
    isApproved,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
