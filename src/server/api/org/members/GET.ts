/**
 * GET /api/org/members
 * Returns the organisation and its members for the logged-in org owner/admin.
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { ja_sessions, ja_users, ja_organisations, ja_org_members } from '../../../db/schema.js';
import { eq, and } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const token = req.cookies?.session_token as string | undefined;
    if (!token) return res.status(401).json({ success: false, error: 'Please sign in to continue.', code: 'NOT_AUTHENTICATED' });

    const [session] = await db.select().from(ja_sessions).where(eq(ja_sessions.token, token)).limit(1);
    if (!session || session.expiresAt < new Date()) return res.status(401).json({ success: false, error: 'Session expired.' });

    const [user] = await db.select().from(ja_users).where(eq(ja_users.id, session.userId)).limit(1);
    if (!user) return res.status(401).json({ success: false, error: 'User not found.' });

    if (user.usageType !== 'business') {
      return res.status(403).json({ success: false, error: 'An explicitly selected Organisation account is required.' });
    }
    if (!['org_starter', 'org_growth', 'org_professional'].includes(user.plan)) {
      return res.status(403).json({ success: false, error: 'The Together Plan is required for the organisation member workspace.' });
    }

    const [orgMembership] = await db.select().from(ja_org_members).where(and(eq(ja_org_members.userId, user.id))).limit(1);
    if (!orgMembership) {
      const orgUuid = crypto.randomUUID();
      await db.insert(ja_organisations).values({
        uuid: orgUuid,
        name: user.company?.trim() || `${user.firstName ?? user.email}'s Organisation`,
        plan: user.plan as 'org_starter' | 'org_growth' | 'org_professional',
        ownerUserId: user.id,
        maxSeats: user.plan === 'org_starter' ? 2 : user.plan === 'org_growth' ? 5 : 10,
      });
      const [newOrg] = await db.select().from(ja_organisations).where(eq(ja_organisations.uuid, orgUuid)).limit(1);
      await db.insert(ja_org_members).values({ orgId: newOrg.id, userId: user.id, role: 'owner' });
      return res.json({
        success: true,
        org: { ...newOrg, memberCount: 1, maxSeats: newOrg.maxSeats },
        members: [{ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: 'owner', joinedAt: new Date() }],
        isOwnerOrAdmin: true,
      });
    }

    const [org] = await db.select().from(ja_organisations).where(eq(ja_organisations.id, orgMembership.orgId)).limit(1);
    if (!org) return res.status(404).json({ success: false, error: 'Organisation not found.' });
    const isOwnerOrAdmin = orgMembership.role === 'owner' || orgMembership.role === 'admin';
    const memberships = await db.select().from(ja_org_members).where(eq(ja_org_members.orgId, org.id));
    const memberIds = memberships.map(m => m.userId);
    const memberUsers = memberIds.length > 0
      ? await Promise.all(memberIds.map(id => db.select({ id: ja_users.id, email: ja_users.email, firstName: ja_users.firstName, lastName: ja_users.lastName }).from(ja_users).where(eq(ja_users.id, id)).limit(1).then(r => r[0] ?? null))).then(rows => rows.filter((r): r is NonNullable<typeof r> => r !== null))
      : [];
    const members = memberships.map(m => {
      const member = memberUsers.find(item => item.id === m.userId);
      return { id: m.id, userId: m.userId, email: member?.email ?? '(unknown)', firstName: member?.firstName ?? null, lastName: member?.lastName ?? null, role: m.role, suspended: m.suspended ?? false, joinedAt: m.createdAt };
    });

    return res.json({ success: true, org: { ...org, memberCount: members.length }, members, isOwnerOrAdmin, currentUserId: user.id });
  } catch (err) {
    console.error('GET /api/org/members error:', err);
    return res.status(500).json({ success: false, error: 'Server error.' });
  }
}
