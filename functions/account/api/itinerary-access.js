export async function onRequest() {
  return new Response(JSON.stringify({ success: false, error: "Itinerary access is being configured." }), {
    status: 503,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}
