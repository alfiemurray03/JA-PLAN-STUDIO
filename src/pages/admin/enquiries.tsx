import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, Eye, Loader2, Mail, MessageCircle, RefreshCw, Search, Send } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Enquiry {
  reference: string;
  id?: string;
  name?: string;
  email?: string;
  telephone?: string;
  subject?: string;
  category?: string;
  message?: string;
  status?: string;
  priority?: string;
  assigned_admin?: string;
  notification_status?: string;
  created_at?: string;
  updated_at?: string;
}

interface EnquiryMessage {
  id: string;
  author_type: string;
  author_email?: string;
  message: string;
  is_internal?: number;
  notification_status?: string;
  created_at?: string;
}

interface EnquiryThread {
  enquiry: Enquiry;
  messages: EnquiryMessage[];
  notifications: Array<Record<string, unknown>>;
}

const STATUSES = ['New', 'Open', 'In Progress', 'Awaiting Customer', 'Resolved', 'Closed'];
const PRIORITIES = ['Low', 'Normal', 'High', 'Urgent'];

function formatDate(value?: string) {
  if (!value) return 'Not available';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('en-GB');
}

function statusClass(value = '') {
  const status = value.toLowerCase();
  if (status === 'resolved' || status === 'closed') return 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300';
  if (status === 'in progress' || status === 'awaiting customer') return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
  return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
}

