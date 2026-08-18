/* Head-term and commercial-intent pages. Each of these competes for a query where
   the searcher is looking for an agency — so each argues the same structural case
   from the angle of the term itself rather than repeating one page nine times.

   No Sevenam dollar figures appear anywhere here: pricing is quoted in writing
   after the account is read. Market rates quoted on the cost pages are described
   as typical industry ranges, never as ours. */

const SUPPORT = "Sevenam installs a Meta advertising system on your own ad account and runs the technology that operates it — written decisions at 7am every morning telling you exactly what to do that day. One fixed setup fee, a fixed monthly, priced to the work rather than your media budget.";

const OWNERSHIP = {
  h2: 'What you own at the end of it.',
  paras: [
    "Everything is built inside your own Business Manager from the first hour — the ad account, the pixel, the audiences, the creative files and the reporting. There is no agency-owned account that you rent access to, and nothing to negotiate over if the relationship ends.",
    "That single structural choice is what makes the rest of it possible. An arrangement where the provider owns the asset has to be renewed; one where you own it has to be earned.",
  ],
  items: [
    'Your ad account, your pixel, your creative library. Always.',
    'A fixed setup fee and a fixed monthly, priced to the work rather than your budget.',
    'Month to month, with no notice period.',
    'Every decision written down, with the numbers behind it.',
  ],
};

