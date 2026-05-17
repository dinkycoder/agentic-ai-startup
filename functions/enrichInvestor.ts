import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Enriches an investor profile using the Apify PitchBook Investors Scraper
// Apify Actor: apify/crawlerbros/pitchbook-investors-scraper
// Docs: https://apify.com/crawlerbros/pitchbook-investors-scraper

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { investor_name, firm_name } = body;

    if (!investor_name && !firm_name) {
      return Response.json({ error: 'Provide investor_name or firm_name' }, { status: 400 });
    }

    const APIFY_TOKEN = Deno.env.get('APIFY_API_TOKEN');
    if (!APIFY_TOKEN) {
      return Response.json({ error: 'Apify API token not configured' }, { status: 500 });
    }

    const searchQuery = firm_name || investor_name;

    // Run the Apify PitchBook scraper actor
    const runResponse = await fetch(
      `https://api.apify.com/v2/acts/crawlerbros~pitchbook-investors-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}&maxItems=5`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchQuery,
          maxItems: 5,
          includePortfolio: true
        })
      }
    );

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      return Response.json({ error: `Apify run failed: ${errorText}` }, { status: 500 });
    }

    const results = await runResponse.json();

    if (!results || results.length === 0) {
      return Response.json({ 
        found: false, 
        message: `No PitchBook data found for "${searchQuery}"` 
      });
    }

    // Normalize the enriched data
    const enriched = results.map((investor: Record<string, unknown>) => ({
      name: investor.name || investor.investor_name,
      firm: investor.firm || investor.organization,
      stage_focus: investor.stage || investor.investment_stages,
      thesis: investor.description || investor.investment_thesis,
      portfolio: investor.portfolio_companies || investor.investments || [],
      check_size: investor.typical_check_size || investor.aum,
      geography: investor.geography || investor.location,
      website: investor.website,
      linkedin: investor.linkedin_url,
      recent_investments: investor.recent_deals || []
    }));

    return Response.json({ 
      found: true, 
      count: enriched.length,
      investors: enriched 
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