export default function AdminEnquiriesPage() {
  const location = useLocation();
  const requestedReference = useMemo(() => new URLSearchParams(location.search).get('reference')?.trim() || '', [location.search]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState<EnquiryThread | null>(null);
  const [opening, setOpening] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editStatus, setEditStatus] = useState('New');
  const [editPriority, setEditPriority] = useState('Normal');
  const [assignedAdmin, setAssignedAdmin] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [reply, setReply] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (status !== 'all') params.set('status', status);
      const response = await fetch(`/api/admin/enquiries?${params}`, { credentials: 'include' });
      const data = await response.json() as { success?: boolean; enquiries?: Enquiry[]; error?: string };
      if (!response.ok || !data.success) throw new Error(data.error || 'Contact Enquiries could not be loaded.');
      setEnquiries(data.enquiries || []);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Contact Enquiries could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  const openEnquiry = useCallback(async (reference: string) => {
    setOpening(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(reference)}`, { credentials: 'include' });
      const data = await response.json() as { success?: boolean; thread?: EnquiryThread; error?: string };
      if (!response.ok || !data.success || !data.thread) throw new Error(data.error || 'The enquiry could not be opened.');
      setSelected(data.thread);
      setEditStatus(data.thread.enquiry.status || 'New');
      setEditPriority(data.thread.enquiry.priority || 'Normal');
      setAssignedAdmin(data.thread.enquiry.assigned_admin || '');
      setInternalNote('');
      setReply('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The enquiry could not be opened.');
    } finally {
      setOpening(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (requestedReference) void openEnquiry(requestedReference);
  }, [requestedReference, openEnquiry]);

  async function save() {
    if (!selected) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(selected.enquiry.reference)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: editStatus,
          priority: editPriority,
          assignedAdmin,
          internalNote,
          reply,
        }),
      });
      const data = await response.json() as { success?: boolean; thread?: EnquiryThread; error?: string };
      if (!response.ok || !data.success || !data.thread) throw new Error(data.error || 'The enquiry could not be updated.');
      setSelected(data.thread);
      setInternalNote('');
      setReply('');
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The enquiry could not be updated.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Helmet><title>Contact Enquiries — Admin Portal</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <AdminLayout title="Contact Enquiries" subtitle="View, manage and reply to website and chatbot enquiries">
        <div className="mx-auto w-full max-w-7xl space-y-6 pb-20 lg:pb-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60"><Mail className="h-5 w-5 text-blue-600 dark:text-blue-300" /></div>
              <div><h1 className="text-2xl font-bold text-foreground">Contact Enquiries</h1><p className="text-sm text-muted-foreground">Every website and AI chatbot enquiry appears here with its full message history.</p></div>
            </div>
            <Button variant="outline" onClick={() => void load()} disabled={loading}><RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Refresh</Button>
          </div>

          <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
            <CardContent className="flex items-start gap-3 p-4 text-sm text-blue-950 dark:text-blue-200"><MessageCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><p className="font-semibold">AI chatbot escalations are stored here</p><p className="mt-1 opacity-80">Open any ENQ reference to view the visitor’s message, the chatbot transcript, status, delivery history and replies.</p></div></CardContent>
          </Card>

          <Card className="border-border bg-card"><CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_240px_auto]">
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search reference, name, email, subject or message…" className="pl-9" /></div>
            <Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue placeholder="All statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem>{STATUSES.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
            <Button onClick={() => void load()}><Search className="mr-2 h-4 w-4" />Search</Button>
          </CardContent></Card>

          {error && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

          <Card className="overflow-hidden border-border bg-card">
            <CardContent className="p-0">
              {loading ? <div className="flex min-h-52 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div> : !enquiries.length ? <div className="py-16 text-center text-sm text-muted-foreground">No enquiries match the current filters.</div> : <div className="overflow-x-auto"><table className="w-full min-w-[920px] text-sm"><thead><tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Received</th><th className="px-4 py-3 text-right">Action</th></tr></thead><tbody>{enquiries.map(enquiry => <tr key={enquiry.reference} className={`border-b border-border/70 hover:bg-muted/40 ${requestedReference === enquiry.reference ? 'bg-blue-50 dark:bg-blue-950/40' : ''}`}><td className="px-4 py-3 font-mono font-semibold text-foreground">{enquiry.reference}</td><td className="px-4 py-3"><p className="font-medium text-foreground">{enquiry.name || 'Customer'}</p><p className="text-xs text-muted-foreground">{enquiry.email}</p></td><td className="max-w-[260px] px-4 py-3"><p className="truncate font-medium text-foreground">{enquiry.subject || 'Website enquiry'}</p></td><td className="px-4 py-3 text-muted-foreground">{enquiry.category || 'General Enquiry'}</td><td className="px-4 py-3"><Badge className={statusClass(enquiry.status)}>{enquiry.status || 'New'}</Badge></td><td className="px-4 py-3 text-muted-foreground">{formatDate(enquiry.created_at)}</td><td className="px-4 py-3 text-right"><Button size="sm" variant="outline" onClick={() => void openEnquiry(enquiry.reference)} disabled={opening}><Eye className="mr-2 h-4 w-4" />View enquiry</Button></td></tr>)}</tbody></table></div>}
            </CardContent>
          </Card>
        </div>

        <Dialog open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }}>
          <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-border bg-card text-card-foreground">
            {selected && <>
              <DialogHeader><DialogTitle className="flex flex-wrap items-center gap-2 text-foreground">{selected.enquiry.subject || 'Contact Enquiry'} <Badge className={statusClass(selected.enquiry.status)}>{selected.enquiry.status || 'New'}</Badge></DialogTitle><DialogDescription>{selected.enquiry.reference} · received {formatDate(selected.enquiry.created_at)}</DialogDescription></DialogHeader>
              <div className="grid gap-4 md:grid-cols-2"><Card className="border-border bg-muted/30"><CardContent className="space-y-2 p-4 text-sm"><p><strong>Name:</strong> {selected.enquiry.name || 'Not provided'}</p><p><strong>Email:</strong> {selected.enquiry.email || 'Not provided'}</p><p><strong>Telephone:</strong> {selected.enquiry.telephone || 'Not provided'}</p><p><strong>Category:</strong> {selected.enquiry.category || 'General Enquiry'}</p><p><strong>Notification:</strong> {selected.enquiry.notification_status || 'Not available'}</p></CardContent></Card><Card className="border-border bg-muted/30"><CardContent className="grid gap-3 p-4"><div><Label>Status</Label><Select value={editStatus} onValueChange={setEditStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{STATUSES.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div><Label>Priority</Label><Select value={editPriority} onValueChange={setEditPriority}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PRIORITIES.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div><Label>Assigned administrator</Label><Input value={assignedAdmin} onChange={event => setAssignedAdmin(event.target.value)} placeholder="Administrator email" /></div></CardContent></Card></div>
              <div className="space-y-3"><h3 className="font-semibold text-foreground">Conversation</h3>{selected.messages.map(message => <div key={message.id} className={`rounded-xl border p-4 ${message.is_internal ? 'border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30' : message.author_type === 'administrator' ? 'border-blue-300 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30' : 'border-border bg-muted/30'}`}><div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground"><span className="font-semibold uppercase tracking-wide">{message.is_internal ? 'Internal note' : message.author_type}</span><span>{formatDate(message.created_at)}</span></div><p className="whitespace-pre-wrap text-sm text-foreground">{message.message}</p></div>)}</div>
              <div className="grid gap-4 md:grid-cols-2"><div><Label>Internal note</Label><Textarea value={internalNote} onChange={event => setInternalNote(event.target.value)} rows={5} placeholder="Visible to administrators only" /></div><div><Label>Reply to customer</Label><Textarea value={reply} onChange={event => setReply(event.target.value)} rows={5} placeholder="Send a reply by email and add it to the thread" /></div></div>
              <div className="flex justify-end"><Button onClick={() => void save()} disabled={saving}>{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}{saving ? 'Saving…' : 'Save and send'}</Button></div>
            </>}
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </>
  );
}
