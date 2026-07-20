import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity, ArrowLeft, CheckCircle2, CreditCard,
  Download, FileText, Fingerprint, KeyRound, Mail, Pencil, RefreshCw, Scale, ShieldCheck, StickyNote, Trash2,
  UserRound, Wrench,
} from 'lucide-react';

type Row = Record<string, unknown>;
type Verification = { verified?: boolean; method?: string; expires_at?: string; locked?: boolean };
type CrmResponse = { customer?: Row; verification?: Verification; error?: string };

const asText = (value: unknown, fallback = 'Not recorded') => {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};
const asRows = (value: unknown): Row[] => Array.isArray(value) ? value.filter((item): item is Row => !!item && typeof item === 'object') : [];
const date = (value: unknown) => {
  if (!value) return 'Not recorded';
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
};

function Detail({ label, value }: { label: string; value: unknown }) {
  return <div className="min-w-0 border-b border-border/70 px-1 py-2"><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-0.5 break-words text-[13px] font-medium text-foreground">{asText(value)}</p></div>;
}

function Empty({ children }: { children: string }) {
  return <div className="rounded-lg border border-dashed border-border p-5 text-center text-xs text-muted-foreground">{children}</div>;
}

function Records({ rows, title, fields }: { rows: Row[]; title: string; fields: Array<[string, string]> }) {
  if (!rows.length) return <Empty>{`No ${title.toLowerCase()} recorded.`}</Empty>;
  return <div className="divide-y overflow-hidden rounded-lg border border-border bg-card">{rows.map((row, index) => (
    <div key={asText(row.id || row.reference || `${title}-${index}`)}>
      <div className="grid gap-x-4 px-3 py-2 sm:grid-cols-2 xl:grid-cols-4">
        {fields.map(([key, label]) => <Detail key={key} label={label} value={key.includes('at') || key.includes('date') ? date(row[key]) : row[key]} />)}
      </div>
    </div>
  ))}</div>;
}