const PAGES = [
  {
    slug: 'ad-creative',
    skipOwnership: true,
    gallery: {
      label: 'Recent output from the line',
      images: [
        { src: '/img/line-coffee.webp',     alt: 'Coffee concept produced on the line' },
        { src: '/img/line-eyewear.webp',    alt: 'Eyewear concept produced on the line' },
        { src: '/img/line-supplement.webp', alt: 'Supplement concept produced on the line' },
        { src: '/img/line-audio.webp',      alt: 'Consumer electronics concept produced on the line' },
      ],
      note: 'Statics from four categories, each produced end to end without a shoot. Motion and cuts are made the same way; these are the frames that reproduce well on a page.',
    },
    title: 'AI Ad Creative for Ecommerce Brands | Sevenam',
    description: 'Ad creative produced end to end on an AI line: concepts, hooks, cuts and statics, ordered on demand and delivered in days rather than weeks.',
    eyebrow: 'AD CREATIVE', h1: 'Ad Creative, Without the Shoot',
    lead: 'Order what the account needs. It comes back in days, priced per concept.',
    s1: {
      h2: 'Creative volume is the constraint now.',
      paras: [
        "Targeting, bidding and placement are the platform's models. What is left for a human to influence is how much distinct creative goes into the auction and how quickly the losers are replaced — and almost every account we read is short of it.",
        "The reason is production, not intent. A shoot takes weeks to organise and prices volume by the hour, so most brands ship three or four concepts a quarter and watch frequency climb while they wait for the next batch.",
      ],
      items: [
        'Targeting and bidding are automated; creative volume is not.',
        'Fatigue arrives faster than a shoot can be organised.',
        'Three concepts a quarter is not enough for the models to learn from.',
      ],
    },
    gantt: {
      label: 'Brief to live',
      h2: 'Same brief, two production routes.',
      rows: [
        {
          label: 'Booked shoot',
          duration: 'Six weeks, typically',
          segments: [
            { label: 'Book and schedule', w: 2 },
            { label: 'Shoot', w: 1 },
            { label: 'Edit', w: 2 },
            { label: 'Traffic and ship', w: 1 },
          ],
        },
        {
          label: 'The line',
          duration: 'Five working days',
          accent: true,
          segments: [
            { label: '', w: 1 },
          ],
          pad: 5,
          caption: 'Brief, produce, direct, ship.',
        },
      ],
      note: 'Both tracks are on the same scale. Nothing on the lower one waits on a booking, a location or an editor.',
    },
    s2: {
      h2: 'What the line actually is.',
      paras: [
        "Concepts, hooks, cuts and statics produced end to end on our own line. Each one is briefed against what the account's numbers already say is working, and ships with its own numbers attached so the next brief is better than the last.",
      ],
      items: [
        "Briefed against the account's own data, not a mood board.",
        'Concepts, hooks, cuts and statics, each with its numbers attached.',
        'Ordered when you need it, no minimum, five working days.',
      ],
    },
    steps: {
      label: 'How an order runs',
      h2: 'What actually happens when you order.',
      items: [
        { t: 'You say what it is for', p: 'A product, an angle, or just the gap the account has. No brief template to fill in.' },
        { t: 'We read the account first', p: "What is already winning, what has fatigued, and which hooks the numbers say to build on." },
        { t: 'The line produces it', p: 'Stills, motion, cuts and variations, art-directed the same way any other creative would be.' },
        { t: 'It lands in your library', p: 'Delivered into your own Business Manager with the numbers attached, yours whether or not you order again.' },
      ],
    },
    faqs: [
      { q: 'What can AI creative not do?', a: "It cannot replace a founder talking to camera, a real customer testimonial, or a demonstration that needs hands on the product. Those still need a person and a camera, and we will say so rather than approximate one badly. What it is good at is volume: the variations, hooks, cuts and motion that would otherwise never get made." },
      { q: 'Will it look like AI?', a: "That is the failure mode worth worrying about, and it comes down to how much direction goes in. Left to itself, generated output looks generic within three frames. Ours is briefed, art-directed and rejected like any other creative, and anything that reads as synthetic does not ship." },
      { q: 'How much does it cost?', a: "Priced per concept and quoted in writing once we know what the account needs, with hooks, cuts and statics included. No minimum and no subscription: order one concept or twenty, whenever the account needs them." },
      { q: 'Can we buy creative without the rest of it?', a: "Yes, and some do. If the account is structurally sound and the real problem is that you cannot ship enough new ads, creative alone is often the right buy." },
      { q: 'Who owns the files?', a: "You do, from delivery. The files sit in your own creative library and stay there whether or not you buy anything again." },
    ],
    related: [
      { href: '/nano-banana-2', title: 'Nano Banana 2 for ad creative', note: 'Where it helps, and where it fails.' },
      { href: '/seedance-2-5', title: 'Seedance 2.5 for ad creative', note: 'What the new model changed.' },
      { href: '/higgsfield-ads', title: 'Higgsfield AI for ad creative', note: 'Directed motion, not prompt-and-hope.' },
    ],
    toolstrip: {
      label: 'What the line runs on',
      tools: [
        { name: 'Higgsfield', role: 'Directed motion and camera control.' },
        { name: 'Nano Banana 2', role: 'Stills, edits and product-accurate variations.' },
        { name: 'Seedance 2.5', role: 'Short-form video and cuts.' },
        { name: 'Claude', role: 'Briefs, hooks and the copy on the frame.' },
      ],
      note: 'The models change every few months and the line changes with them. What does not is that a person briefs it, directs it and rejects it before anything reaches your account.',
    },
    closing: { h2: 'Order what the account needs.', p: "Answer five questions about the account and Josh comes back with what it would cost and whether creative alone is the right buy." },
  },
  {
    /* "performance marketing agency" is 700 a month in Australia at a difficulty
       of 0, and the site had no page for it — the one genuinely soft head term
       in this space. The care needed is that the phrase has been captured by two
       things Sevenam is not: percentage-of-spend agencies, and pay-on-results
       shops. Neighbouring terms like "pay for performance marketing agency" are
       deliberately answered rather than targeted, because ranking for them would
       bring people wanting a commission deal we do not offer. */
    slug: 'performance-marketing-agency',
    title: 'Performance Marketing Agency (Australia) — Fixed Fee | Sevenam',
    description: 'A performance marketing agency for Australian ecommerce brands: Meta media buying, creative production and written decisions at 7am, on your own ad account for a fixed fee.',
    eyebrow: 'PERFORMANCE MARKETING', h1: 'Performance Marketing Agency',
    lead: 'Paid acquisition judged on what it returns — priced on the work, not on what you spend.',
    s1: {
      h2: 'What the term is supposed to mean.',
      paras: [
        "Performance marketing means spending money where the return can be measured and stopping where it cannot. Every part of that is a claim about measurement, which is why the discipline collapses the moment the tracking is wrong — and in most accounts we read, the tracking is wrong in at least one place that matters.",
        "So the first work is never media buying. It is making the numbers true: the pixel, the conversions API, the deduplication between them, and a definition of a conversion that finance would recognise. An account optimising towards a number nobody trusts is not performance marketing, whatever the invoice says.",
      ],
      items: [
        'Measurement first, because everything after it inherits the error.',
        'One definition of a conversion, agreed before anything scales.',
        'Spend that stops where the return stops, not where the contract ends.',
        'Decisions written down, so the reasoning outlives the person who had it.',
      ],
    },
    s2: {
      h2: 'Two things this is not.',
      paras: [
        "The first is a percentage of spend. It is the default in this market and it prices the one thing that does not get harder as it grows: reading an account and deciding what to change takes the same judgment at $30,000 a month as at $300,000. A percentage means the invoice climbs with a budget you added, for work that did not.",
        "The second is pay-on-results. It sounds like alignment and behaves like the opposite — the incentive becomes claiming credit for demand you already had, which means last-click attribution, brand-term bidding and heavy retargeting. It reliably produces a good-looking report and a flat business.",
      ],
      items: [
        'A fixed setup fee and a fixed monthly, quoted after the account is read.',
        'No commission, so nothing is gained by claiming existing demand.',
        'Your ad account, pixel, audiences and creative library, from hour one.',
        'Month to month, because the work should have to be earned again.',
      ],
    },
    faqs: [
      { q: 'Do you work on a performance basis — a share of revenue or spend?', a: "No, and it is worth being specific about why. A commission on revenue rewards attributing demand you already had: bidding your own brand terms, retargeting people who were going to buy anyway, and reporting on last click. A percentage of spend rewards spending more. Both put the agency's interest somewhere other than yours. We quote a fixed setup and a fixed monthly against the work the account actually needs, and it does not move because you scaled." },
      { q: 'What makes an account performance marketing rather than just advertising?', a: "That you can say what a conversion is worth, that the number is measured the same way twice, and that spend moves when it changes. If any of those three is missing you are buying reach and calling it performance. It is why the first thing we do is the measurement build rather than the campaign build." },
      { q: 'Which channels do you actually run?', a: "Meta — Facebook and Instagram — and that is deliberate. It is where the depth is for Australian ecommerce, and a team spread across six platforms is not better at any of them. If your best next dollar is in search or a marketplace, we will say so rather than take the budget." },
      { q: 'How is this different from a full-service digital agency?', a: "Scope and ownership. A full-service agency sells you a retainer across several channels and usually holds the accounts. This is one channel, installed on infrastructure you own, with the daily decisions written out in plain English so somebody in-house can audit them or take over entirely." },
      { q: 'What size account does this suit?', a: "Australian ecommerce brands spending roughly $30,000 to $500,000 a month on Meta. Below that the setup rarely pays for itself and we will tell you so — plenty of brands take the published guides and run it themselves, which is a fine outcome." },
    ],
    related: [
      { href: '/agency-fee', title: 'What the fee model costs you', note: 'The percentage, in dollars.' },
      { href: '/ecommerce-performance-marketing-agency', title: 'Ecommerce performance marketing', note: 'Where the margin actually goes.' },
      { href: '/system', title: 'How the system works', note: 'Installed, then run.' },
    ],
    closing: { h2: 'Have the account read first.', p: "Answer five questions and Josh comes back with what the account needs, what it would cost, and whether it is worth doing at all." },
  },
  {
    slug: 'ecommerce-performance-marketing-agency',
    title: 'Ecommerce Performance Marketing Agency (Australia) | Sevenam',
    description: 'Performance marketing for Australian ecommerce brands on Meta: measurement built properly, creative produced on demand, and a fixed fee that does not rise with your budget.',
    eyebrow: 'ECOMMERCE', h1: 'Ecommerce Performance Marketing',
    lead: 'For brands where the margin is real and the reporting has to survive contact with it.',
    s1: {
      h2: 'Ecommerce makes the measurement problem worse.',
      paras: [
        "A lead generation account can live with a loose definition of success for a while. An ecommerce account cannot, because there is a real margin underneath every order and a wrong number compounds daily into stock you bought and discounts you did not need to give.",
        "The usual failures are specific and fixable: purchases counted twice across the pixel and the conversions API, returns and cancellations never subtracted, shipping and payment fees left out of the contribution figure, and a platform ROAS that has quietly drifted from what the bank statement says.",
      ],
      items: [
        'Deduplicated purchases, so one order is one order.',
        'Returns and cancellations subtracted, not assumed away.',
        'Contribution margin, not revenue, as the number that decides spend.',
        'Platform reporting reconciled against what actually landed.',
      ],
    },
    s2: {
      h2: 'Then creative becomes the constraint.',
      paras: [
        "Once the numbers are true, the thing limiting an ecommerce account is almost never targeting — the platform's models handle that now. It is how much distinct creative goes into the auction, and how quickly the losers are replaced. A shoot takes weeks to organise and prices volume by the hour, so most brands ship three or four concepts a quarter and watch frequency climb while they wait.",
        "Concepts, hooks, cuts and statics are produced end to end on our own line and briefed against what the account's own numbers already say is working, which is why an order comes back in days rather than weeks.",
      ],
      items: [
        'Creative volume sized to the account, not to a percentage of the budget.',
        'Briefed against the account data, not a mood board.',
        'Ordered when it is needed, with no minimum.',
        'Every file yours, in your own library, permanently.',
      ],
    },
    faqs: [
      { q: 'What do you need from our store to start?', a: "Read access to the ad account and the Business Manager, the storefront platform, and whatever you use for order and returns data. The measurement build is the first week's work and most of it is reconciling what the platform reports against what your back end says actually happened." },
      { q: 'We already have an in-house media buyer. Is this still useful?', a: "Often more useful. The setup and the measurement build are one-time work that an in-house buyer inherits, and the daily written decisions are something they can argue with rather than a black box. Several accounts take the install and run it themselves from there." },
      { q: 'Do you handle Shopify tracking specifically?', a: "Yes — the pixel, the conversions API, deduplication, and the catalogue feed, since a broken or stale feed is one of the most common reasons an ecommerce account underperforms without anything obviously looking wrong." },
      { q: 'What about the rest of our marketing?', a: "We run Meta. If the constraint on your growth is email flows, search, or a marketplace, we will say so during the account check rather than quietly widening the scope to fill a retainer." },
    ],
    related: [
      { href: '/performance-marketing-agency', title: 'Performance marketing agency', note: 'What the term should mean.' },
      { href: '/ad-creative', title: 'Ad creative, without the shoot', note: 'Where volume comes from.' },
      { href: '/ecommerce-facebook-ads-agency', title: 'Ecommerce Facebook ads', note: 'The channel in detail.' },
    ],
    closing: { h2: 'Start with the numbers.', p: "Answer five questions about the account and Josh comes back with what the measurement is likely hiding and what it would cost to fix." },
  },
  {
    slug: 'meta-ads-agency',
    title: 'Meta Ads Agency (Australia) — Or a System You Own | Sevenam',
    description: 'Looking for a Meta ads agency in Australia? There is a structural alternative: a system installed on your own ad account, decisions at 7am, and a fixed fee.',
    eyebrow: 'META ADS', h1: 'Meta Ads Agency',
    lead: 'Same platform, different business model.',
    s1: {
      h2: 'What you are really buying from an agency.',
      paras: [
        "Strip a Meta ads retainer back and you are paying for three things: someone to decide what changes in the account, someone to make the creative that feeds it, and someone to explain what happened. The platform automates a growing share of the first, which is why agency fees have drifted upward while the work behind them has narrowed.",
        "The awkward part is that the fee is usually calculated on your media budget, so it rises with scale you generated — and none of the three jobs got harder when you doubled the spend.",
      ],
      items: [
        'Decisions, creative and reporting — that is the whole job.',
        'Meta now automates much of the campaign mechanics itself.',
        'A percentage fee grows with budget, not with work.',
        'Ownership of the account is the part nobody negotiates and should.',
      ],
    },
    s2: {
      h2: 'What replaces it.',
      paras: [
        "A one-time setup that builds the account, the tracking and the measurement properly, then a system that reads it every night and writes the day's decisions in plain English. You approve what you agree with; we action it in Ads Manager.",
        "Creative is ordered on demand and delivered in days, sized to what the account needs rather than to what the budget would justify as a percentage.",
      ],
      items: [
        'A setup you buy once and keep.',
        'Written decisions each morning, approved in about a minute.',
        'Creative production sized to the account, not to the fee.',
        'Reporting a non-specialist can actually audit.',
      ],
    },
    faqs: [
      { q: 'Is this just an agency with different branding?', a: "The test is what happens when you leave. With an agency you typically negotiate over the account, the pixel history and the creative files. Here they were always yours, so there is nothing to negotiate — and that changes the incentives on both sides." },
      { q: 'Do you ever recommend keeping our agency?', a: "Regularly. Plenty of account checks end with us saying the setup is sound and the problem is creative volume, which your existing agency may well be able to fix." },
      { q: 'What if we want you to do everything?', a: "Then the end-to-end option is what we quote — we buy the media, produce the creative and do the daily execution, still on your account and still for a fixed monthly." },
      { q: 'How is the monthly fee set if not on spend?', a: "On what the account actually needs: how much creative it consumes, how complex the structure is and how much execution you want us doing. It is quoted in writing before you commit and it does not move because you scaled." },
      { q: 'What spend does this suit?', a: "Roughly ten thousand a month in media and up. Under about three thousand there is not enough daily volume for any of it to pay for itself, and we will say so." },
    ],
    closing: { h2: 'Find out what your account is leaving on the table.', p: "Fifteen minutes with Josh, no pitch deck. Or answer five questions first and get a straight read on which part of this fits — or whether none of it does." },
    related: [
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'The same case, the other term.' },
      { href: '/agency-fee', title: 'Fee calculator', note: 'What a percentage really costs.' },
      { href: '/system', title: 'How it works', note: 'Overnight, then 7am.' },
    ],
  },
  {
    slug: 'instagram-ads-agency',
    title: 'Instagram Ads Agency (Australia) — One Auction, One System | Sevenam',
    description: 'Instagram ads run through the same Meta auction as Facebook. Here is why a separate Instagram agency is usually the wrong purchase, and what to do instead.',
    eyebrow: 'INSTAGRAM ADS', h1: 'Instagram Ads Agency',
    lead: 'Instagram is a placement, not a channel you buy separately.',
    s1: {
      h2: 'One auction, several surfaces.',
      paras: [
        "Instagram feed, Stories and Reels are placements inside the same Meta auction that serves Facebook. Buying them through a separate specialist means running a second account structure competing for the same impressions, usually against yourself, and splitting the conversion data that the system needs to learn from.",
        "What is genuinely different about Instagram is the creative. Reels and Stories are vertical, sound-on, fast-cut formats that fail badly when fed a resized square image — and that is a production problem, not an agency-selection problem.",
      ],
      items: [
        'Instagram placements are bought in the same auction as Facebook.',
        'Splitting them across providers splits the learning data too.',
        'The real difference is creative format, not media buying.',
        'Vertical, sound-on creative cannot be repurposed from static.',
      ],
    },
    s2: {
      h2: 'What actually needs solving.',
      paras: [
        "If Instagram is underperforming for you, the cause is almost always that it is being fed creative made for a different surface, at a volume too low to find what works in a format that fatigues quickly.",
        "The system handles the decisions; creative on demand handles the supply, in the formats each placement actually rewards.",
      ],
      items: [
        'Vertical video and Stories-native creative produced as a matter of course.',
        'Placement performance read daily rather than at month end.',
        'One account structure, so the platform learns from all of it.',
        'Creative replaced before frequency drives the cost up.',
      ],
    },
    faqs: [
      { q: 'Should we hire an Instagram specialist?', a: "For creative production, sometimes — the formats genuinely are a craft. For media buying, no: you would be running a second structure inside the same auction, which usually costs you more than it earns." },
      { q: 'Can we advertise on Instagram only?', a: "You can restrict placements, and it is usually a mistake. Letting the system serve where it converts and controlling the creative per placement almost always beats forcing the budget onto one surface." },
      { q: 'Do you make Reels and Stories creative?', a: "Yes, as part of the standard creative work rather than an add-on. Static repurposed into a vertical frame is the most common reason an account's Instagram numbers look bad." },
      { q: 'What about organic Instagram?', a: "We do not run organic social. It matters for brand and it is a different discipline, and we would rather say so than sell you something we are not built to do well." },
      { q: 'Is influencer content worth running as ads?', a: "Often, yes — creator-style footage tends to outperform polished brand film in feed. The mechanics of permissions and partnership tags need to be set up properly, which the setup covers." },
    ],
    closing: { h2: 'Find out what your account is leaving on the table.', p: "Fifteen minutes with Josh, no pitch deck. You will leave knowing whether your Instagram numbers are a buying problem or a creative one." },
    related: [
      { href: '/meta-ads-agency', title: 'Meta ads agency', note: 'One auction, one system.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'Volume is the constraint.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'Placements explained.' },
    ],
  },
  {
    slug: 'social-media-advertising-agency',
    title: 'Social Media Advertising Agency (Australia) — What to Buy Instead | Sevenam',
    description: 'Most social media advertising agencies bundle paid, organic and content into one retainer. Here is how to separate what works from what fills the invoice.',
    eyebrow: 'SOCIAL MEDIA ADVERTISING', h1: 'Social Media Advertising Agency',
    lead: 'The bundle is what makes the invoice hard to argue with.',
    s1: {
      h2: 'Paid and organic are different jobs.',
      paras: [
        "Most social media retainers bundle paid advertising, organic posting, community management and content production into a single monthly figure. That bundle is convenient to sell and almost impossible to evaluate, because the line item that is working and the line item that is not arrive as one number.",
        "Paid advertising is measurable to the dollar. Organic social is a brand and community function with a much longer, blurrier payback. Buying them together usually means the measurable half subsidises the unmeasurable half indefinitely.",
      ],
      items: [
        'Bundled retainers hide which half is actually working.',
        'Paid can be measured to the dollar; organic mostly cannot.',
        'Community management is a staffing cost, not a growth lever.',
        'Content volume for feeds is not the same as creative for ads.',
      ],
    },
    s2: {
      h2: 'What we do and what we do not.',
      paras: [
        "We do paid Meta advertising and the creative that feeds it. We do not do organic posting, community management or social strategy decks, and we would rather tell you that plainly than take the budget.",
        "If organic matters to you, keep whoever does it well and let the advertising be judged on its own numbers.",
      ],
      items: [
        'Media buying and creative production for Meta.',
        'Written decisions each morning, actioned in your account.',
        'No organic posting, no community management, no strategy decks.',
        'One fixed fee you can hold against one set of results.',
      ],
    },
    faqs: [
      { q: 'We want one provider for everything. Is that unreasonable?', a: "It is convenient, and it costs you the ability to tell which part is working. If you do bundle, insist on the paid advertising being reported and priced separately." },
      { q: 'Does organic social help paid performance?', a: "A credible profile helps conversion rates, so it is not nothing. It is a much weaker effect than most social retainers imply, and it is not a reason to buy them together." },
      { q: 'Do you handle TikTok, LinkedIn or YouTube?', a: "No. Meta is what we are built around, and spreading across platforms is how most agencies end up doing several things adequately." },
      { q: 'What about content for our feed?', a: "The creative we produce is built for advertising — hooks, formats and lengths that work in a paid auction. Some of it works organically, but that is a by-product rather than the brief." },
      { q: 'How do we compare your fee to our current retainer?', a: "Ask your current provider what portion of the retainer covers paid media management, then compare that figure alone. The fee calculator will show you the annual number if you are on a percentage." },
    ],
    closing: { h2: 'Find out what your account is leaving on the table.', p: "Fifteen minutes with Josh, no pitch deck. You will leave knowing which half of your social budget is actually producing revenue." },
    related: [
      { href: '/social-media-management-cost', title: 'Social media management cost', note: 'What the market charges.' },
      { href: '/facebook-marketing-agency', title: 'Facebook marketing agency', note: 'The same question, differently framed.' },
      { href: '/agency-fee', title: 'Fee calculator', note: 'What a percentage really costs.' },
    ],
  },
  {
    slug: 'facebook-marketing-agency',
    title: 'Facebook Marketing Agency (Australia) — The Alternative | Sevenam',
    description: 'A Facebook marketing agency sells you attention on a retainer. Here is the structural alternative: a system on your own account, for a fixed fee.',
    eyebrow: 'FACEBOOK MARKETING', h1: 'Facebook Marketing Agency',
    lead: 'You are buying attention, and attention is the thing agencies have least of.',
    s1: {
      h2: 'The attention problem.',
      paras: [
        "An agency's economics depend on one media buyer holding several accounts. That is not a criticism of the people; it is arithmetic. Your account gets a slice of a day, usually early in the month when reporting is due and late in the month when performance is questioned.",
        "The work that actually compounds — reading the account daily, catching the ad set that turned on Tuesday, replacing creative before frequency bites — is exactly the work that a shared-attention model cannot deliver consistently.",
      ],
      items: [
        'One buyer across many accounts means attention is rationed.',
        'The compounding work is daily, and daily is what gets skipped.',
        'Monthly reporting cycles set the rhythm, not the account.',
        'Nobody notices a nine-day drift until the month closes.',
      ],
    },
    s2: {
      h2: 'A system does not get distracted.',
      paras: [
        "The account is read every night, without exception, and the day's decisions are written before you are up. That is not a claim about being clever; it is a claim about consistency, which is where most accounts actually lose money.",
        "You approve what you agree with in about a minute, and we make the changes in Ads Manager for you.",
      ],
      items: [
        'The account is read every night, not when someone gets to it.',
        'Decisions arrive at 7am in plain English, with the numbers attached.',
        'You approve; we action it in your account the same morning.',
        'Creative ordered when you need it, delivered in days.',
      ],
    },
    faqs: [
      { q: 'Is there still a human involved?', a: "Yes — the system drafts the decisions and Josh reviews them before they reach you, and we do the execution in Ads Manager. The technology handles the reading and the drafting, which is the part that has to happen every single day." },
      { q: 'What happens if the system gets a decision wrong?', a: "You do not approve it. That is the entire point of the approval step, and it is why the reasoning is written out rather than hidden behind a score." },
      { q: 'Do we still get someone to talk to?', a: "Yes. There is no account manager layer, which mostly means you talk to the person doing the work rather than to someone relaying it." },
      { q: 'Is this cheaper than an agency?', a: "Sometimes substantially, sometimes not, depending on what you pay now. What it always is, is fixed — the fee does not move when your budget does." },
      { q: 'Can we try it without committing to everything?', a: "Start with the account check. Five days, a written read on what the account is doing and what would change, and no obligation to buy anything after it." },
    ],
    closing: { h2: 'Find out what your account is leaving on the table.', p: "Fifteen minutes with Josh, no pitch deck. You will leave knowing the two or three things costing you the most right now." },
    related: [
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'The full comparison.' },
      { href: '/system', title: 'How it works', note: 'Overnight, then 7am.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
  {
    slug: 'digital-marketing-agency',
    title: 'Digital Marketing Agency (Australia) — When to Specialise Instead | Sevenam',
    description: 'Full-service digital agencies run Meta as one line item among many. Here is when that costs you more than it saves, and what the alternative looks like.',
    eyebrow: 'DIGITAL MARKETING', h1: 'Digital Marketing Agency',
    lead: 'Full service is a staffing model, not a performance advantage.',
    s1: {
      h2: 'What full service actually means.',
      paras: [
        "A full-service agency sells SEO, paid search, paid social, email, web and content from one team. For a business doing a modest amount of each, that convenience is worth real money — one invoice, one relationship, one meeting.",
        "The trade comes when one channel starts carrying the business. At that point Meta is being run by whoever has capacity this week, inside a retainer where it is one line among six, and the depth the channel now needs is not there.",
      ],
      items: [
        'Convenience is the actual product, and it is worth something.',
        'Depth arrives channel by channel, not across all of them at once.',
        'The channel carrying your growth outgrows the bundle first.',
        'Nobody in a generalist team owns the daily decision.',
      ],
    },
    s2: {
      h2: 'When to specialise.',
      paras: [
        "The signal is usually spend. Once Meta is consistently past ten thousand a month, the cost of a decision made a week late exceeds whatever you saved by bundling — and the gap widens from there.",
        "This does not mean firing your agency. Most of our clients keep theirs for search, email and web, and move only the Meta account.",
      ],
      items: [
        'Past ten thousand a month, decision lag costs more than the bundle saves.',
        'Search, email and web can stay exactly where they are.',
        'One channel moving does not have to break the relationship.',
        'Your account and data stay yours throughout.',
      ],
    },
    faqs: [
      { q: 'Do we have to leave our current agency?', a: "No, and most do not. Moving the Meta account is the common arrangement; search, email, web and content stay where they are." },
      { q: 'Will our agency be difficult about the handover?', a: "Occasionally. It is far easier when the ad account was in your own Business Manager to begin with, which is the first thing the account check looks at." },
      { q: 'Is a specialist always better?', a: "No. Below about ten thousand a month in Meta spend, a competent generalist is usually the more sensible purchase, and we will tell you that rather than sell you a system." },
      { q: 'Do you do SEO or Google Ads?', a: "No. We do Meta advertising and the creative that feeds it, and nothing else." },
      { q: 'How do we compare the cost fairly?', a: "Ask your agency what share of the retainer is Meta management, and compare that number rather than the whole invoice." },
    ],
    closing: { h2: 'Find out what your account is leaving on the table.', p: "Fifteen minutes with Josh, no pitch deck. You will leave knowing whether your Meta spend has outgrown the bundle it sits in." },
    related: [
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'Why you might not need one.' },
      { href: '/google-ads-vs-facebook-ads', title: 'Google vs Facebook ads', note: 'Which does what.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
  {
    slug: 'facebook-ads-consultant',
    title: 'Facebook Ads Consultant (Australia) — Advice, Or Execution? | Sevenam',
    description: 'A Facebook ads consultant tells you what to do. Here is when advice is enough, when it is not, and what to buy in each case.',
    eyebrow: 'CONSULTING', h1: 'Facebook Ads Consultant',
    lead: 'Advice only pays if somebody actually does the work afterwards.',
    s1: {
      h2: 'The gap between knowing and doing.',
      paras: [
        "A good consultant will read your account and hand you a document that is entirely correct. Six weeks later most of it has not happened, because the people who were going to implement it had a business to run.",
        "This is the central weakness of consulting as a purchase for advertising: the analysis is the cheap part and the daily execution is the expensive part, and only one of them is being sold to you.",
      ],
      items: [
        'The audit is usually right and usually unimplemented.',
        'Execution capacity, not insight, is what most accounts lack.',
        'Advice ages quickly once the auction moves.',
        'A one-off document cannot make a decision on a Tuesday.',
      ],
    },
    s2: {
      h2: 'When advice is the right purchase.',
      paras: [
        "If you have someone capable in-house who is simply missing a second opinion, a consultant is excellent value and we will say so. The account check exists for exactly that case: five days, a written read on what is wrong, and no obligation to buy anything else.",
        "If nobody has capacity to act on it, buying advice is the more expensive mistake, and the system or the end-to-end option is the honest recommendation.",
      ],
      items: [
        'Someone in-house who can act: advice is good value.',
        'Nobody with capacity: advice is the expensive option.',
        'The account check is the diagnostic, sold on its own.',
        'No obligation to buy anything after it.',
      ],
    },
    faqs: [
      { q: 'Do you do consulting?', a: "The account check is the closest thing to it: five days, a written read on the account, and a plain list of what would change. Plenty of them end with us saying you do not need the rest of what we sell." },
      { q: 'Can we just buy a few hours of your time?', a: "Not really, and it would not serve you well. Advertising decisions need the context of the account and the data behind it, and an hour is not enough to build either honestly." },
      { q: 'What if we want the strategy but will execute ourselves?', a: "That works, and the guides cover most of what a competent in-house operator needs. The account check gives you the account-specific part." },
      { q: 'Is a freelancer a reasonable alternative?', a: "Often yes, particularly under about ten thousand a month in spend. The usual failure mode is part-time availability, so agree up front what happens when something needs deciding on a day they are not working." },
      { q: 'What does the account check actually produce?', a: "A written document covering account structure, tracking integrity, creative supply and where the money is going that should not be — with the specific changes ranked by what they are worth." },
    ],
    closing: { h2: 'Have your account read properly first.', p: "Five days, a straight read, and a written list of what would change. Some of those end with us telling you to keep who you have got." },
    related: [
      { href: '/check', title: 'Account check', note: 'The diagnostic, on its own.' },
      { href: '/how-to-run-meta-ads-yourself', title: 'Run it yourself', note: 'If you have the capacity.' },
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'The other option.' },
    ],
  },
  {
    slug: 'best-facebook-ads-agencies-australia',
    title: 'Best Facebook Ads Agencies in Australia — How to Judge Them | Sevenam',
    description: 'There is no objective best Facebook ads agency. Here are the questions that actually separate a good one from an expensive one, and what to ask before you sign.',
    eyebrow: 'CHOOSING A PROVIDER', h1: 'The Best Facebook Ads Agencies in Australia',
    lead: 'Nobody can rank them honestly, including us. Here is how to judge one yourself.',
    s1: {
      h2: 'Why every "best agencies" list is worthless.',
      paras: [
        "Lists of the best agencies are written either by the agencies themselves, by directories that charge for placement, or by publishers monetising the search term. None of them have seen inside the accounts, and account performance is not observable from the outside.",
        "That includes this page. We are not going to rank our competitors, and we are not a neutral party — what follows is the set of questions we would ask if we were buying rather than selling.",
      ],
      items: [
        'Rankings are usually paid, self-reported, or both.',
        'Nobody outside an account can judge how well it is run.',
        'Case study numbers are selected, never representative.',
        'We are not neutral here either, and you should assume that.',
      ],
    },
    s2: {
      h2: 'Six questions worth asking.',
      paras: [
        "Ask them of us as well. The answers tell you more than any portfolio, because they are about structure rather than talent — and structure is what persists after the pitch team leaves.",
      ],
      items: [
        'Who owns the ad account, the pixel and the creative files if we leave?',
        'Is the fee a percentage of spend, and what happens to it when we scale?',
        'Who makes the decision when performance turns on a Tuesday, and how fast?',
        'How much distinct creative will be in market each month, in numbers?',
        'What is the notice period, and what happens at the end of it?',
        'Can you show reporting a non-specialist could audit without you present?',
      ],
    },
    faqs: [
      { q: 'So who is the best agency in Australia?', a: "There is no defensible answer, and anyone who gives you one is guessing or selling. The best provider for you is the one whose structure fits how your business actually operates — which the six questions above will surface faster than any list." },
      { q: 'Are awards worth anything?', a: "Very little. Most are entered, paid for and judged on submitted case studies rather than on portfolio-wide performance." },
      { q: 'What about case studies?', a: "Read them for the mechanism, not the multiple. A case study that explains what was changed and why is informative; one that leads with a ROAS figure and no context is a selection effect." },
      { q: 'Should we run a pitch process?', a: "For a large budget, yes, and keep it short. Ask the six questions, ask each provider to read the same account, and compare what they noticed rather than what they promised." },
      { q: 'Would you tell us to go with someone else?', a: "We do it regularly. Plenty of account checks end with the honest answer being that the current provider is fine and the constraint is creative volume." },
    ],
    closing: { h2: 'Ask us the six questions.', p: "Fifteen minutes with Josh, no pitch deck. If the answers do not suit how you want to operate, that is a useful outcome too." },
    related: [
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'The structural comparison.' },
      { href: '/what-facebook-ads-agencies-charge', title: 'What agencies charge', note: 'The going rates.' },
      { href: '/agency-fee', title: 'Fee calculator', note: 'Your fee, in dollars a year.' },
    ],
  },
  {
    slug: 'facebook-ads-packages',
    title: 'Facebook Ads Packages — What You Are Actually Buying | Sevenam',
    description: 'Facebook ads packages bundle setup, management and creative into tiers. Here is how to read one, what is usually missing, and how we structure it instead.',
    eyebrow: 'PACKAGES', h1: 'Facebook Ads Packages',
    lead: 'Tiers are a pricing device. Read what is inside them.',
    s1: {
      h2: 'How packages are usually built.',
      paras: [
        "Bronze, silver and gold tiers are designed to make the middle option look reasonable. The variable that changes between them is rarely the quality of the work — it is the number of campaigns, the number of creative assets, or the reporting frequency, all of which are easy to enumerate and hard to value.",
        "What almost never appears in a package table is the thing that decides performance: how many distinct creative concepts go into market each month, and how quickly a decision gets made when the numbers move.",
      ],
      items: [
        'Tiers are structured to make the middle option look sensible.',
        'Countable items get listed; decisive ones rarely do.',
        'Creative volume is the number that matters, and is usually missing.',
        'Decision speed never appears in a package table at all.',
      ],
    },
    s2: {
      h2: 'How we structure it instead.',
      paras: [
        "A one-time setup you buy once and own, then creative ordered on demand, sized to what the account actually consumes. If you would rather hand the whole thing over, the end-to-end option is quoted after we have read the account.",
        "There are no tiers, because the useful variable is your account rather than a price point. Every figure is quoted in writing before you commit.",
      ],
      items: [
        'A setup bought once, owned permanently.',
        'Creative on demand, priced by what you order.',
        'An end-to-end option quoted after the account is read.',
        'Fixed fees, quoted in writing, priced to the work rather than your budget.',
      ],
    },
    faqs: [
      { q: 'Why are there no prices on this page?', a: "Because the honest figure depends on what the account needs, and a number picked before anyone has read it would be a guess dressed as a quote. Every figure is in writing before you commit to anything, and the conversation that produces it is free." },
      { q: 'Is there a minimum commitment?', a: "The setup is a four-week project with a fixed start and finish. Everything monthly is month to month with no notice period." },
      { q: 'Can we buy the setup and stop there?', a: "Yes, and some do. You own it — the account, the tracking, the structure and the documentation stay with you whether or not you buy anything else." },
      { q: 'How does the creative work?', a: "Concepts, hooks, cuts and statics produced end to end on our own AI line, ordered when you need them and delivered in days rather than weeks. Each one ships with its performance numbers attached, and there is no batch to commit to." },
      { q: 'Do you charge a percentage of ad spend?', a: "Our fees are priced to the work \u2014 installing the system, running the decisions, producing the creative. None of that gets harder because you spent more, so none of it costs more." },
    ],
    closing: { h2: 'Get the figures in writing.', p: "Fifteen minutes with Josh, no pitch deck. You will leave with every number written down, whether or not you buy anything." },
    related: [
      { href: '/pricing', title: 'How it works to buy', note: 'The three ways in.' },
      { href: '/what-facebook-ads-agencies-charge', title: 'What agencies charge', note: 'Market rates, in dollars.' },
      { href: '/install', title: 'The setup', note: 'Four weeks, then it is yours.' },
    ],
  },
  {
    slug: 'what-facebook-ads-agencies-charge',
    title: 'What Facebook Ads Agencies Charge in Australia (2026) | Sevenam',
    description: 'Typical Australian Facebook ads agency fees: percentage of spend, flat retainers and hybrid models — what each costs, and which one costs you most as you scale.',
    eyebrow: 'FEES', h1: 'What Facebook Ads Agencies Charge',
    lead: 'Three models, and only one of them charges you more for your own growth.',
    s1: {
      h2: 'The three pricing models.',
      paras: [
        "Australian agencies price Meta management in three ways. A percentage of ad spend, typically ten to twenty per cent of monthly media, is the most common arrangement at higher budgets — usually with a minimum monthly fee underneath it, often somewhere from five hundred to a thousand dollars and up, so small accounts do not fall below what the agency will service.",
        "A flat monthly retainer is increasingly favoured, partly because it removes the awkward incentive to recommend a bigger budget. For small and medium businesses these commonly run from around eight hundred dollars to five thousand and beyond, depending on how many channels and how much creative are inside the scope. Hybrid deals sit in between: a lower base fee plus a share — often ten to thirty per cent — of verified revenue, profit or qualified leads above an agreed baseline.",
        "These are market observations rather than our rates, and they move by city, agency size and what is included. The point is not the number; it is what each model does to your costs when the account grows.",
      ],
      items: [
        'Percentage of spend: commonly ten to twenty per cent of monthly media.',
        'Minimum monthly fees underneath it, often $500 to $1,000+.',
        'Flat retainer: roughly $800 to $5,000+ a month for SMEs, by scope.',
        'Hybrid: a lower base plus 10-30% of verified results above a baseline.',
        'Creative production is frequently quoted separately again.',
      ],
    },
    s2: {
      h2: 'What each model does as you scale.',
      paras: [
        "A percentage fee is the only one of the three where succeeding costs you more. Double the budget because the account is working and the invoice doubles, for work that did not double — and the scaling was largely your capital and your risk.",
        "A flat retainer has the opposite failure mode: it is stable until the account outgrows what the retainer was scoped for, at which point either the service quietly thins or the fee is renegotiated. The honest version of that conversation is the sign of a good provider.",
      ],
      items: [
        'Percentage: the fee compounds with budget you added yourself.',
        'Flat: stable, until scope and spend drift apart.',
        'Hybrid: usually behaves like a percentage at the level that matters.',
        'Whichever it is, ask what happens at double your current spend.',
      ],
    },
    faqs: [
      { q: 'Is ten to twenty per cent of spend reasonable?', a: "It depends entirely on your spend. At five thousand a month it is a modest fee for real work, and the minimum monthly fee most agencies apply probably matters more than the percentage. At a hundred thousand a month the same percentage is a very large number for work that has not changed much — put both into the fee calculator and the difference is stark." },
      { q: 'What about performance or hybrid pricing?', a: "A lower base fee plus a share of results above an agreed baseline — commonly ten to thirty per cent of verified revenue, profit or qualified leads. It can align incentives well, and the whole thing rests on how the baseline is set and who verifies the numbers. Agree both in writing before you start." },
      { q: 'What do you charge?', a: "A fixed setup fee and a fixed monthly, quoted in writing after we have read your account, priced to the work rather than your media budget. The figure depends on how much creative the account consumes and how much execution you want us doing." },
      { q: 'Should creative be included in the management fee?', a: "It rarely is, and you should confirm it explicitly. Creative volume is the single biggest driver of performance, so a management fee that excludes it is only paying for half the job." },
      { q: 'Is there a standard setup or onboarding fee?', a: "Many agencies charge one, often equivalent to a month or two of retainer. What matters more is what you own at the end of it — an onboarding that builds the account in the agency's Business Manager is worth considerably less to you." },
      { q: 'How do we work out what we are really paying?', a: "Add the management fee, the creative cost and any platform or reporting fees, then divide by media spend. That effective percentage is the number to compare, and it is usually higher than the headline." },
    ],
    closing: { h2: 'See your fee as an annual number.', p: "The calculator takes about a minute. Then fifteen minutes with Josh if the number bothers you — no pitch deck." },
    related: [
      { href: '/agency-fee', title: 'Fee calculator', note: 'Your fee, in dollars a year.' },
      { href: '/facebook-ads-cost-australia', title: 'Facebook ads cost', note: 'Media, not fees.' },
      { href: '/pricing', title: 'How it works to buy', note: 'The three ways in.' },
    ],
  },
  {
    slug: 'social-media-management-cost',
    title: 'Social Media Management Cost in Australia (2026) | Sevenam',
    description: 'What social media management costs in Australia, what is usually bundled into it, and how to tell which part of the retainer is actually producing revenue.',
    eyebrow: 'COSTS', h1: 'Social Media Management Cost',
    lead: 'The number is easy to find. Working out what it buys is the hard part.',
    s1: {
      h2: 'What the retainer usually covers.',
      paras: [
        "Social media management in Australia usually bundles content production, scheduling, community management and some amount of paid advertising into one monthly fee. Published ranges are wide — a small business package and an enterprise retainer can differ by more than an order of magnitude — because the contents differ that much too.",
        "The comparison most businesses never make is which of those components produce measurable revenue. Paid advertising can be traced to the dollar. Posting frequency and follower growth largely cannot.",
      ],
      items: [
        'Content, scheduling, community management and ads, in one figure.',
        'Published ranges vary enormously because the scope does.',
        'Only the paid component has a clean revenue trace.',
        'Follower and engagement metrics rarely map to sales.',
      ],
    },
    s2: {
      h2: 'How to separate the bill.',
      paras: [
        "Ask for the retainer broken into paid media management, creative production and organic activity, with the hours or deliverables against each. Providers doing good work will answer without difficulty; the question is uncomfortable only where the split is unflattering.",
        "Then judge the paid line on its own numbers. If it cannot carry its own cost, no amount of organic activity around it changes that.",
      ],
      items: [
        'Ask for paid, creative and organic to be priced separately.',
        'Judge the paid line against revenue it can be traced to.',
        'Judge organic on brand goals, not on sales it did not make.',
        'A provider who cannot split the bill is telling you something.',
      ],
    },
    faqs: [
      { q: 'What should we expect to pay?', a: "For small and medium businesses in Australia, retainers commonly run from around eight hundred dollars a month to five thousand and beyond, and the spread is that wide because the scope is. A retainer covering daily posting, community management and a modest ad budget looks nothing like one covering serious media buying and weekly creative production. Ask what portion is paid media management before comparing anything." },
      { q: 'Is organic social worth paying for?', a: "For some businesses genuinely yes — it is brand, service and community. Just do not buy it expecting it to perform like advertising, and do not let it be measured as though it does." },
      { q: 'Do you offer social media management?', a: "No. We do paid Meta advertising and the creative that feeds it. If organic matters to you, keep whoever does it well." },
      { q: 'How much of a retainer should be creative?', a: "More than most are. Creative volume drives paid performance more than any other variable, so a retainer that is mostly scheduling and reporting is weighted toward the wrong work." },
      { q: 'What is the cheapest sensible option?', a: "Under about three thousand a month in media, running it yourself off good guides and spending the money on creative instead. We will say that plainly rather than sell you a system." },
    ],
    closing: { h2: 'Find out which half is working.', p: "Fifteen minutes with Josh, no pitch deck. You will leave knowing what your paid line is actually returning." },
    related: [
      { href: '/social-media-advertising-agency', title: 'Social media advertising', note: 'Paid and organic are different jobs.' },
      { href: '/what-facebook-ads-agencies-charge', title: 'What agencies charge', note: 'The going rates.' },
      { href: '/agency-fee', title: 'Fee calculator', note: 'What a percentage really costs.' },
    ],
  },
  {
    slug: 'facebook-ads-cost-australia',
    title: 'How Much Do Facebook Ads Cost in Australia? (2026) | Sevenam',
    description: 'What Facebook and Instagram ads cost in Australia — how CPMs are set, what actually moves your cost per result, and why benchmarks are mostly useless.',
    eyebrow: 'COSTS', h1: 'How Much Do Facebook Ads Cost in Australia?',
    lead: 'You do not buy a price. You win an auction, repeatedly.',
    s1: {
      h2: 'What you are actually paying for.',
      paras: [
        "Meta sells impressions through a continuous auction. What you pay per thousand impressions depends on who else wants to reach the same people at the same moment, how relevant your ad appears to be, and how aggressively the platform expects your ad to perform. None of that is a rate card, which is why published benchmark tables are close to useless for planning.",
        "The number that matters is not CPM anyway. It is cost per result — and the same CPM produces wildly different results depending on the creative sitting behind it.",
      ],
      items: [
        'Media price is set by a live auction, not a rate card.',
        'Benchmarks average across categories that behave nothing alike.',
        'Relevance and expected performance change what you pay.',
        'Cost per result, not CPM, is the number worth managing.',
      ],
    },
    s2: {
      h2: 'What actually moves your cost per result.',
      paras: [
        "In practice, creative explains more of the variance than any setting in the account. A stronger hook lowers the cost of the same audience more reliably than any amount of targeting refinement, because the platform rewards ads people stop for.",
        "The second lever is decision speed. Money lost to an ad set left running past the point it turned is invisible on any benchmark chart and very visible in a quarter's numbers.",
      ],
      items: [
        'Creative quality and volume: the largest single lever.',
        'Decision speed: how fast losing spend is stopped.',
        'Offer and landing experience, which no ad can rescue.',
        'Audience size, which sets how fast frequency climbs.',
      ],
    },
    faqs: [
      { q: 'What is a typical CPM in Australia?', a: "Wide enough that quoting one would mislead you. It moves by category, season, audience size and time of year — retail in the weeks before Christmas is a different market to B2B in February. Your own account's history is a far better guide than any published average." },
      { q: 'What is a good cost per purchase?', a: "Whatever leaves you a margin you are happy with at the volume you want. A twenty dollar cost per purchase is excellent for a hundred dollar basket and fatal for a thirty dollar one." },
      { q: 'Do ads get more expensive as you scale?', a: "Usually a little, yes — you exhaust the cheapest attention first. Good creative volume flattens that curve considerably; nothing removes it entirely." },
      { q: 'Is there a minimum budget worth starting with?', a: "Enough for the platform to gather signal, which in practice means a few thousand a month at minimum. Below that you are paying to learn very slowly." },
      { q: 'Does the fee model change what media costs?', a: "Not the media itself, but it changes your total cost per result. A percentage fee adds a fixed proportional cost to every dollar of spend, and that shows up in cost per acquisition just as surely as CPM does." },
    ],
    closing: { h2: 'Find out what your results actually cost.', p: "Fifteen minutes with Josh, no pitch deck. You will leave knowing what is inflating your cost per result and what would bring it down." },
    related: [
      { href: '/what-facebook-ads-agencies-charge', title: 'What agencies charge', note: 'Fees, not media.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'How the auction works.' },
      { href: '/scaling-meta-ads', title: 'Scaling Meta ads', note: 'What breaks as you grow.' },
    ],
  },
];

function build() {
  return PAGES.map(p => ({
    path: '/' + p.slug,
    title: p.title,
    description: p.description,
    eyebrow: p.eyebrow,
    h1: p.h1,
    lead: p.lead,
    support: SUPPORT,
    gallery: p.gallery,
    sections: [
      { tone: 'paper', h2: p.s1.h2, paras: p.s1.paras, items: p.s1.items },
      { tone: 'ink', h2: p.s2.h2, paras: p.s2.paras, items: p.s2.items },
      /* /ad-creative carries the ownership argument in its FAQ instead — the page
         is long enough already, and repeating the section there pushes the
         creative case below the fold on a page that has to sell creative. */
      ...(p.skipOwnership ? [] : [{ tone: 'paper', h2: OWNERSHIP.h2, paras: OWNERSHIP.paras, items: OWNERSHIP.items }]),
    ],
    gantt: p.gantt,
    steps: p.steps,
    toolstrip: p.toolstrip,
    faqs: p.faqs,
    related: p.related,
    closing: p.closing,
    service: { name: p.h1, areaServed: 'AU' },
    breadcrumb: [{ name: 'Home', path: '/' }, { name: p.h1, path: '/' + p.slug }],
  }));
}

module.exports = { build, PAGES };
