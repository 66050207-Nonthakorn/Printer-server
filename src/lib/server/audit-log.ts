import type { RequestEvent } from '@sveltejs/kit';
import { getAdminClient } from './functions/pocketbase/getAdminClient';

export async function writeServiceAudit(event: RequestEvent, input: { userId?: string | null; action: string; statusCode?: number; metadata?: Record<string, unknown> }) {
  try {
    const pb = await getAdminClient();
    await pb.collection('service_access_logs').create({
      service: 'printer-server', user: input.userId || undefined,
      source_ip: event.getClientAddress(), method: event.request.method,
      path: event.url.pathname, action: input.action, status_code: input.statusCode,
      user_agent: event.request.headers.get('user-agent') || undefined,
      request_id: event.request.headers.get('x-request-id') || undefined,
      metadata: input.metadata || {}
    });
  } catch (error) {
    console.warn('[audit] Unable to store printer-server access log:', error instanceof Error ? error.message : error);
  }
}