export default function AdminCustomerCrm() {
  const { email: encodedEmail = '' } = useParams();
  const email = useMemo(() => decodeURIComponent(encodedEmail), [encodedEmail]);
  const [data, setData] = useState<CrmResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pin, setPin] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState({ verified_name: '', display_name: '', contact_email: '', phone: '', communication_preference: '', support_notes: '', admin_notes: '' });

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch(`/admin/api?section=customer&email=${encodeURIComponent(email)}`, { credentials: 'include', cache: 'no-store' });
      const payload = await response.json().catch(() => ({})) as CrmResponse;
      if (!response.ok || !payload.customer) throw new Error(payload.error || 'The customer record could not be loaded.');
      setData(payload);
      setEdit({
        verified_name: asText(payload.customer.verified_name, ''), display_name: asText(payload.customer.display_name, ''),
        contact_email: asText(payload.customer.contact_email, ''), phone: asText(payload.customer.phone, ''),
        communication_preference: asText(payload.customer.communication_preference, ''), support_notes: asText(payload.customer.support_notes, ''),
        admin_notes: asText(payload.customer.admin_notes, ''),
      });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The customer record could not be loaded.');
    } finally { setLoading(false); }
  }, [email]);

  useEffect(() => { void load(); }, [load]);

  async function verifyIdentity() {
    if (!/^\d{6}$/.test(pin)) { setMessage('Enter the customer’s six-digit Support PIN.'); return; }
    setVerifying(true); setMessage('');
    try {
      const response = await fetch('/admin/api?section=customer', {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_pin', email, pin, method: 'Support PIN' }),
      });
      const payload = await response.json().catch(() => ({})) as { saved?: boolean; error?: string };
      if (!response.ok || !payload.saved) throw new Error(payload.error || 'Identity could not be verified.');
      setPin(''); setMessage('Identity verified. The one-time PIN has been used and reset.'); await load();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : 'Identity could not be verified.'); }
    finally { setVerifying(false); }
  }

  async function downloadCustomerData() {
    setMessage('Preparing the customer data export…');
    try {
      const response = await fetch('/admin/api?section=customer', {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export_customer_data', customer_email: email, format: 'json' }),
      });
      const payload = await response.json().catch(() => ({})) as { export?: { filename?: string; content?: string }; error?: string };
      if (!response.ok || !payload.export?.content) throw new Error(payload.error || 'The export could not be prepared.');
      const blob = new Blob([payload.export.content], { type: 'application/json;charset=utf-8' });
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement('a'); anchor.href = href; anchor.download = payload.export.filename || `${email}-customer-data.json`; anchor.click();
      URL.revokeObjectURL(href); setMessage('Customer data export downloaded and recorded in the audit log.');
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : 'The export could not be prepared.'); }
  }

  async function saveProfile() {
    setSaving(true); setMessage('');
    try {
      const response = await fetch('/admin/api?section=customer', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update_profile', email, ...edit }) });
      const payload = await response.json().catch(() => ({})) as { saved?: boolean; error?: string };
      if (!response.ok || !payload.saved) throw new Error(payload.error || 'The customer details could not be saved.');
      setEditing(false); setMessage('Customer details updated. The amendment has been added to the audit history.'); await load();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : 'The customer details could not be saved.'); }
    finally { setSaving(false); }
  }

  async function startErasureRequest() {
    if (!window.confirm(`Start a formal data deletion and account-closure request for ${email}? Data will not be erased until the request is reviewed for legal and financial retention requirements.`)) return;
    setMessage('Creating the deletion request…');
    try {
      const response = await fetch('/admin/api?section=closures', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer_email: email, customer_name: name, reason: 'Customer data deletion / erasure request created from Customer CRM', status: 'Open' }) });
      const payload = await response.json().catch(() => ({})) as { saved?: boolean; error?: string };
      if (!response.ok || !payload.saved) throw new Error(payload.error || 'The deletion request could not be created.');
      setMessage('Deletion request created. Review and complete it in Closure and Erasure Requests.'); await load();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : 'The deletion request could not be created.'); }
  }

  const customer = data.customer || {};
  const name = asText(customer.verified_name || customer.display_name, email);
  const billing = (customer.billing && typeof customer.billing === 'object' ? customer.billing : {}) as Row;
  const subscription = (billing.subscription && typeof billing.subscription === 'object' ? billing.subscription : {}) as Row;
  const flags = asRows(customer.flags);
  const timeline = asRows(customer.timeline);
  const cases = asRows(customer.supportCases);
  const enquiries = asRows(customer.customerEnquiries);
  const notes = asRows(customer.notes);
  const outputs = asRows(customer.builderOutputs);
  const ledger = asRows(customer.tokenLedger);
  const saved = asRows(customer.savedItems);
  const notifications = asRows(customer.notifications);
  const requests = asRows(customer.dataRequests);
  const audit = asRows(customer.customerAudit);

  return <>
    <Helmet><title>{name} — Customer CRM — JA Plan Studio Admin</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <AdminLayout title="Customer CRM" subtitle="Account, membership, support and activity in one record">
      <div className="crm-dense space-y-3 text-sm [&_[data-slot=card]]:shadow-none [&_[data-slot=card-header]]:p-3 [&_[data-slot=card-content]]:p-3 [&_[data-slot=card-content]]:pt-0 [&_[data-slot=card-title]]:text-sm [&_[data-slot=card-title]]:font-semibold">
        <Button asChild variant="outline" size="sm"><Link to="/admin/users"><ArrowLeft className="mr-2 h-4 w-4" />All customers</Link></Button>
        {loading ? <div className="flex min-h-72 items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin text-muted-foreground" /></div> : error ?
          <Alert variant="destructive"><AlertDescription>{error} <Button variant="outline" size="sm" className="ml-3" onClick={() => void load()}>Retry</Button></AlertDescription></Alert> : <>
          <Card className="shadow-none">
            <CardContent className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">{name.slice(0, 2).toUpperCase()}</div><div className="min-w-0"><h1 className="break-words text-lg font-semibold text-foreground">{name}</h1><p className="break-all text-xs text-muted-foreground">{email}</p><div className="mt-1 flex flex-wrap gap-1.5"><Badge className="h-5 text-[10px]">{asText(customer.admin_customer_status, 'Standard')}</Badge>{customer.admin_lifetime ? <Badge className="h-5 bg-amber-100 text-[10px] text-amber-800">Lifetime</Badge> : null}{data.verification?.verified ? <Badge className="h-5 bg-green-100 text-[10px] text-green-800">Verified</Badge> : <Badge variant="outline" className="h-5 text-[10px]">Verification required</Badge>}</div></div></div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Detail label="Joined" value={date(customer.created_at)} /><Detail label="Last updated" value={date(customer.updated_at)} /><Detail label="Plan" value={subscription.plan || customer.admin_lifetime_plan_id} /><Detail label="Membership" value={subscription.status || customer.admin_customer_status} /></div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <div className="overflow-x-auto border-b border-border pb-1"><TabsList className="h-8 min-w-max justify-start gap-0 bg-transparent p-0 [&_button]:h-8 [&_button]:rounded-none [&_button]:px-2.5 [&_button]:text-xs">
              <TabsTrigger value="overview"><UserRound className="mr-2 h-4 w-4" />Overview</TabsTrigger><TabsTrigger value="membership"><CreditCard className="mr-2 h-4 w-4" />Membership</TabsTrigger><TabsTrigger value="support"><Mail className="mr-2 h-4 w-4" />Support</TabsTrigger><TabsTrigger value="activity"><Activity className="mr-2 h-4 w-4" />Activity</TabsTrigger><TabsTrigger value="builders"><Wrench className="mr-2 h-4 w-4" />Builders</TabsTrigger><TabsTrigger value="security"><ShieldCheck className="mr-2 h-4 w-4" />Security</TabsTrigger><TabsTrigger value="notes"><StickyNote className="mr-2 h-4 w-4" />Notes</TabsTrigger><TabsTrigger value="compliance"><Scale className="mr-2 h-4 w-4" />Compliance</TabsTrigger><TabsTrigger value="data"><FileText className="mr-2 h-4 w-4" />Data & audit</TabsTrigger>
            </TabsList></div>

            <TabsContent value="overview" className="mt-3 space-y-3"><Card className="shadow-none"><CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3"><CardTitle className="text-sm font-semibold">Contact and account information</CardTitle><Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditing(value => !value)}><Pencil className="mr-1.5 h-3 w-3" />{editing ? 'Cancel' : 'Amend details'}</Button></CardHeader><CardContent className="px-4 pb-4">{editing ? <div className="space-y-3"><Alert><AlertDescription>Profile amendments require an active Support PIN verification and are permanently audited.</AlertDescription></Alert><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs">Verified name<Input className="mt-1 h-8" value={edit.verified_name} onChange={event => setEdit(value => ({ ...value, verified_name: event.target.value }))} /></label><label className="text-xs">Display name<Input className="mt-1 h-8" value={edit.display_name} onChange={event => setEdit(value => ({ ...value, display_name: event.target.value }))} /></label><label className="text-xs">Contact email<Input className="mt-1 h-8" type="email" value={edit.contact_email} onChange={event => setEdit(value => ({ ...value, contact_email: event.target.value }))} /></label><label className="text-xs">Telephone<Input className="mt-1 h-8" value={edit.phone} onChange={event => setEdit(value => ({ ...value, phone: event.target.value }))} /></label><label className="text-xs sm:col-span-2">Communication preference<Input className="mt-1 h-8" value={edit.communication_preference} onChange={event => setEdit(value => ({ ...value, communication_preference: event.target.value }))} /></label><label className="text-xs">Support notes<Textarea className="mt-1 min-h-20 text-sm" value={edit.support_notes} onChange={event => setEdit(value => ({ ...value, support_notes: event.target.value }))} /></label><label className="text-xs">Internal Admin notes<Textarea className="mt-1 min-h-20 text-sm" value={edit.admin_notes} onChange={event => setEdit(value => ({ ...value, admin_notes: event.target.value }))} /></label></div><div className="flex justify-end gap-2"><Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button><Button size="sm" onClick={() => void saveProfile()} disabled={saving}>{saving ? 'Saving…' : 'Save amendments'}</Button></div></div> : <div className="grid gap-x-4 sm:grid-cols-2 xl:grid-cols-4"><Detail label="Verified name" value={customer.verified_name} /><Detail label="Display name" value={customer.display_name} /><Detail label="Account email" value={customer.email} /><Detail label="Contact email" value={customer.contact_email} /><Detail label="Telephone" value={customer.phone} /><Detail label="Contact preference" value={customer.communication_preference} /><Detail label="Customer status" value={customer.admin_customer_status} /><Detail label="Account created" value={date(customer.created_at)} /></div>}{message && <p role="status" aria-live="polite" className="mt-3 text-xs text-muted-foreground">{message}</p>}</CardContent></Card><Records rows={flags} title="Account flags" fields={[["flag","Flag"],["note","Details"],["source","Source"],["created_at","Added"]]} /></TabsContent>

            <TabsContent value="membership" className="mt-4 space-y-4"><Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><CreditCard className="h-4 w-4" />Membership and billing</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Detail label="Plan" value={subscription.plan || customer.admin_lifetime_plan_id} /><Detail label="Subscription status" value={subscription.status || customer.admin_customer_status} /><Detail label="Lifetime access" value={customer.admin_lifetime} /><Detail label="Stripe customer" value={billing.stripeCustomerId} /><Detail label="Current period ends" value={date(subscription.currentPeriodEnd || subscription.current_period_end)} /><Detail label="Trial ends" value={date(subscription.trialEnd || subscription.trial_end)} /><Detail label="Cancellation scheduled" value={subscription.cancelAtPeriodEnd || subscription.cancel_at_period_end} /><Detail label="Billing portal available" value={billing.portalAvailable} /></CardContent></Card><Records rows={ledger} title="Token transactions" fields={[["amount","Amount"],["balance_after","Balance after"],["source","Source"],["created_at","Date"]]} /></TabsContent>

            <TabsContent value="support" className="mt-4 space-y-5"><section><h2 className="mb-3 font-semibold">Support cases</h2><Records rows={cases} title="Support cases" fields={[["reference","Reference"],["subject","Subject"],["status","Status"],["priority","Priority"],["updated_at","Updated"]]} /></section><section><h2 className="mb-3 font-semibold">Contact enquiries</h2><Records rows={enquiries} title="Contact enquiries" fields={[["reference","Reference"],["subject","Subject"],["status","Status"],["created_at","Submitted"]]} /></section></TabsContent>
            <TabsContent value="activity" className="mt-4"><Records rows={timeline} title="Timeline events" fields={[["title","Event"],["detail","Details"],["actor_email","Actor"],["created_at","Date"]]} /></TabsContent>
            <TabsContent value="builders" className="mt-4 space-y-5"><section><h2 className="mb-3 font-semibold">Builder outputs</h2><Records rows={outputs} title="Builder outputs" fields={[["builder_name","Builder"],["title","Title"],["status","Status"],["created_at","Created"]]} /></section><section><h2 className="mb-3 font-semibold">Saved items</h2><Records rows={saved} title="Saved items" fields={[["title","Item"],["item_type","Type"],["status","Status"],["updated_at","Updated"]]} /></section></TabsContent>
            <TabsContent value="security" className="mt-4 space-y-4"><Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Fingerprint className="h-4 w-4" />Verify customer identity</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Before discussing protected account information with a customer, enter their visible single-use Support PIN. It expires after ten minutes and resets after successful use.</p>{data.verification?.verified ? <Alert><CheckCircle2 className="h-4 w-4" /><AlertDescription>Verified using {data.verification.method || 'Support PIN'}. CRM access expires {date(data.verification.expires_at)}.</AlertDescription></Alert> : <div className="flex max-w-md gap-2"><Input aria-label="Customer Support PIN" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={pin} onChange={event => setPin(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Six-digit PIN" className="font-mono tracking-[0.25em]" /><Button onClick={() => void verifyIdentity()} disabled={verifying || pin.length !== 6}><KeyRound className="mr-2 h-4 w-4" />{verifying ? 'Verifying…' : 'Verify'}</Button></div>}{message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}</CardContent></Card><Records rows={asRows(customer.pins)} title="Support PIN history" fields={[["pin_last4","Last four"],["status","Status"],["expires_at","Expires"],["used_at","Used"]]} /></TabsContent>
            <TabsContent value="notes" className="mt-4 space-y-5"><Card><CardHeader><CardTitle className="text-base">Customer and Admin notes</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2"><Detail label="Customer support notes" value={customer.support_notes} /><Detail label="Admin notes" value={customer.admin_notes} /></CardContent></Card><Records rows={notes} title="Internal notes" fields={[["note","Note"],["author_email","Author"],["pinned","Pinned"],["updated_at","Updated"]]} /></TabsContent>
            <TabsContent value="compliance" className="mt-4 space-y-4">
              <Alert><ShieldCheck className="h-4 w-4" /><AlertDescription>This record is restricted to authorised Admin roles. Protected details remain masked until identity verification, and CRM access and exports are written to the audit log.</AlertDescription></Alert>
              <div className="grid gap-4 lg:grid-cols-2">
                <Card><CardHeader><CardTitle className="text-base">Processing and communications</CardTitle></CardHeader><CardContent className="space-y-3"><Detail label="Core account processing" value="Contract and service administration" /><Detail label="Support processing" value="Customer request and legitimate operational interests" /><Detail label="Marketing consent" value={customer.marketing_consent || 'No marketing consent recorded — do not send marketing'} /><Detail label="Communication preference" value={customer.communication_preference} /><p className="text-xs leading-relaxed text-muted-foreground">Service messages and marketing must remain separate. No recorded consent must be treated as no permission for consent-based electronic marketing.</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Individual rights</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-xs text-muted-foreground">Access and export data here. Corrections are made from Overview after PIN verification. Erasure uses a governed request so invoice, fraud-prevention or legal-hold records are reviewed before deletion.</p><div className="flex flex-wrap gap-2"><Button size="sm" onClick={() => void downloadCustomerData()}><Download className="mr-2 h-3.5 w-3.5" />Export data</Button><Button size="sm" variant="destructive" onClick={() => void startErasureRequest()}><Trash2 className="mr-2 h-3.5 w-3.5" />Start data deletion</Button><Button asChild size="sm" variant="outline"><Link to="/admin/gdpr">Rights requests</Link></Button><Button asChild size="sm" variant="outline"><Link to="/admin/closure-requests">Deletion queue</Link></Button></div>{message && <p role="status" aria-live="polite" className="text-xs text-muted-foreground">{message}</p>}</CardContent></Card>
              </div>
              <Card><CardHeader><CardTitle className="text-base">Data minimisation and retention review</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Detail label="Profile last updated" value={date(customer.updated_at)} /><Detail label="Open data requests" value={requests.filter(row => !['completed','closed'].includes(asText(row.status, '').toLowerCase())).length} /><Detail label="Stored support cases" value={cases.length} /><Detail label="Stored notifications" value={notifications.length} /></CardContent></Card>
            </TabsContent>
            <TabsContent value="data" className="mt-4 space-y-5"><section><h2 className="mb-3 font-semibold">Data protection requests</h2><Records rows={requests} title="Data protection requests" fields={[["reference","Reference"],["request_type","Request"],["status","Status"],["due_at","Due"]]} /></section><section><h2 className="mb-3 font-semibold">Notifications</h2><Records rows={notifications} title="Notifications" fields={[["title","Notification"],["category","Category"],["status","Status"],["created_at","Created"]]} /></section><section><h2 className="mb-3 font-semibold">Admin audit history</h2><Records rows={audit} title="Audit records" fields={[["action","Action"],["summary","Summary"],["actor_email","Admin"],["created_at","Date"]]} /></section></TabsContent>
          </Tabs>
        </>}
      </div>
    </AdminLayout>
  </>;
}
