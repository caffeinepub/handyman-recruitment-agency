import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Loader2, Trash2, Download, Search, User } from 'lucide-react';
import type { Candidate, Enquiry, ContactMessage } from '../../backend';

export default function AdminDashboardPage() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [tradeFilter, setTradeFilter] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const { data: candidates = [], isLoading: loadingCandidates } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCandidates();
    },
    enabled: !!actor
  });

  const { data: enquiries = [], isLoading: loadingEnquiries } = useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiries();
    },
    enabled: !!actor
  });

  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor
  });

  const deleteCandidateMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteCandidate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      setSelectedCandidate(null);
    }
  });

  const deleteEnquiryMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteEnquiry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      setSelectedEnquiry(null);
    }
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteContactMessage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setSelectedMessage(null);
    }
  });

  const filteredCandidates = tradeFilter
    ? candidates.filter((c) => c.tradeSkill.toLowerCase().includes(tradeFilter.toLowerCase()))
    : candidates;

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  const getContactType = (contactType: ContactMessage['contactType']): string => {
    if (typeof contactType === 'string') {
      return contactType === 'candidate' ? 'Candidate' : 'Client';
    }
    return 'candidate' in contactType ? 'Candidate' : 'Client';
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Principal: {identity?.getPrincipal().toString()}</span>
        </div>
      </div>

      <Tabs defaultValue="candidates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="candidates">
            Candidates ({candidates.length})
          </TabsTrigger>
          <TabsTrigger value="enquiries">
            Enquiries ({enquiries.length})
          </TabsTrigger>
          <TabsTrigger value="messages">
            Messages ({messages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Registrations</CardTitle>
              <CardDescription>View and manage handyman candidate applications</CardDescription>
              <div className="flex items-center gap-2 mt-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by trade/skill..."
                  value={tradeFilter}
                  onChange={(e) => setTradeFilter(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              {loadingCandidates ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
                </div>
              ) : filteredCandidates.length === 0 ? (
                <Alert>
                  <AlertDescription>No candidates found.</AlertDescription>
                </Alert>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Trade/Skill</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCandidates.map((candidate) => (
                        <TableRow key={candidate.id.toString()}>
                          <TableCell className="font-medium">{candidate.fullName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{candidate.tradeSkill}</Badge>
                          </TableCell>
                          <TableCell>{candidate.yearsExperience.toString()} years</TableCell>
                          <TableCell>{candidate.phoneNumber}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(candidate.timestamp)}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedCandidate(candidate)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enquiries">
          <Card>
            <CardHeader>
              <CardTitle>Client Enquiries</CardTitle>
              <CardDescription>View and manage client hiring requests</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingEnquiries ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
                </div>
              ) : enquiries.length === 0 ? (
                <Alert>
                  <AlertDescription>No enquiries found.</AlertDescription>
                </Alert>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enquiries.map((enquiry) => (
                        <TableRow key={enquiry.id.toString()}>
                          <TableCell className="font-medium">{enquiry.fullName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{enquiry.serviceType}</Badge>
                          </TableCell>
                          <TableCell>{enquiry.location}</TableCell>
                          <TableCell>{enquiry.phoneNumber}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(enquiry.timestamp)}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedEnquiry(enquiry)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>View and manage contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
                </div>
              ) : messages.length === 0 ? (
                <Alert>
                  <AlertDescription>No messages found.</AlertDescription>
                </Alert>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((message) => (
                        <TableRow key={message.id.toString()}>
                          <TableCell className="font-medium">{message.fullName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getContactType(message.contactType)}
                            </Badge>
                          </TableCell>
                          <TableCell>{message.phoneNumber}</TableCell>
                          <TableCell>{message.email}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(message.timestamp)}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedMessage(message)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Candidate Detail Dialog */}
      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Details</DialogTitle>
            <DialogDescription>Full information for {selectedCandidate?.fullName}</DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p>{selectedCandidate.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Number</p>
                  <p>{selectedCandidate.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{selectedCandidate.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedCandidate.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trade/Skill</p>
                  <p>{selectedCandidate.tradeSkill}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Experience</p>
                  <p>{selectedCandidate.yearsExperience.toString()} years</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Physical Address</p>
                  <p>{selectedCandidate.physicalAddress}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Work Areas</p>
                  <p>{selectedCandidate.workAreas}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Documents</p>
                <div className="space-y-2">
                  {selectedCandidate.cv && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">CV: {selectedCandidate.cv.fileName}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(selectedCandidate.cv!.blob.getDirectURL(), '_blank')
                        }
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                  {selectedCandidate.idCopy && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">ID Copy: {selectedCandidate.idCopy.fileName}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(selectedCandidate.idCopy!.blob.getDirectURL(), '_blank')
                        }
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                  {selectedCandidate.matricCert && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">
                        Matric Certificate: {selectedCandidate.matricCert.fileName}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(selectedCandidate.matricCert!.blob.getDirectURL(), '_blank')
                        }
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                  {selectedCandidate.qualificationCert && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">
                        Qualification: {selectedCandidate.qualificationCert.fileName}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            selectedCandidate.qualificationCert!.blob.getDirectURL(),
                            '_blank'
                          )
                        }
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => deleteCandidateMutation.mutate(selectedCandidate.id)}
                disabled={deleteCandidateMutation.isPending}
                className="w-full"
              >
                {deleteCandidateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Candidate
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enquiry Detail Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>Full information for this client enquiry</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p>{selectedEnquiry.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p>{selectedEnquiry.companyName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{selectedEnquiry.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                  <p>{selectedEnquiry.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{selectedEnquiry.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Message</p>
                  <p className="whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => deleteEnquiryMutation.mutate(selectedEnquiry.id)}
                disabled={deleteEnquiryMutation.isPending}
                className="w-full"
              >
                {deleteEnquiryMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Enquiry
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
            <DialogDescription>Full information for this contact message</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p>{selectedMessage.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p>{getContactType(selectedMessage.contactType)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{selectedMessage.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedMessage.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Message</p>
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => deleteMessageMutation.mutate(selectedMessage.id)}
                disabled={deleteMessageMutation.isPending}
                className="w-full"
              >
                {deleteMessageMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Message
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
