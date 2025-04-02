
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon, UserCog } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Profile, RegistrationRequest } from "@/types/database.types";

const UserManagementPage = () => {
  const [pendingRequests, setPendingRequests] = useState<RegistrationRequest[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin, isApproved } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin and approved
    if (!isAdmin() || !isApproved()) {
      navigate('/');
      return;
    }

    fetchPendingRequests();
    fetchApprovedUsers();
  }, [isAdmin, isApproved, navigate]);

  const fetchPendingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('registration_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPendingRequests(data as RegistrationRequest[]);
    } catch (error: any) {
      toast({
        title: "Error fetching pending requests",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setApprovedUsers(data as Profile[]);
    } catch (error: any) {
      toast({
        title: "Error fetching approved users",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleApproveUser = async (userId: string) => {
    try {
      // Update profile to approved
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ approved: true })
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      // Update registration request status
      const { error: requestError } = await supabase
        .from('registration_requests')
        .update({ status: 'approved' })
        .eq('user_id', userId);

      if (requestError) {
        throw requestError;
      }

      toast({
        title: "User approved",
        description: "The user has been approved successfully.",
      });

      // Refresh data
      fetchPendingRequests();
      fetchApprovedUsers();
    } catch (error: any) {
      toast({
        title: "Error approving user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      // Update registration request status
      const { error: requestError } = await supabase
        .from('registration_requests')
        .update({ status: 'rejected' })
        .eq('user_id', userId);

      if (requestError) {
        throw requestError;
      }

      toast({
        title: "User rejected",
        description: "The user has been rejected.",
      });

      // Refresh data
      fetchPendingRequests();
    } catch (error: any) {
      toast({
        title: "Error rejecting user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout userType="admin" pageTitle="User Management">
      <div className="grid grid-cols-1 gap-6 animate-fadeIn">
        <Tabs defaultValue="pending" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center">
                <UserCog className="mr-2 h-4 w-4" />
                Pending Approvals
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" />
                Approved Users
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending User Approval Requests</CardTitle>
                <CardDescription>
                  Review and approve new user registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No pending approval requests.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Requested On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {request.first_name} {request.last_name}
                          </TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>
                            <Badge variant={request.role === 'student' ? 'default' : 'secondary'}>
                              {request.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(request.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleRejectUser(request.user_id)}
                              >
                                <XIcon className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveUser(request.user_id)}
                              >
                                <CheckIcon className="h-4 w-4 mr-1" />
                                Approve
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

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Users</CardTitle>
                <CardDescription>
                  All users with access to the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : approvedUsers.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No approved users found.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={
                              user.role === 'student' ? 'default' : 
                              user.role === 'teacher' ? 'secondary' : 'outline'
                            }>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
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
    </DashboardLayout>
  );
};

export default UserManagementPage;
