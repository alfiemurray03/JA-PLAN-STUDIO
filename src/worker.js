export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test-db") {
      try {
        const result = await env.DB.prepare(
          "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"
        ).all();

        return Response.json({
          success: true,
          tables: result.results
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: "Database connection failed"
          },
          { status: 500 }
        );
      }
    }

    if (url.pathname === "/api/admin/status") {
      try {
        const destinations = await env.DB.prepare(
          "SELECT COUNT(*) AS count FROM destinations"
        ).first();

        const services = await env.DB.prepare(
          "SELECT COUNT(*) AS count FROM planning_services"
        ).first();

        const enquiries = await env.DB.prepare(
          "SELECT COUNT(*) AS count FROM enquiries"
        ).first();

        const quotes = await env.DB.prepare(
          "SELECT COUNT(*) AS count FROM quotes"
        ).first();

        return Response.json({
          success: true,
          database: "connected",
          counts: {
            destinations: destinations.count,
            services: services.count,
            enquiries: enquiries.count,
            quotes: quotes.count
          }
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: "Admin status API failed"
          },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};