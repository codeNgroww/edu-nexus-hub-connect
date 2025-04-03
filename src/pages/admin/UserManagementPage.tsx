
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Profile, RegistrationRequest } from '@/types/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const UserManagementPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<RegistrationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchProfiles();
        await fetchPendingRequests();
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    setProfiles(data || []);
  };

  const fetchPendingRequests = async () => {
    const { data, error } = await supabase
      .from('registration_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    setPendingRequests(data || []);
  };

  const approveUser = async (userId: string) => {
    try {
      // Update the profile to set approved to true
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ approved: true })
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      // Update the registration request status
      const { error: requestError } = await supabase
        .from('registration_requests')
        .update({ status: 'approved' })
        .eq('user_id', userId);

      if (requestError) {
        throw requestError;
      }

      toast({
        title: 'Success',
        description: 'User approved successfully',
      });

      // Refresh data
      await fetchProfiles();
      await fetchPendingRequests();
    } catch (error) {
      console.error('Error approving user:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve user',
        variant: 'destructive',
      });
    }
  };

  const rejectUser = async (userId: string) => {
    try {
      // Update the registration request status
      const { error: requestError } = await supabase
        .from('registration_requests')
        .update({ status: 'rejected' })
        .eq('user_id', userId);

      if (requestError) {
        throw requestError;
      }

      toast({
        title: 'Success',
        description: 'User rejected successfully',
      });

      // Refresh data
      await fetchPendingRequests();
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject user',
        variant: 'destructive',
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Registrations ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="all">All Users ({profiles.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Registration Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : pendingRequests.length === 0 ? (
                <p>No pending registration requests.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.first_name} {request.last_name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell className="capitalize">{request.role}</TableCell>
                        <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={() => approveUser(request.user_id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => rejectUser(request.user_id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : profiles.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.first_name} {profile.last_name}</TableCell>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell className="capitalize">{profile.role}</TableCell>
                        <TableCell>
                          {profile.approved ? (
                            <span className="text-green-600 font-medium">Approved</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">Pending</span>
                          )}
                        </TableCell>
                        <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagementPage;
