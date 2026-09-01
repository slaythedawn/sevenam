/* Head-term and commercial-intent pages. Each of these competes for a query where
   the searcher is looking for an agency — so each argues the same structural case
   from the angle of the term itself rather than repeating one page nine times.

   No Sevenam dollar figures appear anywhere here: pricing is quoted in writing
   after the account is read. Market rates quoted on the cost pages are described
   as typical industry ranges, never as ours. */

const SUPPORT = "Sevenam installs a Meta advertising system on your own ad account and runs the technology that operates it — written decisions at 7am every morning telling you exactly what to do that day. One fixed setup fee, a fixed monthly, priced to the work.";

const OWNERSHIP = {
  h2: 'What you own at the end of it.',
  paras: [
    "Everything is built inside your own Business Manager from the first hour — the ad account, the pixel, the audiences, the creative files and the reporting. There is no agency-owned account that you rent access to, and nothing to negotiate over if the relationship ends.",
    "That single structural choice is what makes the rest of it possible. An arrangement where the provider owns the asset has to be renewed; one where you own it has to be earned.",
  ],
  items: [
    'Your ad account, your pixel, your creative library. Always.',
    'A fixed setup fee and a fixed monthly, priced to the work.',
    'Month to month, with no notice period.',
    'Every decision written down, with the numbers behind it.',
  ],
};

const PAGES = [
  {
    slug: 'pricing-call',
    title: 'Book a 15-Minute Pricing Call | Sevenam',
    description: 'The setup is $19,500, the daily decisions $2,500 a month, creative packages from $5,000. Fifteen minutes to size those to your account.',
    eyebrow: 'PRICING CALL', h1: 'Fifteen minutes, straight numbers.',
    lead: 'The prices are published. The call is where they get sized to your account.',
    skipOwnership: true,
    s1: {
      h2: 'What the fifteen minutes covers.',
      paras: [
        "The numbers are already on the site: $19,500 for the setup, $2,500 a month for the daily decisions, creative packages from $5,000. What the call adds is which of them your account actually needs, how much creative it would consume, and whether the end-to-end option beats hiring for it.",
        "You get that in fifteen minutes. If nothing here is worth buying yet, you get that instead.",
      ],
      items: [
        'Which of the four your account actually needs.',
        'What creative costs at the volume you would order.',
        'Whether the setup on its own is the better purchase.',
        'The two or three things we would fix first.',
      ],
    },
    s2: {
      h2: 'How the pricing works.',
      paras: [
        "The setup is $19,500 \u2014 four weeks of fixed scope, the same number whatever you spend. The daily decisions are $2,500 a month once it is live. Creative packages start at $5,000, and how far past that you go depends on what the account consumes. Every figure excludes GST.",
        "There are no tiers. Four things you can buy, any of them on their own, and the end-to-end option is the only one quoted after we read the account.",
      ],
      items: [
        'The setup is $19,500 plus GST, agreed before anything starts.',
        'The daily decisions are $2,500 a month plus GST, whatever you spend.',
        'Creative packages start at $5,000, ordered when the account needs it.',
        'No tiers, no packages, no minimum term.',
      ],
    },
    /* The hero CTA is the form on this page, not /apply. Somebody who searched
       for a price and landed here should reach the fields in place rather than
       being sent somewhere else for the same four. */
    ctaHref: '#pricing-call',
    ctaLabel: 'Request a call',
    callForm: {
      label: 'Twenty seconds',
      h2: 'Four things, then a time.',
      p: 'Where to reply, what you run, and what you are after. One reply from a person, within a business day.',
    },
    faqs: [
      { q: 'Is this a sales call?', a: "It is a pricing call. The headline numbers are already published, so the fifteen minutes goes on what your account needs. If it is not a fit, we say so on the call." },
      { q: 'Do I need to prepare anything?', a: "No. Knowing roughly what you spend a month helps, but it is not required." },
      { q: 'What happens after the call?', a: "You get the figures in writing the same day. If you want to go ahead, we agree a start date. If not, nothing follows." },
      { q: 'Do you sell packages or tiers?', a: "No. Four things you can buy, any of them on their own." },
      { q: 'What do I have to fill in?', a: "Four things: where to reply, your website, roughly what you spend a month, and which of the four you are after. It takes about twenty seconds and Josh replies himself." },
    ],
    closing: { h2: 'Same four fields, wherever you start.', p: "The form above is the one on every page. Fill it in here or on /apply \u2014 either way it reaches Josh, and he replies with a time." },
    related: [
      { href: '/pricing', title: 'How buying works', note: 'Four ways, no tiers.' },
      { href: '/install', title: 'The setup', note: 'Four weeks, fixed price.' },
      { href: '/agency-fee', title: 'Agency fee calculator', note: 'What percentage fees cost.' },
    ],
  },
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
    eyebrow: 'AD CREATIVE', h1: 'Ad creative, without waiting on a shoot.',
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
    closing: { h2: 'Order what the account needs.', p: "Tell us four things about the account and Josh comes back with what it would cost and whether creative alone is the right buy." },
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
      { q: 'Do you work with brands outside Australia?', a: "Yes. We are based in Sydney and most of the businesses we work with we have never met in person &mdash; the system is delivered remotely and the decisions land first thing in your morning, whichever morning that is. The auction does not know where your operator sits. What matters is that somebody reads the account properly and acts on it the same day." },
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
      { href: '/performance-marketing-agency-singapore', title: 'Singapore', note: 'A dense, expensive auction.' },
      { href: '/performance-marketing-agency-malaysia', title: 'Malaysia', note: 'Cheap media, harder margin.' },
    ],
    closing: { h2: 'Have the account read first.', p: "Tell us four things and Josh comes back with what the account needs, what it would cost, and whether it is worth doing at all." },
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
    closing: { h2: 'Start with the numbers.', p: "Tell us four things about the account and Josh comes back with what the measurement is likely hiding and what it would cost to fix." },
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
      { q: 'Is a Meta advertising agency the same thing as a Meta ads agency?', a: "Yes — they are the same search with different wording, and the results Google returns for each are largely the same pages. What the words do hint at is scope: “Meta advertising” tends to imply the message and the creative as well as the buying, which is the more useful way to think about it now that Meta's own models handle targeting, bidding and placement." },
      { q: 'Is this just an agency with different branding?', a: "The test is what happens when you leave. With an agency you typically negotiate over the account, the pixel history and the creative files. Here they were always yours, so there is nothing to negotiate — and that changes the incentives on both sides." },
      { q: 'Do you ever recommend keeping our agency?', a: "Regularly. Plenty of account checks end with us saying the setup is sound and the problem is creative volume, which your existing agency may well be able to fix." },
      { q: 'What if we want you to do everything?', a: "Then the end-to-end option is what we quote — we buy the media, produce the creative and do the daily execution, still on your account and still for a fixed monthly." },
      { q: 'How is the monthly fee set if not on spend?', a: "On what the account actually needs: how much creative it consumes, how complex the structure is and how much execution you want us doing. It is quoted in writing before you commit and it does not move because you scaled." },
      { q: 'What spend does this suit?', a: "Roughly ten thousand a month in media and up. Under about three thousand there is not enough daily volume for any of it to pay for itself, and we will say so." },
    ],
    closing: { h2: 'Find out what your account is leaving on the table.', p: "Fifteen minutes with Josh, no pitch deck. Or leave your details first and get a straight read on which part of this fits — or whether none of it does." },
    related: [
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'The same case, the other term.' },
      { href: '/agency-fee', title: 'Fee calculator', note: 'What a percentage really costs.' },
      { href: '/system', title: 'How it works', note: 'Overnight, then 7am.' },
      { href: '/meta-ads-agency-new-zealand', title: 'New Zealand', note: 'A market that saturates fast.' },
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
    title: 'Social Media Advertising Agency Australia | Sevenam',
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
    pills: { label: 'Digital marketing by city', links: [
      { href: '/digital-marketing-agency-sydney', label: 'Sydney' },
      { href: '/digital-marketing-agency-melbourne', label: 'Melbourne' },
      { href: '/digital-marketing-agency-brisbane', label: 'Brisbane' },
      { href: '/digital-marketing-agency-perth', label: 'Perth' },
      { href: '/digital-marketing-agency-canberra', label: 'Canberra' },
    ] },
    title: 'Digital Marketing Agency Australia — Or Specialise | Sevenam',
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
      { q: 'Are you a Meta ads consultant or a Facebook ads consultant?', a: "Both describe the same work. Facebook and Instagram are one auction inside Meta, so there is no separate Facebook engagement and Meta engagement — there is one account, read end to end. The account check covers every surface the account runs on rather than only the Facebook placements." },
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
    tables: [
      {
        wrap: true,
        h2: 'What to ask, and what the answer tells you.',
        lead: 'Six questions that separate providers faster than any shortlist. The point is not the answer — it is whether they can give one without rearranging the question.',
        columns: ['Ask this', 'A good sign', 'A warning'],
        rows: [
          ['Who owns the ad account and the pixel?', 'Yours, on your Business Manager, from the first day', 'Theirs, "for efficiency", handed over at the end if you ask'],
          ['How is the fee structured?', 'A figure, in writing, that does not move when your budget does', 'A percentage of spend, so scaling your business raises their invoice'],
          ['What happens in the first thirty days?', 'A specific list with dates against it', 'Discovery, strategy and onboarding, none of which are deliverables'],
          ['Who actually touches the account?', 'A named person, and you speak to them', 'An account manager who relays to someone you never meet'],
          ['How much creative do you produce a month?', 'A number, and examples of what happened to last month’s', 'Talk about quality over quantity, which usually means very little of either'],
          ['What would make you tell us to stop?', 'A straight answer, including margins or spend that are too low', 'Nothing — every business is a fit, which means none of them are'],
        ],
        note: 'Ask all six on one call. Any provider worth hiring answers them in about ten minutes, and the ones who cannot will spend that ten minutes explaining why the questions are the wrong ones.',
      },
    ],
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
        'Fixed fees, quoted in writing, priced to the work.',
      ],
    },
    tables: [
      {
        wrap: true,
        h2: 'What a tier table lists, and what decides the result.',
        lead: 'Set one against the other. The left column is what almost every package page enumerates; the right is what actually moves cost per result, and it is nearly always absent.',
        columns: ['', 'Usually in the table', 'Usually not, and it matters more'],
        rows: [
          ['Creative', 'A count of assets — "12 ad creatives a month"', 'How many *distinct concepts*, and what happened to last month’s losers'],
          ['Campaigns', 'A number of campaigns or ad sets', 'Whether the structure lets the model learn, or splits data into pieces too small to read'],
          ['Reporting', 'Weekly or monthly, sometimes a dashboard', 'Who reads it, and what they are allowed to change on the strength of it'],
          ['Decisions', 'Not listed', 'How long a losing ad set runs before someone stops it'],
          ['Measurement', 'Assumed to work', 'Whether the conversion events match what the business actually banked'],
          ['Ownership', 'Rarely stated', 'Whose Business Manager it is built on, and what leaves with you'],
        ],
        note: 'Countable things go in the table because they are easy to put in a table. That is the whole reason tiers are built from asset counts rather than from the two variables — creative volume and decision speed — that explain most of the difference between accounts.',
      },
    ],
    faqs: [
      { q: 'What does it cost?', a: "The setup is $19,500 once. The daily decisions are $2,500 a month after it is live. Creative packages start at $5,000. Every figure excludes GST. The end-to-end option is the only one quoted after we read the account, because that figure genuinely depends on how many accounts and markets you run." },
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
    description: 'What Australian Facebook ads agencies actually charge, from the seven that publish a price. Sourced ranges for management and creative, with each figure named to its source.',
    eyebrow: 'FEES', h1: 'What Facebook Ads Agencies Charge',
    lead: 'Seven Australian agencies publish a price. Here is what they charge, and what the rest will not say.',
    s1: {
      h2: 'Almost nobody publishes a price.',
      paras: [
        'An audit by Digital Nomads HQ in June 2026 read 411 service lines across 140 Australian agencies. It found 78% publish no pricing at all, and only 8% publish a genuine rate card. Paid social is the least transparent service of the lot. Attribute that to DNHQ Research \u2014 it is an agency-run audit of advertised website prices, not invoices, and it is still the only Australian dataset with a stated method and sample.',
        'There is no industry benchmark to fall back on. AiMCO publishes disclosure guidance but no rate card. IAB Australia measures spend, not fees. No regulator publishes anything. So the figures below come from the handful of agencies that put a number on their own site, each named against the row it belongs to.',
      ],
      items: [
        'Seven Australian providers publish a Meta or paid social management price.',
        'Only one \u2014 Aesthetic Digital Marketing \u2014 publishes a complete spend-banded matrix.',
        'No large agency publishes anything at all.',
        'Fewer than 1 in 10 state whether the price includes GST. Where stated, it is almost always excluded.',
        'Only 22% state a minimum spend, and "no lock-in" often sits beside a 3, 6 or 12 month initial period.',
      ],
    },
    tables: [
      {
        h2: 'Published management fees.',
        lead: 'Australian agencies that publish a monthly management price on their own site. Named against each row, because that is the only thing that makes a figure checkable.',
        columns: ['Model', 'Monthly', 'Basis', 'Source'],
        rows: [
          ['Spend-banded flat fee', '$500 \u2013 $2,000', 'Rate card, ex GST, per platform', 'Aesthetic Digital Marketing'],
          ['Flat packages', '$1,250 \u2013 $2,500', 'Rate card, three tiers', 'Webapex'],
          ['Flat fee, entry point', 'from $1,200', 'Rate card, ex GST, floor only', 'Click Click Media'],
          ['Productised low end', '$299 \u2013 $399', 'Own offer, narrow scope', 'Meta Ads Guys; workspacein'],
          ['Published entry prices, market-wide', '$695 \u2013 $2,500', 'Audit of advertised prices; median $1,200', 'DNHQ Research, Jun 2026'],
          ['Full-service retainer', 'from $4,000', 'Rate card, ex GST, 3-month minimum', 'Aesthetic Digital Marketing'],
          ['One-off setup or onboarding', '$499 \u2013 $2,500', 'One-off, several rate cards', 'DNHQ; Aesthetic; Webapex; Mink'],
        ],
        note: 'AUD. GST treatment as stated by each source. Percentage-of-spend fees are deliberately absent: no Australian agency publishes a percentage rate card, and the 10\u201320% figure repeated across agency blogs has no traceable origin. Treat it as commonly cited, not as a market rate. Hybrid models and large-agency fees have no published Australian example at all, so no range is given.',
      },
      {
        h2: 'Published creative prices.',
        lead: 'Paid social creative, from Australian sources that name a figure. Thinner ground than management fees, and the gaps are marked.',
        columns: ['What', 'Price', 'Note', 'Source'],
        rows: [
          ['UGC video, simple brief', '$150 \u2013 $300', 'One hook, organic use only', 'Australia Experiences'],
          ['UGC video, scripted multi-hook', '$300 \u2013 $600', 'Several hook variations', 'Australia Experiences'],
          ['UGC video, specialist brief', '$600 \u2013 $1,500', 'Finance, health, B2B', 'Australia Experiences'],
          ['Paid ad rights, add-on', '+50% to +200%', '90 days to perpetual, on top of base', 'Australia Experiences'],
          ['Creative add-on pack', '$750/mo', 'Ex GST, sized by volume', 'Aesthetic Digital Marketing'],
          ['Creative inside a retainer', 'up to 8 pieces/mo', 'Inside the $4,000 retainer', 'Aesthetic Digital Marketing'],
          ['Agency-shot short-form batch', '$2,500 \u2013 $8,000', 'Blog estimates, low confidence', 'Ivory Media; Vidico'],
        ],
        note: 'AUD. Usage rights are the biggest hidden multiplier: a $200 video with perpetual paid rights can reach $600 before anyone has bought media. Raw footage is typically charged at half the base rate again, and whitelisting adds a recurring monthly charge. No Australian source publishes a per-static-ad price, so none is given here.',
      },
    ],
    s2: {
      h2: 'Why two quotes are never comparable.',
      paras: [
        'The headline number is the least informative part of a quote. Aesthetic bills each platform separately against that platform\u2019s own spend, so a $1,000 fee becomes $2,000 the moment Google is added. Webapex bundles ad copy and creative design into a $1,250 package. Click Click Media states plainly it is not a content factory. Two quotes an identical distance apart can differ by the entire creative budget.',
        'Band edges bite too. Under a spend-banded matrix a client at $5,900 of media pays one fee and a client at $6,000 pays the next one up. And setup fees, where they exist at all, are usually revealed at proposal stage rather than on the site.',
      ],
      items: [
        'Ask whether the fee is per platform or combined.',
        'Ask whether the price includes GST. Most published prices exclude it.',
        'Ask what creative is included, and what a piece past the cap costs.',
        'Ask for the setup fee in writing before the proposal stage.',
        'Add fee, creative and platform costs, then divide by media. That effective percentage is the comparable number.',
      ],
    },
    faqs: [
      { q: 'Is ten to twenty per cent of spend reasonable?', a: "That figure is commonly cited in agency blogs, but no Australian agency publishes a percentage rate card, so treat it as folklore rather than a market rate. What matters is your spend: at five thousand a month a percentage is a modest fee for real work, and the minimum monthly underneath it probably matters more. At a hundred thousand a month the same percentage is a very large number for work that has not changed much. Put both into the fee calculator." },
      { q: 'What about performance or hybrid pricing?', a: "A lower base fee plus a share of results above an agreed baseline. No Australian agency publishes an example, so there is no range worth quoting. It can align incentives well, and the whole thing rests on how the baseline is set and who verifies the numbers. Agree both in writing before you start." },
      { q: 'What do you charge?', a: "A fixed setup fee and a fixed monthly, quoted in writing after we have read your account, priced to the work. The figure depends on how much creative the account consumes and how much execution you want us doing." },
      { q: 'Should creative be included in the management fee?', a: "It rarely is, and you should confirm it explicitly. Creative volume is the single biggest driver of performance, so a management fee that excludes it is only paying for half the job." },
      { q: 'Is there a standard setup or onboarding fee?', a: "Where published, setup fees run from about $499 to $2,500, and the DNHQ audit found they are often revealed only at proposal stage. What matters more is what you own at the end of it — an onboarding that builds the account in the agency's Business Manager is worth considerably less to you." },
      { q: 'How do we work out what we are really paying?', a: "Add the management fee, the creative cost and any platform or reporting fees, then divide by media spend. That effective percentage is the number to compare, and it is usually higher than the headline." },
    ],
    /* Below the closing CTA on purpose. Most of these are agencies competing for
       the same lead, so the links sit at the foot of the page and carry nofollow;
       the DNHQ audit and TRIBE are credited with a real follow link because we
       quote their figures by name. */
    sources: {
      updated: '30 August 2026',
      method: 'Every figure on this page was taken from a price the named business publishes on its own site, or from a stated-method audit. Nothing is estimated, averaged across sources, or converted between currencies. Where Australian data does not support a range \u2014 percentage-of-spend bands, hybrid models, large-agency fees, per-static creative \u2014 no range is given.',
      items: [
        { name: 'Digital Nomads HQ \u2014 Digital Marketing Cost in Australia', href: 'https://digitalnomadshq.com.au/blog/digital-marketing-cost/', note: 'Audit of published prices, 411 service lines across 140 agencies, June 2026. Quoted with attribution to DNHQ Research', credit: true },
        { name: 'TRIBE \u2014 A Rundown on the TRIBE Fee', href: 'https://www.tribegroup.co/blog/rundown-on-tribes-fee', note: 'Published platform fee structure, December 2024', credit: true },
        { name: 'Aesthetic Digital Marketing', href: 'https://aestudio.au/paid-advertising/pricing/', note: 'Published rate card, 22 July 2026' },
        { name: 'Click Click Media', href: 'https://clickclickmedia.com.au/paid-social-agency/', note: 'Published entry price, 2 August 2026' },
        { name: 'Webapex', href: 'https://www.webapex.com.au/facebook-ads-cost', note: 'Published packages, page undated' },
        { name: 'Mink Media', href: 'https://minkmedia.com.au/pricing/facebook-ads-packages/', note: 'Published setup fees, indexed January 2023' },
        { name: 'Australia Experiences', href: 'https://australiaexperiences.com/blog/ugc-creator-rates-australia/', note: 'UGC rate benchmark, method stated, August 2026' },
      ],
    },
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
    roasCalc: {
      id: 'retainer',
      disclaimer: 'It assumes the split you enter is accurate and that the paid line is doing only paid work. Effective rate is a comparison device, not a judgement: a higher rate on a smaller budget can still be the better deal.',
      label: 'WORK IT OUT',
      h2: 'What the paid line actually costs you.',
      p: 'Once the retainer is split, the number worth having is what the paid management works out to as a share of the media it manages. It is the same comparison a percentage-of-spend agency invites, made on a retainer that never mentions a percentage.',
      defaults: { retainer: 4500, spend: 30000, paid: 40 },
      fields: [
        { key: 'retainer', label: 'Monthly retainer', min: 1000, max: 30000, step: 250, hint: 'The whole invoice, before you split it.' },
        { key: 'spend', label: 'Monthly ad spend', min: 5000, max: 300000, step: 1000, hint: 'Media only. This is the budget the paid line is managing.' },
        { key: 'paid', label: 'Share on paid management', min: 5, max: 100, hint: 'Ask for the split. A provider doing good work answers without difficulty.' },
      ],
      outputs: [
        { key: 'effective', label: 'Effective rate on your media' },
        { key: 'paid', label: 'Paid management, a year' },
        { key: 'rest', label: 'Creative and organic, a year' },
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
    roasCalc: {
      id: 'cpr',
      disclaimer: 'It assumes one flat conversion rate from click to sale, no returns and no repeat purchase, and it holds two of the three rates still while you move the third — a real account moves all three at once.',
      label: 'WORK IT OUT',
      h2: 'What a result actually costs.',
      p: 'CPM is the number everyone benchmarks and the least useful of the three. Move the click-through and conversion rates instead \\u2014 they sit between an impression and a sale, and they move cost per result far harder than the media price does.',
      defaults: { cpm: 200, ctr: 100, cvr: 250 },
      fields: [
        { key: 'cpm', label: 'CPM', min: 50, max: 600, hint: 'What the auction charges per thousand impressions. Australian all-industry sits around $14\\u2013$20.' },
        { key: 'ctr', label: 'Click-through rate', min: 10, max: 500, hint: 'The share of impressions that click. This is a creative number.' },
        { key: 'cvr', label: 'Landing conversion rate', min: 10, max: 1500, hint: 'The share of clicks that buy. This is an offer and a page, not an ad.' },
      ],
      outputs: [
        { key: 'cpa', label: 'Cost per result' },
        { key: 'cpc', label: 'Cost per click' },
        { key: 'lever', label: 'CTR lever vs CPM lever' },
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

  {
    /* "ecommerce marketing agency" is 400 a month at KD 6 and had no page. The
       trap is that the term covers email, SEO, retention and paid — four of which
       we do not sell. Pretending otherwise wins the click and loses the call, so
       the page scopes itself honestly and argues for sequencing instead. */
    slug: 'ecommerce-marketing-agency',
    title: 'Ecommerce Marketing Agency (Australia) — What to Buy First | Sevenam',
    description: 'Ecommerce marketing covers paid, email, retention and search. Which one actually moves your number first, and where a Meta specialist fits into it.',
    eyebrow: 'ECOMMERCE MARKETING', h1: 'Ecommerce Marketing Agency',
    lead: 'Four disciplines wear this label. Only one of them is usually your constraint.',
    s1: {
      h2: 'The label covers four different businesses.',
      paras: [
        "Ecommerce marketing means paid acquisition, email and SMS, retention and lifecycle, and organic search — and a full-service agency will sell you all four on one retainer. The problem is not that the four are unrelated. It is that at any given moment one of them is your constraint and the other three are maintenance, and a bundled retainer prices them as if that were not true.",
        "Which one is the constraint is usually obvious from the numbers. A brand with strong repeat rates and thin new-customer volume has an acquisition problem. A brand acquiring well with a flat second-order rate has a retention problem. Buying both at once is how a marketing budget gets spent evenly and achieves nothing sharply.",
      ],
      items: [
        'Paid acquisition, email and SMS, retention, organic search.',
        'One of them is the constraint; the others are maintenance.',
        'A bundled retainer charges for all four regardless.',
        'The numbers usually say which, before anyone pitches you.',
      ],
    },
    s2: {
      h2: 'Where we fit, and where we do not.',
      paras: [
        "We do one of the four: paid acquisition on Meta, plus the creative that feeds it. We do not send your email, write your product pages or do your SEO, and we will not take the budget for them. If your constraint is retention, the honest answer is that a Meta specialist cannot fix it and you should spend the money elsewhere first.",
        "When acquisition is the constraint, the work is specific: make the measurement true, build the account properly, and then produce enough creative that the models have something to learn from. That is a channel job done to depth, not a marketing department rented by the month.",
      ],
      items: [
        'Meta acquisition and the creative that feeds it. That is the scope.',
        'No email, no SEO, no content retainer, and a fee priced to the work.',
        'We say when your constraint is somewhere we do not work.',
        'Your ad account, pixel and creative library, from hour one.',
      ],
    },
    faqs: [
      { q: 'Do you work with brands outside Australia?', a: "Yes. We are based in Sydney and most of the businesses we work with we have never met in person &mdash; the system is delivered remotely and the decisions land first thing in your morning, whichever morning that is. The auction does not know where your operator sits. What matters is that somebody reads the account properly and acts on it the same day." },
      { q: 'Do you do email and SMS as well?', a: "No. Klaviyo work, flows and campaign sends are a different discipline and there are specialists who do it well. We will happily tell you whether your numbers say that is where the next dollar should go — quite often it is, particularly for brands with a strong first-order rate and nothing happening after it." },
      { q: 'How do we know whether acquisition is actually our problem?', a: "Look at new-customer volume against repeat rate over the last twelve months. If new customers are flat or falling while repeat holds, the constraint is acquisition. If new customers are growing and second orders are not following, it is retention, and more paid spend makes the problem larger rather than smaller. The account check puts numbers on that in five days." },
      { q: 'Is a specialist better than a full-service agency?', a: "For one channel run to depth, generally yes — a team spread across six services is not better at any of them. For a brand that genuinely needs four disciplines coordinated and has nobody in-house to coordinate them, a full-service agency can be the right answer. It depends on whether you have someone to hold the strategy." },
      { q: 'What size ecommerce brand does this suit?', a: "Australian brands spending roughly $30,000 to $500,000 a month on Meta. Below that the setup rarely pays for itself and we will say so — the guides and calculators on this site are free and plenty of brands run it themselves from those." },
      { q: 'Which brands have you done this for?', a: "SRW, knest.ai and Online Model Academy are the ones we publish, with figures the client has signed off. The list is short because the tools this runs on are months old rather than years." },
    ],
    related: [
      { href: '/ecommerce-facebook-ads-agency', title: 'Ecommerce Facebook ads', note: 'The channel, in detail.' },
      { href: '/check', title: 'The account check', note: 'Five days, a straight read.' },
      { href: '/agency-fee', title: 'What a percentage really costs', note: 'The fee, in dollars.' },
    ],
    closing: { h2: 'Find out which one is your constraint.', p: "Tell us four things and Josh comes back with what the numbers say to fix first — including when that is not us." },
  },


  {
    /* "meta ads management" is 150 a month. The searcher is looking for the
       ongoing service rather than an agency, so the page answers the question
       they are really asking: what does anyone actually do, day to day, for a
       monthly fee, now that the platform does the buying. */
    slug: 'meta-ads-management',
    title: 'Meta Ads Management — What the Monthly Work Actually Is | Sevenam',
    description: 'What Meta ads management consists of day to day now that targeting and bidding are automated: creative volume, measurement, and a written decision every morning.',
    eyebrow: 'META ADS MANAGEMENT', h1: 'Meta Ads Management',
    lead: 'The honest question about any monthly fee: what happens on a Tuesday.',
    s1: {
      h2: 'What most monthly management actually contains.',
      paras: [
        "Ask what the retainer buys and the answer is usually a weekly call, a monthly report and “ongoing optimisation”. Press on the last one and it thins out quickly, because the things it used to mean — audience testing, manual bid adjustments, placement selection — are now done by Meta's models whether anyone is paid to do them or not.",
        "What is left is real work, but it is different work: producing enough creative to keep the auction fed, keeping the measurement honest, and making a small number of judgment calls each day about what to turn off and what to back. The gap between accounts is almost never who is better at the ads manager. It is how quickly a losing ad set gets retired and how much new creative is queued behind it.",
      ],
      items: [
        'Audience and bid management are largely the platform’s job now.',
        'The remaining work is production, measurement and daily judgment.',
        'A weekly call means a losing ad set can run six days too long.',
        'Most accounts are short of creative, not short of optimisation.',
      ],
    },
    s2: {
      h2: 'What the monthly covers here.',
      paras: [
        "The account is read overnight and a written decision arrives before you are up — what to turn off, what to scale, what to replace, each with the numbers behind it. You spend about a minute on it. Nothing is actioned that you have not agreed to, and every decision stays on the record.",
        "Alongside that, creative is produced continuously rather than in quarterly batches, and the measurement is checked rather than assumed. The fee is a fixed monthly, priced to the work, quoted in writing once the account has been read.",
      ],
      items: [
        'A written decision every morning, with the reasoning attached.',
        'Creative produced continuously, not in quarterly batches.',
        'Measurement checked, not assumed to still be correct.',
        'A fixed monthly, month to month, with no notice period.',
      ],
    },
    faqs: [
      { q: 'What do you actually do each day?', a: "The account is read overnight and the day's decisions are written up before you are up: which ad sets to retire, which to scale, which creative has fatigued and what replaces it, each with the numbers that led to it. You approve what you agree with — it takes about a minute — and we action that. Nothing moves without your say-so." },
      { q: 'How much of our time does it take?', a: "About a minute a day for whoever approves the decisions — usually a founder, a marketing coordinator or an ecommerce manager. If nobody has that minute reliably, the decisions arrive and nothing happens, and we would rather quote the end-to-end option where we do the execution ourselves." },
      { q: 'Is there a lock-in or notice period?', a: "No. It runs month to month and stops at the end of any month, with no notice period and no exit call. The account, the pixel and the creative library are yours already, so nothing has to be handed back." },
      { q: 'What does it cost?', a: "A fixed setup fee and a fixed monthly, priced to the work, and quoted in writing after the account has been read. Triple your spend and the invoice does not move. The setup fee is published on the pricing page; the monthly depends on what the account actually needs." },
      { q: 'Can we do this ourselves?', a: "Some brands do, and we would rather they did than pay for something they do not need. The guides, the glossary and the calculators on this site are free and describe the same process. If you can run it from those, that is a good outcome." },
    ],
    related: [
      { href: '/system', title: 'How the daily decisions work', note: 'The mechanism, step by step.' },
      { href: '/pricing', title: 'How it works to buy', note: 'What is published and what is quoted.' },
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'Or a system you own.' },
    ],
    closing: { h2: 'See what the monthly would cover.', p: "Tell us four things about the account and Josh comes back with the scope and the figure in writing." },
  },

  {
    /* "ecommerce ads agency" is only 150 a month but carries a $35 CPC, which is
       the highest commercial intent in the whole cluster. Angle is the ecommerce
       mechanics specifically — catalogue, margin, seasonality — rather than the
       generic agency case, so it does not collide with the two ecommerce pages. */
    slug: 'ecommerce-ads-agency',
    title: 'Ecommerce Ads Agency — Catalogue, Margin and Seasonality | Sevenam',
    description: 'What an ecommerce ads agency has to get right beyond campaign structure: product feed accuracy, contribution margin rather than ROAS, and a calendar that spikes.',
    eyebrow: 'ECOMMERCE ADS', h1: 'Ecommerce Ads Agency',
    lead: 'Three things break ecommerce accounts, and none of them is the campaign structure.',
    s1: {
      h2: 'What actually breaks these accounts.',
      paras: [
        "The first is the product feed. Advantage+ catalogue placements are only as good as the data behind them, and feed errors are common, invisible inside the ads manager and quietly expensive — out-of-stock lines still being advertised, wrong prices, missing GTINs, images that fail the crop.",
        "The second is optimising to the wrong number. ROAS is a ratio of revenue to spend and says nothing about what you keep. A 3.2 on a 70% margin product and a 3.2 on a 22% margin product are different businesses, and an account scaling on blended ROAS will reliably scale the wrong SKUs.",
        "The third is the calendar. Ecommerce demand is not flat, and an account run at a constant cadence through a season that triples is leaving the year's result on the table.",
      ],
      items: [
        'Feed accuracy, because catalogue placements run on it.',
        'Contribution margin per SKU, not blended ROAS.',
        'A calendar the account is actually built around.',
        'Creative volume high enough to survive a peak.',
      ],
    },
    s2: {
      h2: 'How that changes the work.',
      paras: [
        "The setup starts with the feed and the measurement rather than the campaigns — a conversion defined the way finance would define it, deduplicated between the pixel and the conversions API, and margin attached to the SKUs that matter. Everything downstream inherits whatever error is left in that.",
        "After that it is production and pace. Creative is produced continuously so a peak is not being served by concepts built three months earlier, and the daily decision retires what stopped working the morning it stopped working rather than at the next weekly call.",
      ],
      items: [
        'Feed and measurement first; campaigns after.',
        'Margin attached to SKUs, so scale goes to the profitable ones.',
        'Creative queued ahead of the season, not during it.',
        'Your ad account, pixel, catalogue and creative library, always.',
      ],
    },
    faqs: [
      { q: 'Do you work on Shopify?', a: "Yes, and most of the accounts we read are on it. The common failure points are the same ones every time: the pixel and the conversions API double-counting, the catalogue feed drifting out of sync with inventory, and the theme's checkout events firing inconsistently on mobile. All three are fixable in the setup." },
      { q: 'Should we be optimising to ROAS?', a: "As a scaling signal, not on its own. ROAS tells you the ratio of revenue to spend and nothing about what you keep, so an account scaling on blended ROAS reliably pushes budget at high-revenue, low-margin SKUs. Attach contribution margin to the products that matter and the picture usually changes, sometimes sharply." },
      { q: 'What about the product feed — do you fix that?', a: "Yes, as part of the setup, and it is usually where the first real gain shows up. Feed problems do not announce themselves — the ads keep running, the spend keeps going out, and a proportion of it is being spent on lines you cannot ship or prices you no longer charge." },
      { q: 'How do you handle a seasonal peak?', a: "By producing the creative before it rather than during it. A peak is not the time to discover you have three concepts left, and a shoot-based production cycle cannot turn that around inside the season. The line produces continuously, so the queue is deep going in." },
      { q: 'What size account is this for?', a: "Australian ecommerce brands spending roughly $30,000 to $500,000 a month on Meta. Below that, the setup rarely pays for itself and we will say so." },
    ],
    related: [
      { href: '/shopify-facebook-ads', title: 'Shopify Facebook ads', note: 'Tracking, catalogue and scale.' },
      { href: '/ecommerce-ads-agency', title: 'Ecommerce ads agency', note: 'Catalogue, margin, seasonality.' },
      { href: '/ecommerce-facebook-ads-agency', title: 'Ecommerce Facebook ads agency', note: 'The channel case.' },
      { href: '/check', title: 'The account check', note: 'Where the money is going.' },
    ],
    closing: { h2: 'Have the feed and the numbers read first.', p: "Tell us four things about the store and Josh comes back with what is actually wrong, starting with the measurement." },
  },

  {
    /* "facebook ads expert" is 100 a month at KD 1 and — unusually for this
       cluster — carries transactional intent: somebody ready to hire. The page
       answers the hiring question directly, including the key-person risk that
       comes with hiring one person, which is the honest case against it. */
    slug: 'facebook-ads-expert',
    title: 'Facebook Ads Expert Australia — Hire, or Install a System | Sevenam',
    description: 'Hiring a Facebook ads expert puts the knowledge in one person’s head. What the alternative looks like, and when hiring the person is still the right call.',
    eyebrow: 'FACEBOOK ADS EXPERT', h1: 'Facebook Ads Expert',
    lead: 'The knowledge should end up in your business, not in somebody’s head.',
    s1: {
      h2: 'What you are buying when you hire an expert.',
      paras: [
        "Expertise in this channel is real and it is worth paying for. The problem is not the person — it is that the arrangement usually stores everything valuable in their head. The reasoning behind each decision, the things already tried, the reason a structure looks odd: none of it is written down, so it leaves when they do.",
        "That shows up as a specific kind of expensive. A freelancer goes quiet for a fortnight and the account drifts. A contractor moves on and the replacement spends six weeks rediscovering what the last one knew. The account is fine on paper the whole time, and quietly loses a quarter.",
      ],
      items: [
        'The judgment is real; the record of it usually is not.',
        'Nothing written down means nothing survives a handover.',
        'One person is also one point of failure and one holiday.',
        'Rediscovery costs more than the original work did.',
      ],
    },
    s2: {
      h2: 'The version where it stays with you.',
      paras: [
        "Every decision arrives in writing with the numbers behind it, and stays on the record. That is not a reporting nicety — it is the difference between a year of expertise accumulating in your business and a year of it accumulating in a contractor's memory. Somebody in-house can audit it, argue with it, or take the whole thing over.",
        "The expertise is still a person's. Josh reads every account, and there is no account manager between you and the work. What changes is where the output lands.",
      ],
      items: [
        'Every decision written down, with the reasoning attached.',
        'Read by Josh, not handed to an account manager.',
        'Your ad account, pixel and creative library, from hour one.',
        'Month to month, so it has to be earned again.',
      ],
    },
    faqs: [
      { q: 'Is it cheaper to hire a freelancer?', a: "On the monthly figure, often yes, and for some accounts that is genuinely the right answer — a brand spending under about $30,000 a month usually does better with a good freelancer than with anything structural. Where it stops being cheaper is when the account is large enough that a fortnight of drift costs more than the fee difference." },
      { q: 'Should we hire someone in-house instead?', a: "If you can find them and keep them busy, in-house is a strong answer — the incentives are clean and the knowledge stays. The practical difficulty is that one in-house operator cannot produce creative at the volume this channel now needs, so most end up buying production anyway. Quite a few of the accounts we work on have an in-house marketer who runs the approvals." },
      { q: 'Who actually works on our account?', a: "Josh. Every account check is read and recorded by him, and the daily decisions are his. There is no account manager layer and no junior doing the reading — which is also why the client list is short rather than long." },
      { q: 'What happens if we stop?', a: "Nothing moves. The ad account, the pixel, the audiences and every creative file are already in your own Business Manager, and the written record of every decision stays with you. It stops at the end of any month, with no notice period." },
      { q: 'Can we just get advice rather than execution?', a: "The account check is exactly that — five days, a straight read, recorded and in writing, and yours to act on with or without us. Plenty of brands take it and run the fixes themselves." },
    ],
    related: [
      { href: '/facebook-ads-consultant', title: 'Facebook ads consultant', note: 'Advice, or execution?' },
      { href: '/check', title: 'The account check', note: 'Five days, in writing.' },
      { href: '/how-to-run-meta-ads-yourself', title: 'Run it yourself', note: 'The whole process, published.' },
      { href: '/facebook-ads-expert', title: 'Facebook ads expert', note: 'Hire a person, or install a system.' },
    ],
    closing: { h2: 'Have the account read by the person who would run it.', p: "Tell us four things and Josh comes back himself with what is wrong and whether you need anyone at all." },
  },

  {
    /* "paid social agency" is 80 a month at KD 2. Low volume, but the term is how
       larger brands and in-house marketers phrase it, so the page answers the
       multi-platform question head on rather than pretending Meta is all of paid
       social — and says plainly that we only do the one. */
    slug: 'paid-social-agency',
    title: 'Paid Social Agency (Australia) — One Channel, Done Properly | Sevenam',
    description: 'Paid social spans Meta, TikTok, Pinterest and LinkedIn. Why depth in one channel usually beats presence in four, and when it does not.',
    eyebrow: 'PAID SOCIAL', h1: 'Paid Social Agency',
    lead: 'Four platforms, one budget. Spreading it evenly is the most common way to waste it.',
    s1: {
      h2: 'The case against being on all of them.',
      paras: [
        "A paid social agency will usually offer Meta, TikTok, Pinterest and LinkedIn, and it sounds like coverage. What it produces in practice is four accounts each getting a quarter of the attention and a quarter of the creative, none of them with enough volume for the platform's models to learn anything useful.",
        "Every one of these platforms now optimises on signal density. An account fed a small budget and three creatives a quarter does not perform proportionally worse than a well-fed one — it performs disproportionately worse, because it never leaves the learning phase. Four half-fed accounts can genuinely return less than one properly fed one.",
      ],
      items: [
        'Each platform needs its own creative, not a resized version.',
        'Thin budgets never exit the learning phase.',
        'Four accounts is four measurement setups to keep honest.',
        'Coverage and performance are not the same purchase.',
      ],
    },
    s2: {
      h2: 'Why Meta first, for Australian ecommerce.',
      paras: [
        "For most Australian ecommerce brands Meta is where the depth is: the largest addressable audience, the most mature conversion measurement, and a catalogue integration nothing else matches. It is usually where the first dollar and the marginal dollar both belong, and it stays that way for longer than most brands expect.",
        "So that is all we sell. If your best next dollar is in search, a marketplace or TikTok, we will say so rather than take the budget — and there are good specialists in each. What we will not do is add a channel to an invoice to look full-service.",
      ],
      items: [
        'Meta only — Facebook and Instagram, one auction.',
        'Creative produced for the surfaces it actually runs on.',
        'We say when the next dollar belongs somewhere else.',
        'A fixed fee, priced to the work.',
      ],
    },
    faqs: [
      { q: 'Do you work with brands outside Australia?', a: "Yes. We are based in Sydney and most of the businesses we work with we have never met in person &mdash; the system is delivered remotely and the decisions land first thing in your morning, whichever morning that is. The auction does not know where your operator sits. What matters is that somebody reads the account properly and acts on it the same day." },
      { q: 'Do you run TikTok ads?', a: "No. It is a real channel and for some categories — beauty, fashion, anything with a strong demonstration — it can outperform Meta. But it needs its own creative approach rather than resized Meta assets, and doing it properly is a different specialism. We would rather point you at someone who does it well than run it adequately." },
      { q: 'Should we be on more than one platform?', a: "Once Meta is genuinely saturated — you are fed with creative, measurement is clean, and additional spend is producing worse returns rather than the same ones — then yes, a second channel is the right move. Before that point, a second channel is usually a way of avoiding the harder problem on the first." },
      { q: 'What about LinkedIn?', a: "Different buyer, different economics, and rarely the right first channel for consumer ecommerce. For considered-purchase B2B it can be, and we are not the right people for it." },
      { q: 'Is Meta still worth it in 2026?', a: "For Australian ecommerce, generally yes — the audience is the largest available and the measurement is the most mature. What has changed is what the work consists of: the platform now does the targeting and bidding, so results are decided by creative volume and decision speed rather than by account structure." },
      { q: 'How is this priced?', a: "A fixed setup fee and a fixed monthly, priced to the work and quoted in writing once the account has been read. Triple your spend and the invoice does not move." },
    ],
    related: [
      { href: '/social-media-advertising-agency', title: 'Social media advertising agency', note: 'What to buy instead.' },
      { href: '/instagram-ads-agency', title: 'Instagram ads agency', note: 'One auction, one system.' },
      { href: '/google-ads-vs-facebook-ads', title: 'Google Ads vs Facebook Ads', note: 'Which one first.' },
    ],
    closing: { h2: 'Find out whether Meta is actually saturated.', p: "Tell us four things about the account and Josh comes back with whether a second channel would help or just spread you thinner." },
  },



  {
    slug: 'marketing-automation',
    explainer: {
      label: 'START HERE',
      h2: 'What marketing automation actually is.',
      p: 'Software that does the parts of marketing that do not need a person. Not the thinking — the collecting, the drafting, the chasing and the reporting, which is most of the week for most marketing teams. Three examples of the same idea.',
      cases: [
        {
          job: 'Following up an enquiry',
          before: 'Someone remembers, eventually. A form arrives on Friday afternoon and gets a reply on Tuesday, by which time the person has bought from whoever answered first.',
          after: 'The record updates the moment the form lands, the follow-up drafts itself against what that person actually looked at, and a human reads it and presses send.',
          gain: 'More deals are lost to slow follow-up than to bad advertising.',
        },
        {
          job: 'Knowing what the market wants',
          before: 'Sales hears the objections, support hears the complaints, and the ad account sees what got clicked. None of it is written anywhere the other two can read it.',
          after: 'One repository holds all three, ranked by how often each comes up, so the next campaign argues against the objection people actually have.',
          gain: 'This is the part almost nobody builds, and the part everything else runs on.',
        },
        {
          job: 'Producing the work',
          before: 'A person opens a blank document on Monday, works from memory and a content calendar, and by Friday has eight pieces that could have come from any company in the category.',
          after: 'An agent drafts from what has already worked in your own account and in your own words, and a person edits rather than starting from nothing.',
          gain: 'Editing is faster than writing, and the output is specific to you.',
        },
      ],
      foot: 'None of it removes the person deciding. Every one of those steps ends with someone approving what happens next — which is the difference between automation you can leave running and automation you have to supervise.',
    },
    accordion: {
      label: 'THE DETAIL',
      h2: 'What gets built, in order.',
      p: 'Open whichever part you care about. Nothing here is a product you buy off a shelf — it is the same five or six pieces, assembled around what you already run.',
      items: [
        { q: 'A marketing data repository', a: "The first build and the one that makes the rest worth doing. One place where what the market is telling you is written down and kept: the objections ranked by how often they come up, the language that earns replies, the offers that worked and the ones that did not, your thresholds and brand rules, and the corrections — so a mistake is made once rather than every week. It lives on your own infrastructure. Almost no company has this, which is why almost every AI output they generate reads generic." },
        { q: 'Agents with written job specs', a: "Not a chat window. Each agent has a specification the same way a person would: what it reads, when it runs, what it produces, what good looks like, and who approves the output. One might read every sales call transcript and update the objection list. Another might draft creative angles from what performed last month. They write back what they learned, so the repository gets better rather than staying still." },
        { q: 'CRM automation', a: "Usually the fastest return in the whole build, because the data is already sitting there and almost nothing is being done with it. Records that update themselves from real activity rather than from someone remembering. Lifecycle stages that move on evidence. Follow-up that fires on a trigger instead of a calendar reminder. Lists that are correct on the morning you send rather than correct last quarter." },
        { q: 'The approval gate', a: "Nothing that spends money, emails a customer or changes a record leaves the system without a person agreeing to it. This is not a setting that can be switched off, and it is the reason the system can be trusted with a live account and a real list. An agent that can send on its own is a liability dressed as a productivity gain." },
        { q: 'Workflows into what you already own', a: "The connective tissue: your CRM, your email platform, your ad accounts, your scheduler, your warehouse if you have one. We do not migrate you to a new stack as the opening move, because the tools are rarely the problem — the absence of anything joining them is. Where a tool genuinely has to change we will say so and explain what it buys." },
        { q: 'A weekly read on what changed', a: "One document that says what moved, what it probably means, and what to do about it. Written by the system from the repository and the accounts, then read by a person before it reaches you. It exists because a dashboard tells you what happened and almost never tells you what to do." },
        { q: 'What this does not do', a: "It does not replace judgement, set your strategy, or decide what business you are in. It is not a compliance function — we build the approval gates, but the person approving has to be yours. And it does not fix bad data: if the CRM is empty or nobody owns it, the honest answer is that you are not ready yet, and we would rather say that on a fifteen-minute call than after a month of work." },
        { q: 'Have you built this before?', a: "Yes, and it is worth being straight about the shape of it: the advertising side of Sevenam is older than the automation side. The repository, the job specs and the approval gate come out of running our own operation that way — the daily decisions our Meta clients receive are produced by exactly this kind of system. If you want the automation line's own case studies, ask on the call and we will tell you honestly what exists and what does not." },
        { q: 'How the pricing works', a: "Bespoke, quoted as a fixed figure in writing after we map what you run. There is no list price the way there is for the Meta products, because a company on one clean CRM and a company running four disconnected tools are not the same job, and pretending otherwise means one of you is being overcharged." },
      ],
    },
    title: 'Marketing Automation Agency — Systems That Replace the Busywork | Sevenam',
    description: 'Marketing automation built as a system: a team of AI agents, one marketing data repository, and the workflows that connect them. Bespoke, quoted after we map what you run.',
    eyebrow: 'MARKETING AUTOMATION', h1: 'Marketing Automation',
    systemMap: {
      label: 'THE SHAPE OF IT',
      h2: 'Three parts, in this order.',
      p: 'Signal goes in on the left, the repository keeps it, agents work from it, and nothing that spends money or reaches a customer leaves without a person saying yes. Build them out of order and you get an agent guessing, which is what most AI marketing already is.',
      columns: [
        {
          label: 'IN',
          title: 'What the market tells you',
          note: 'Scattered across four systems today, and lost the moment a tab closes.',
          rows: ['Sales calls and objections', 'Support tickets and CRM history', 'Ad account performance'],
          foot: 'Currently: nobody owns it',
        },
        {
          label: 'THE REPOSITORY',
          title: 'One place it is written down',
          note: 'The memory everything else reads from. This is the part almost nobody builds.',
          rows: ['Winning language and hooks', 'Objections, ranked by frequency', 'Corrections, so mistakes happen once'],
          foot: 'Owned by you, on your systems',
        },
        {
          label: 'OUT',
          title: 'Agents with real job specs',
          note: 'Each one reads the repository, runs on a schedule, and writes back what it learned.',
          rows: ['Content drafted from what performed', 'CRM updates and follow-up', 'A weekly read on what changed'],
          foot: 'Every output goes to approval',
        },
      ],
      gate: {
        label: 'THE APPROVAL GATE',
        text: 'Nothing that spends money, emails a customer or changes a record leaves the system without a person agreeing to it. That is the difference between automation you can run daily and automation you have to supervise — and it is why this can be trusted with a live account at all.',
      },
      note: 'Drawn from our own design tokens rather than a wall of vendor logos, because the tools underneath a build differ for every client — the repository and the job specs are the system, and whatever software sits beneath them is an implementation detail we choose with you.',
    },
    support: 'Sevenam builds the system underneath your marketing \u2014 a repository of what the market is telling you, a set of agents with real job specs, and the workflows that connect them to the CRM and the tools you already own. Scoped and quoted after we map what you run.',
    trust: ['Built on your own accounts', 'Quoted after we map it', 'Yours if we stop'],
    lead: 'Not another tool. The system underneath the tools — agents, a data repository, and the workflows that connect them.',
    s1: {
      h2: 'Why most marketing automation stalls.',
      paras: [
        "Most companies already own the pieces. There is a CRM, an email platform, a scheduler, a dashboard, a folder of decks, and somebody using an AI assistant in a browser tab. What is missing is the thing that joins them, so the learning never accumulates: sales hears one version of the market, support hears another, the ads account sees what got clicked, and the founder remembers the one call that stuck. Everyone arrives at the growth meeting with a different version of reality.",
        "The second failure is subtler. Work done in a chat window disappears when the tab closes. Ask for ten posts on Monday and by Friday the assistant has forgotten the objection that came up on every sales call, the phrasing that actually earned replies, and the offer that did not land. It starts from nothing every time, which is why AI output so often feels generic — it is generic, because nothing it needs is in front of it.",
      ],
      items: [
        'The tools exist; the connection between them does not.',
        'Signal is scattered across sales, support, product and the ad account.',
        'Work done in a chat window is thrown away when the tab closes.',
        'Generic output is a context problem before it is a model problem.',
        'Nobody owns the system, so nobody improves it.',
      ],
    },
    s2: {
      h2: 'What we actually build.',
      paras: [
        "Three things, in order. A marketing data repository — one place where what the market is telling you is written down and kept: the objections, the winning language, the offers that worked, the ones that did not, and the rules the business runs by. Then a set of agents with real job specs: what each reads, when it runs, what it produces, what needs a human before it goes anywhere. Then the workflows that connect the two to the systems you already pay for, including the CRM.",
        "The point is not to remove people. It is to take the part of the work that is reading, collating, drafting and chasing — which is most of it — and give it to something that does it every day without getting bored, so the people you have spend their time on judgement, taste and the decisions that need a business context no system has.",
      ],
      items: [
        'A marketing data repository: the memory the rest of it runs on.',
        'Agents with written job specs, run schedules and approval gates.',
        'Workflows into the CRM, the ad accounts and the tools you already own.',
        'Creative and content production wired to what performed, not to a calendar.',
        'A weekly read on what changed and what to do about it.',
      ],
    },
    tables: [
      {
        wrap: true,
        h2: 'The systems audit, and who we can do it for.',
        lead: 'We run a small number of free marketing technology, systems and performance audits each month. It is a real piece of work — a read of your stack, your data and what is actually firing — and because it takes real time, it is offered only where we can see something worth finding. The call is fifteen minutes and decides whether you qualify.',
        columns: ['', 'What that means', 'Why the line is there'],
        rows: [
          ['What the audit covers', 'Your marketing stack and how the parts connect, the state of the data in your CRM, what is tracked against what actually happens, and where a system would remove work', 'These are the four places we consistently find something, so they are the four we look at'],
          ['What you get', 'A written read, and a call to go through it. Yours to keep and act on, with us or without us', 'A document you cannot act on without hiring us is a sales asset, not an audit'],
          ['Who tends to qualify', 'A real marketing stack, someone accountable for it, and enough activity that the data means something', 'With no data and no owner there is nothing to audit — we would be guessing, at length'],
          ['Who tends not to', 'Pre-launch, no CRM or ad data yet, or looking for a document to take to another supplier', 'Both are fine positions to be in. Neither is helped by this'],
          ['How we decide', 'On the fifteen-minute call, from what you tell us about the stack and the data', 'It is quicker to say on a call than after a week of work'],
          ['If you do not qualify', 'We say so on the call and tell you what would change that', 'Nobody should wait on an audit that is not coming'],
        ],
        note: 'To be plain about it: the audit is offered at our discretion, in limited numbers, and nothing on this page is an offer to supply it — qualifying is decided on the call and we may decline for any reason, including simply being full that month. If we say yes, you get the scope and the dates in writing before we start.',
      },
    ],
    faqs: [
      { q: 'What does marketing automation cost here?', a: "It is bespoke, and deliberately so — the work depends entirely on what you already run, how clean the data is and how much of it can be trusted. We map that first and quote a fixed figure in writing before anything starts. Unlike our Meta products, there is no list price for this, because there is no standard shape to it." },
      { q: 'Is this just Zapier with extra steps?', a: "No, though it will often use tools like that underneath. The difference is the repository and the job specs: a connector moves data between two apps, and what we build accumulates what the business learns so that every agent gets sharper rather than repeating itself." },
      { q: 'Will this replace our marketing team?', a: "It replaces a large amount of the work a marketing team does by hand — the reading, collating, drafting, reporting and chasing. What it does not replace is judgement about what should exist in the first place, which is the part worth paying people for. Most clients redeploy rather than reduce." },
      { q: 'Do you work with our CRM?', a: "Yes. CRM automation is usually where the fastest return sits, because the data is already there and almost nothing is being done with it. We work with what you have rather than moving you onto something new, unless what you have genuinely cannot do the job." },
      { q: 'How long before anything works?', a: "The repository and the first agent are usually live inside a few weeks. Whether that is worth having depends on your data, which is exactly what the mapping session is for — and if the answer is that you are not ready, we say that." },
      { q: 'Who owns what you build?', a: "You do, on your own accounts and infrastructure, the same as everything else we do. If the arrangement ends, the system keeps running." },
      { q: 'What is the catch with the free audit?', a: "That we choose who gets one. It is real work, we run a small number each month, and we offer them where we can already see something worth finding — which we decide on a fifteen-minute call rather than after a week of digging. If we decline, you get told on the call and you get told why. There is no obligation on you either way, and the written read is yours whether or not you hire us." },
    ],
    closing: { h2: 'See whether your systems are worth automating yet.', p: "Fifteen minutes with Josh, no pitch deck. Some accounts are not ready, and that is a faster answer than a proposal." },
    related: [
      { href: '/system', title: 'The Meta system', note: 'The same idea, one channel.' },
      { href: '/ai-in-meta-ads-manager', title: 'AI in Ads Manager', note: 'What an agent may touch.' },
      { href: '/meta-ads-mcp', title: 'Meta Ads MCP', note: 'How the connector works.' },
      { href: '/automate-meta-ads', title: 'What actually automates', note: 'And what does not.' },
      { href: '/email-marketing-agency', title: 'Email and CRM', note: 'The flows under the channel.' },
      { href: '/marketing-automation-new-zealand', title: 'New Zealand', note: 'Lean teams, more mechanical work.' },
      { href: '/marketing-automation-singapore', title: 'Singapore', note: 'Well-tooled, poorly connected.' },
      { href: '/marketing-automation-malaysia', title: 'Malaysia', note: 'Consistency over headcount.' },
    ],
  },
  {
    slug: 'meta-ads-agency-new-zealand',
    title: 'Meta Ads Agency for New Zealand Ecommerce | Sevenam',
    description: 'Facebook and Instagram ads for New Zealand brands, run on your own ad account. Sydney-based, two hours behind you, and built for a market small enough to saturate.',
    eyebrow: 'NEW ZEALAND', h1: 'Meta Ads for New Zealand Brands',
    lead: 'A market of five million saturates fast. That changes what the account has to do.',
    s1: {
      h2: 'What is different about running Meta in New Zealand.',
      paras: [
        "The constraint is population. A New Zealand brand advertising nationally is buying a total addressable audience smaller than Sydney, so frequency climbs faster than operators used to larger markets expect. An ad set that would run for six weeks in the United States is fatigued in two, and the account feels like it has stopped working when what has actually happened is that everyone worth reaching has now seen the ad four times.",
        "That makes creative supply the whole game rather than one lever among several. The accounts that hold their cost per result here are the ones putting genuinely distinct concepts into the auction continuously — not variations of one image with the headline changed, which the platform treats as the same ad wearing a hat.",
      ],
      items: [
        'A national audience smaller than one Australian city.',
        'Frequency climbs in weeks, not months, and cost per result follows it.',
        'Creative volume stops being optional at a much lower spend than elsewhere.',
        'Broad targeting usually beats hand-built audiences sooner, because the pool is small.',
        'Expansion into Australia is often the cheaper growth than squeezing the domestic auction.',
      ],
    },
    s2: {
      h2: 'How we work with New Zealand accounts.',
      paras: [
        "Remotely, from Sydney, which is two hours behind Auckland — so the overnight read lands before your morning rather than after it. We are not a New Zealand company and do not pretend to be one; what we are is a system that runs on your own Business Manager, in NZD, against the auction you actually compete in.",
        "The practical difference from a local agency is that nothing sits in a weekly call. The account is read every morning, the decisions arrive written down with the numbers behind them, and you approve what runs. When the audience is this small, the cost of leaving a losing ad set alone for six days is a much larger share of the month.",
      ],
      items: [
        'Your Business Manager, your ad account, your billing in NZD.',
        'Decisions written every morning, not discussed weekly.',
        'Sydney-based and remote — no local office, and we will not claim one.',
        'The same fixed fees as our Australian work: nothing scales with your budget.',
        'Set up to expand into Australia when the domestic auction tightens.',
      ],
    },
    faqs: [
      { q: 'Do you have an office in New Zealand?', a: "No. We are based in Sydney and work remotely, which is how every account is run regardless of country. If having someone in the room matters to you, a local agency is the better fit and we would say so." },
      { q: 'Can you bill in New Zealand dollars?', a: "Your ad account bills you directly in whatever currency it is set to, and we never touch your media spend. Our own fees are quoted in Australian dollars." },
      { q: 'Is the New Zealand market too small for this?', a: "It is small enough that creative volume matters sooner, which is the part we are built for. What makes an account too small is spend rather than country — below roughly $10,000 a month there is not enough daily signal for a daily decision to beat a weekly one." },
      { q: 'Should we be advertising into Australia as well?', a: "Often, yes, and usually earlier than brands expect. When a domestic audience saturates, buying a larger auction next door is frequently cheaper than paying rising frequency at home. It is one of the first things we look at." },
      { q: 'Do you understand the New Zealand market?', a: "We understand the auction, which behaves the same way everywhere, and we understand what a small addressable audience does to frequency. Local cultural nuance in the creative is yours — you know your customer better than we will." },
    ],
    closing: { h2: 'Find out what your frequency is actually costing you.', p: "Fifteen minutes with Josh, no pitch deck. Bring the account and we will tell you whether the ceiling is the audience or the creative." },
    related: [
      { href: '/meta-ads-agency', title: 'Meta ads agency', note: 'The full service.' },
      { href: '/marketing-automation-new-zealand', title: 'Automation in NZ', note: 'The systems side.' },
      { href: '/scaling-meta-ads', title: 'Scaling Meta ads', note: 'What breaks as you grow.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'The constraint here.' },
    ],
  },
  {
    slug: 'marketing-automation-new-zealand',
    title: 'Marketing Automation for New Zealand Businesses | Sevenam',
    description: 'AI agents, a marketing data repository and CRM automation for New Zealand companies. Built on your own systems, scoped and quoted after we map what you run.',
    eyebrow: 'NEW ZEALAND', h1: 'Marketing Automation in New Zealand',
    lead: 'Small teams carrying the work of large ones. That is the case for building the system.',
    s1: {
      h2: 'Why this lands differently in a small market.',
      paras: [
        "New Zealand businesses tend to run leaner marketing teams than their Australian equivalents at the same revenue — often one or two people doing the work that a larger market would split across five. The result is that almost all of the time goes to execution and almost none to the reading and thinking that makes execution worth doing.",
        "That is precisely the shape of problem automation solves well. Not because the people are replaceable, but because the collating, drafting, chasing and reporting is a large fraction of the week and none of it needs judgement. Take that out and a two-person team does the strategic work of a five-person one.",
      ],
      items: [
        'Lean teams, so a larger share of the week is mechanical work.',
        'One person often owns the CRM, the ads, the email and the content.',
        'Nothing accumulates, because there is no time to write anything down.',
        'The gap is capacity, not capability.',
        'A system that reads and drafts gives the hours back to judgement.',
      ],
    },
    s2: {
      h2: 'What gets built.',
      paras: [
        "A marketing data repository holding what the market is telling you — objections from sales calls, the language that earns replies, the offers that worked. A set of agents with written job specs: what each reads, when it runs, what it produces, and what a person approves before it goes anywhere. Then the workflows joining those to your CRM and the tools you already pay for.",
        "It is scoped after we map what you actually run, and priced bespoke, because a company on one CRM with clean data and a company running four disconnected tools are not the same job. There is no list price and we will not invent one.",
      ],
      items: [
        'A repository: the memory everything else runs on.',
        'Agents with job specs, schedules and approval gates.',
        'CRM automation, usually the fastest return in the build.',
        'Built on your own accounts, and yours if we stop.',
        'Quoted in writing after the mapping session.',
      ],
    },
    faqs: [
      { q: 'Are we big enough for this?', a: "It is less about size than about whether you have data worth reading — a CRM with real history, or an ad account with real spend. A two-person team with good data gets more out of this than a ten-person team without it." },
      { q: 'What does it cost?', a: "Bespoke, quoted in writing after we map what you run. There is no list price for this the way there is for our Meta products, because there is no standard shape to the work." },
      { q: 'Do you work with New Zealand CRMs and tools?', a: "We work with what you have. The common platforms are the same ones used in Australia, and where they are not, the approach does not change — the repository and the job specs are the system, and the tools sit underneath." },
      { q: 'Do we need to be in Auckland or Wellington?', a: "No. This is remote work regardless of city or country, and the mapping session is a call." },
      { q: 'Is our data safe?', a: "Everything is built on your own accounts and infrastructure. Where data is sensitive enough that it should not leave your environment, that constraint shapes the build rather than being worked around." },
    ],
    closing: { h2: 'Find out whether your systems are worth automating yet.', p: "Fifteen minutes with Josh, no pitch deck. Some businesses are not ready, and that is a faster answer than a proposal." },
    related: [
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The full service.' },
      { href: '/meta-ads-agency-new-zealand', title: 'Meta ads in NZ', note: 'The advertising side.' },
      { href: '/ai-in-meta-ads-manager', title: 'AI in Ads Manager', note: 'What an agent may touch.' },
      { href: '/automate-meta-ads', title: 'What actually automates', note: 'And what does not.' },
    ],
  },
  {
    slug: 'performance-marketing-agency-singapore',
    title: 'Performance Marketing Agency for Singapore Brands | Sevenam',
    description: 'Performance marketing for Singapore ecommerce, run on your own ad account. A dense, expensive auction where creative volume and decision speed decide the result.',
    eyebrow: 'SINGAPORE', h1: 'Performance Marketing in Singapore',
    lead: 'One of the most expensive auctions in the region, bought by some of the best-funded advertisers in it.',
    s1: {
      h2: 'What makes Singapore hard.',
      paras: [
        "Two things at once. The addressable audience is small — a few million people — and the advertisers competing for it are unusually well capitalised, because Singapore is where a great many regional headquarters sit. So you get the frequency problem of a small market and the price pressure of a large one, in the same account.",
        "The consequence is that the usual advice does not survive contact. Broadening the audience does not help much when the audience is nearly everyone already. Cutting bids does not help when the competition is not bidding for the same reason you are. What does move is the quality and quantity of creative going into the auction, and how quickly spend is taken off things that have stopped working.",
      ],
      items: [
        'A small addressable audience, so frequency climbs quickly.',
        'Well-funded regional competitors bidding into the same pool.',
        'Audience expansion runs out of room sooner than in larger markets.',
        'Creative volume and decision speed carry disproportionate weight.',
        'Cross-border campaigns into Malaysia and the region are often the real ceiling lift.',
      ],
    },
    s2: {
      h2: 'How the account is run.',
      paras: [
        "On your own Business Manager, with the account read every morning and the day's decisions written down with the numbers behind each one. In an expensive auction the cost of a slow decision is measured directly: an ad set left running four days past the point it turned is a real number, and in Singapore it is a larger one than most markets.",
        "We are based in Sydney and work remotely — two to three hours ahead of Singapore depending on the time of year, which means the overnight read is waiting when your day starts. We are not a Singapore agency and will not present as one.",
      ],
      items: [
        'Your Business Manager, your billing, your data.',
        'A written decision every morning rather than a weekly call.',
        'Sydney-based and remote, ahead of your working day.',
        'Fixed fees that do not move when the budget does.',
        'Regional expansion assessed as a lever, not assumed.',
      ],
    },
    faqs: [
      { q: 'Do you have a Singapore office?', a: "No. We are based in Sydney and work remotely with every client regardless of country. If a local presence is a requirement for you, a Singapore agency is the better fit and we would tell you so early." },
      { q: 'Do you handle multi-market campaigns across the region?', a: "Yes, and in Singapore it is frequently the most useful thing to look at, because the domestic audience is small enough that regional expansion lifts the ceiling more than optimisation does." },
      { q: 'Is Singapore too expensive for Meta ads?', a: "It is expensive, which raises the bar on margin rather than ruling it out. Whether it works is decided by your gross margin against your cost per result, and that is arithmetic we can do on a call rather than a matter of opinion." },
      { q: 'What about languages other than English?', a: "English carries most of the market for the brands we work with. Where a campaign genuinely needs another language, the copy is yours or your translator's — we build the system around it rather than pretending to write it." },
      { q: 'What spend does this suit?', a: "The same threshold as anywhere: roughly $10,000 a month of media and up, because below that a day does not produce enough signal to make a daily decision worth more than a weekly one." },
    ],
    closing: { h2: 'Find out where your ceiling actually is.', p: "Fifteen minutes with Josh, no pitch deck. Usually it is frequency, creative supply, or a market you have not opened yet." },
    related: [
      { href: '/performance-marketing-agency', title: 'Performance marketing', note: 'The full service.' },
      { href: '/marketing-automation-singapore', title: 'Automation in Singapore', note: 'The systems side.' },
      { href: '/facebook-ads-cpm-australia', title: 'CPM benchmarks', note: 'What media costs.' },
      { href: '/scaling-meta-ads', title: 'Scaling Meta ads', note: 'What breaks as you grow.' },
    ],
  },
  {
    slug: 'marketing-automation-singapore',
    title: 'Marketing Automation Agency for Singapore | Sevenam',
    description: 'AI agents, a marketing data repository and CRM automation for Singapore companies. Built on your own systems and quoted after we map what you already run.',
    eyebrow: 'SINGAPORE', h1: 'Marketing Automation in Singapore',
    lead: 'Plenty of tools, plenty of data, and almost nothing joining them together.',
    s1: {
      h2: 'The problem here is rarely tooling.',
      paras: [
        "Singapore companies are, if anything, over-tooled. Budgets support good software, so there is usually a proper CRM, a marketing platform, analytics, and often a data warehouse somebody built and nobody reads. What is missing is not another licence — it is the layer that turns all of that into something the marketing team acts on this week.",
        "There is a second pattern specific to regional headquarters: the same company is running several markets, each with its own data, its own language and its own results, and nobody has a consolidated read. Every market re-learns what another market already found out, which is expensive in a place where staff cost what they do here.",
      ],
      items: [
        'Well-tooled, poorly connected — the gap is the layer between systems.',
        'Multi-market operations that never consolidate what they learn.',
        'A warehouse or dashboard nobody has time to interrogate.',
        'High staff costs, so mechanical work is expensive work.',
        'The scarce resource is attention, not software.',
      ],
    },
    s2: {
      h2: 'What we build, and how it is priced.',
      paras: [
        "A marketing data repository that holds what the market is telling you across every market you run, so a finding in one is available to all of them. Agents with written job specs — what each reads, when it runs, what it produces, and what a person signs off. Then the workflows connecting those to your CRM and the tools you already own.",
        "Priced bespoke and quoted in writing after a mapping session, because the work depends entirely on what exists already. A company with one clean CRM and a company with four disconnected platforms across three markets are not the same build, and a list price would be a fiction for at least one of them.",
      ],
      items: [
        'One repository across markets, so findings stop being re-learnt.',
        'Agents with job specs, run schedules and approval gates.',
        'CRM automation, usually where the fastest return sits.',
        'Built on your own accounts, and yours if the arrangement ends.',
        'Bespoke, quoted after we map it. No list price.',
      ],
    },
    faqs: [
      { q: 'Can this work across several markets at once?', a: "That is usually the strongest reason to build it here. One repository means a finding in one market is available in the others, instead of each one paying to learn the same thing separately." },
      { q: 'What does it cost?', a: "Bespoke, quoted in writing after the mapping session. The work depends on what you already run, so a list price would be misleading for most companies." },
      { q: 'Where does our data live?', a: "On your own accounts and infrastructure. Where data is sensitive or regulated enough that it should not leave your environment, that shapes the build rather than being worked around." },
      { q: 'Do you replace our marketing platform?', a: "Almost never. We build the layer above what you own — replacing a platform is expensive, disruptive and rarely the actual problem." },
      { q: 'Do you have people in Singapore?', a: "No. We are based in Sydney and work remotely, a few hours ahead of your day. The mapping session and everything after it is done on calls and in writing." },
    ],
    closing: { h2: 'See what one consolidated read would tell you.', p: "Fifteen minutes with Josh, no pitch deck. Including whether your data is in good enough shape to bother." },
    related: [
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The full service.' },
      { href: '/performance-marketing-agency-singapore', title: 'Performance in Singapore', note: 'The advertising side.' },
      { href: '/meta-ads-mcp', title: 'Meta Ads MCP', note: 'How the connector works.' },
      { href: '/ai-in-meta-ads-manager', title: 'AI in Ads Manager', note: 'What an agent may touch.' },
    ],
  },
  {
    slug: 'performance-marketing-agency-malaysia',
    title: 'Performance Marketing Agency for Malaysia | Sevenam',
    description: 'Performance marketing for Malaysian brands, run on your own ad account. Cheaper media than Singapore, a multilingual audience, and marketplaces competing for the same buyer.',
    eyebrow: 'MALAYSIA', h1: 'Performance Marketing in Malaysia',
    lead: 'Cheaper media than the markets next door, and a harder job turning it into margin.',
    s1: {
      h2: 'What actually decides a Malaysian account.',
      paras: [
        "Media is comparatively inexpensive, which sounds like an advantage and is really a change of problem. When impressions are cheap, the constraint moves downstream: to the offer, the landing experience, and whether the margin on the product survives the discounting the market expects. Plenty of Malaysian accounts have a good cost per click and no profitable path from there.",
        "The second factor is that a large share of buying happens on marketplaces rather than on brand sites. You are often not only competing with other advertisers, you are competing with a version of your own product on a platform that has trained the customer to expect a voucher. An ad that ignores that is asking the customer to pay more for a worse-known checkout.",
      ],
      items: [
        'Cheap impressions move the constraint to offer and margin.',
        'Marketplace habit competes with your own site for the same buyer.',
        'Discount expectation eats the margin that made the cheap media look good.',
        'A multilingual audience splits creative in ways a single-language market does not.',
        'Cost per result is easy to flatter here, so judge on blended revenue.',
      ],
    },
    s2: {
      h2: 'How we run it.',
      paras: [
        "On your own Business Manager, read every morning, with the day's decisions written down and the numbers beside them. In a cheap-media market the most valuable discipline is refusing to celebrate a low cost per click — we judge the account on what reached the bank, which usually means watching blended revenue rather than the number the platform reports.",
        "We are Sydney-based and work remotely, two to three hours ahead of Malaysia. We do not have a local office and will not claim one, and where creative needs Malay or Chinese, the language is yours — we build the system and the testing around it.",
      ],
      items: [
        'Your account, your billing, your data.',
        'Judged on blended revenue, not on platform-reported cost per click.',
        'Creative volume planned around a multilingual audience.',
        'Sydney-based and remote, slightly ahead of your day.',
        'Fixed fees that do not rise with your budget.',
      ],
    },
    faqs: [
      { q: 'Do you have an office in Malaysia?', a: "No. We are Sydney-based and work remotely with every client. If a local team is what you want, we would say so rather than take the work." },
      { q: 'Can you produce creative in Malay or Chinese?', a: "The system, the testing and the structure are ours; the language is yours or your translator's. We would rather be honest about that than produce copy in a language we cannot judge." },
      { q: 'Our cost per click is low but we are not profitable. Why?', a: "That is the most common pattern here. Cheap traffic is not the same as demand, and it hides a weak offer or a margin that cannot survive the discount the market expects. The fix is downstream of the ad account, and that is usually what an audit finds." },
      { q: 'Should we advertise our marketplace listings or our own site?', a: "Both, for different reasons, but they need separate measurement. Running them together and judging on one blended number is how brands conclude Meta does not work when what is happening is that one of the two is subsidising the other." },
      { q: 'What spend does this suit?', a: "Roughly $10,000 a month of media and up, the same as everywhere. Below that a day does not produce enough signal for a daily decision to beat a weekly one." },
    ],
    closing: { h2: 'Find out whether the cheap traffic is actually earning.', p: "Fifteen minutes with Josh, no pitch deck. Bring the account and the margin, because one is meaningless without the other." },
    related: [
      { href: '/performance-marketing-agency', title: 'Performance marketing', note: 'The full service.' },
      { href: '/marketing-automation-malaysia', title: 'Automation in Malaysia', note: 'The systems side.' },
      { href: '/what-is-roas', title: 'Break-even ROAS', note: 'Work out your floor.' },
      { href: '/facebook-ads-cpm-australia', title: 'CPM benchmarks', note: 'What media costs.' },
    ],
  },
  {
    slug: 'marketing-automation-malaysia',
    title: 'Marketing Automation Agency for Malaysia | Sevenam',
    description: 'AI agents, a marketing data repository and CRM automation for Malaysian businesses. Built on your own systems and quoted after we map what you run.',
    eyebrow: 'MALAYSIA', h1: 'Marketing Automation in Malaysia',
    lead: 'Where labour is affordable, automation has to earn its place on quality rather than cost.',
    s1: {
      h2: 'The honest case, and where it does not apply.',
      paras: [
        "In markets with high staff costs, automation is usually sold on headcount. That argument is weaker in Malaysia, and pretending otherwise would be dishonest — if the only benefit were replacing hours, the sums would often favour hiring. So the case has to be made on the things people cannot do at all: reading everything every day without getting bored, never forgetting what last quarter proved, and applying the same standard at eleven at night as at nine in the morning.",
        "That is a real difference rather than a cost saving. A system that reads every sales call, every support ticket and every ad result, and writes down what changed, produces a kind of consistency a rotating team does not — particularly across languages, where what customers actually say gets lost between the people who heard it and the people who write the ads.",
      ],
      items: [
        'The headcount argument is weaker here, so we do not lead with it.',
        'Consistency and memory are the real gains, not hours saved.',
        'Multilingual signal gets lost between the people who hear it and the people who write.',
        'Nothing accumulates when knowledge lives with whoever is on the account this quarter.',
        'If hiring is genuinely the better answer, that is what we will tell you.',
      ],
    },
    s2: {
      h2: 'What gets built.',
      paras: [
        "A marketing data repository holding what the market is telling you — objections, winning language, offers that worked and offers that did not, in whatever languages your customers use them. Agents with written job specs covering what each reads, when it runs, what it produces and what a person approves. Then the workflows joining those to your CRM and existing tools.",
        "Quoted bespoke after we map what you run. There is no list price, because the work is entirely shaped by what already exists and how much of the data can be trusted.",
      ],
      items: [
        'A repository that keeps what the business learns, across languages.',
        'Agents with job specs, schedules and approval gates.',
        'CRM automation, usually the fastest return in the build.',
        'Built on your own accounts, and yours if we stop.',
        'Bespoke, quoted in writing after the mapping session.',
      ],
    },
    faqs: [
      { q: 'Is automation worth it when staff are affordable?', a: "Not always, and we will say so. The argument here is consistency and memory rather than saved hours — a system reads everything every day and never forgets what last quarter proved. If your problem is genuinely capacity, hiring may be the better answer." },
      { q: 'Can it handle more than one language?', a: "Yes, and that is often where the value is, because customer language gets lost in translation between the people who hear it and the people who write the ads. The repository keeps what was actually said." },
      { q: 'What does it cost?', a: "Bespoke, quoted in writing after we map what you run. No list price, because the work depends entirely on what already exists." },
      { q: 'Do you work with Malaysian CRMs?', a: "We work with what you have. The approach does not change with the platform — the repository and the job specs are the system, and the tools sit underneath it." },
      { q: 'Do you have people in Malaysia?', a: "No. We are Sydney-based and work remotely, and everything from the mapping session onward is done on calls and in writing." },
    ],
    closing: { h2: 'Find out whether this beats hiring for you.', p: "Fifteen minutes with Josh, no pitch deck. Sometimes the answer is that it does not, and that is worth knowing in fifteen minutes." },
    related: [
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The full service.' },
      { href: '/performance-marketing-agency-malaysia', title: 'Performance in Malaysia', note: 'The advertising side.' },
      { href: '/automate-meta-ads', title: 'What actually automates', note: 'And what does not.' },
      { href: '/ai-in-meta-ads-manager', title: 'AI in Ads Manager', note: 'What an agent may touch.' },
    ],
  },
  {
    slug: 'email-marketing-agency',
    title: 'Email Marketing Agency or Automation? | Sevenam',
    description: 'Most email marketing agencies send campaigns. The return usually sits in the flows and the CRM data underneath them. What we build instead, and when an email agency is the better fit.',
    eyebrow: 'EMAIL', h1: 'Email Marketing Agency or Automation?',
    lead: 'Sending the campaign is the cheap part. The money is in what the system knows before it sends.',
    support: 'Sevenam builds the system underneath your marketing — a repository of what the market is telling you, a set of agents with real job specs, and the workflows that connect them to the CRM and the email platform you already own. Scoped and quoted after we map what you run.',
    trust: ['Built on your own accounts', 'Quoted after we map it', 'Yours if we stop'],
    s1: {
      h2: 'What an email marketing agency does, and where it stops.',
      paras: [
        "The standard engagement is a retainer against a send calendar: a campaign a week, a seasonal promotion, a newsletter, and a monthly report on open and click rates. It is real work and some agencies do it very well. But the shape of it means the output is measured in emails sent rather than in what the list is worth, and a calendar can be delivered in full while the underlying asset gets no better.",
        "The uncomfortable arithmetic in most accounts is that broadcast campaigns are a minority of email revenue. The automated flows — welcome, browse and cart abandonment, post-purchase, win-back — keep earning without anyone touching them, and they are usually the part nobody has revisited in two years because they are not on the calendar. So the recurring fee buys the low-yield half of the channel.",
        "The second thing that stops is the data. An agency sending from your platform sees opens and clicks; it does not see what sales heard on the phone last week, which objection killed three deals, or which ad brought the person in. Without that, segmentation stays demographic and the copy stays generic, because there is nothing better to write from.",
      ],
      items: [
        'The retainer usually buys broadcasts, which are the smaller share of revenue.',
        'Flows earn continuously and are rarely on anyone’s calendar.',
        'Open rates went unreliable when mail clients started pre-fetching images.',
        'Segmentation stays shallow when the only inputs are opens and clicks.',
        'Nothing accumulates: month twelve starts from the same place as month one.',
      ],
    },
    s2: {
      h2: 'What we build instead.',
      paras: [
        "We are not an email marketing agency and will not write your weekly send. What we build is the layer underneath it: a marketing data repository holding what the market is actually telling you — objections from sales calls, the language that earns replies, the offers that converted — and a set of agents with written job specs that read it, draft against it, and hand a person the decision.",
        "In practice the first return is almost always CRM automation. Records that update themselves from real activity, lifecycle stages that move on evidence rather than on someone remembering, and lists that are correct on the morning you send rather than correct last quarter. A mediocre email into a correct segment beats an excellent one into a stale list, every time.",
        "Nothing goes to a customer without someone approving it. That is the whole reason this can be trusted with a live list — an agent drafts, a person agrees, and the send happens. It is scoped after we map what you run, and quoted bespoke, because a business on one clean CRM and a business running four disconnected tools are not the same job.",
      ],
      items: [
        'A repository: the memory the drafting runs on.',
        'CRM automation first — usually the fastest return in the build.',
        'Flows audited and rebuilt, because that is where the revenue is.',
        'Agents draft; a person approves before anything reaches a customer.',
        'Built on your own platform and CRM, and yours if we stop.',
        'Bespoke pricing, quoted in writing after the mapping session.',
      ],
    },
    faqs: [
      { q: 'So you are not an email marketing agency?', a: "No, and it would be dishonest to take the work on that basis. If what you need is someone writing and sending a campaign every week, a specialist email agency is the right hire and we would tell you so on the call. What we build is the automation and the data underneath the channel." },
      { q: 'What does it cost?', a: "Bespoke, quoted in writing after we map what you run. There is no list price for this the way there is for our Meta advertising products, because there is no standard shape to the work — it depends entirely on what already exists and how much of the data can be trusted." },
      { q: 'Do you work with Klaviyo, HubSpot or Mailchimp?', a: "We work with what you already pay for. The platform matters much less than the state of the data going into it, and migrating you to something new is rarely the first thing that should happen." },
      { q: 'Will an agent send emails to our list on its own?', a: "No. Nothing that emails a customer or changes a record leaves the system without a person agreeing to it. Approval gates are part of the build rather than a setting you can switch off." },
      { q: 'Where do the flows fit in?', a: "They are usually the first audit we run, because in most accounts they earn more than the broadcasts and have been left alone the longest. Fixing a welcome sequence and a cart abandonment flow is often the cheapest revenue in the project." },
      { q: 'Do we need to be doing Meta ads with you?', a: "No. The automation line stands on its own and several of the businesses it suits are not running paid social at all. Where both are in place they feed each other — what the ad account learns is worth having in the repository — but neither requires the other." },
    ],
    closing: { h2: 'Find out whether your email is a copy problem or a data problem.', p: "Fifteen minutes with Josh, no pitch deck. Most lists that underperform are segmented from information nobody has collected yet, and that is a faster answer than a proposal." },
    related: [
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The full service.' },
      { href: '/growth', title: 'What we work on', note: 'The two lines.' },
      { href: '/automate-meta-ads', title: 'What actually automates', note: 'And what does not.' },
      { href: '/apply', title: 'Get started', note: 'Four fields.' },
    ],
  },
  {
    slug: 'digital-marketing-agency-sydney',
    title: 'Digital Marketing Agency Sydney | Sevenam',
    description: 'Digital marketing for Sydney businesses, built as systems you own rather than bought as a retainer. The most expensive media market in the country, and the most expensive agency rates.',
    eyebrow: 'SYDNEY', h1: 'Digital Marketing Agency in Sydney',
    lead: 'The most expensive auction in the country, bought at the most expensive agency rates in the country.',
    s1: {
      h2: 'What Sydney costs you twice over.',
      paras: [
        "Sydney runs the highest media costs in Australia and the highest agency rates, and the two compound. Finance, property, insurance and professional services all concentrate here, and they bid with lifetime values that a consumer brand cannot match — so the CPM you pay for an ordinary audience is set partly by advertisers who can afford three times what you can. That is the auction, and no agency changes it.",
        "What an agency does change is the second cost. A Sydney full-service retainer buys you a team, and the honest arithmetic is that most of the hours go to coordination: the status call, the deck, the monthly report, the account manager relaying between you and the person who actually touches the account. On a $12,000 retainer that is a lot of money for meetings, and it is the part of the invoice that grows when the team grows.",
        "The businesses that do well here are the ones that stop paying for the channel to be managed and start paying for it to be built. Once the system exists it runs on its own economics, and the recurring cost is the decisions rather than the department.",
      ],
      items: [
        'The highest CPMs in the country, set partly by advertisers with far higher margins.',
        'The highest agency rates in the country, layered on top of that.',
        'Most of a full-service retainer is coordination, not execution.',
        'Media cost is the auction. Agency cost is a choice.',
        'A system built once has a lower recurring cost than a team retained monthly.',
      ],
    },
    s2: {
      h2: 'What we actually do, and what we do not.',
      paras: [
        "Three things. Meta advertising installed on your own ad account and operated by written decisions every morning. The creative that feeds it, because in a market this expensive the only durable lever is what goes into the auction. And the marketing automation underneath both — the CRM, the data, the agents that read what the market is telling you and draft against it.",
        "We do not run your SEO, write your press releases, or manage your organic social calendar. If what you want is one supplier for all of it, a full-service Sydney agency is the right hire and we will say so on the call rather than take the work and subcontract it. What we are is the technical half done properly, on infrastructure you own outright.",
        "We are based in Sydney, so a same-day conversation is genuinely same-day. But nothing depends on that — the account is read every morning and the decisions arrive written down whether anyone is in the room or not.",
      ],
      items: [
        'Meta advertising, on your own Business Manager from the first hour.',
        'Creative volume, because the auction here punishes a thin library.',
        'Marketing automation and CRM, quoted bespoke after we map it.',
        'No SEO, no PR, no organic social calendar — and we will tell you so.',
        'Sydney-based, and the decisions land in writing regardless.',
      ],
    },
    faqs: [
      { q: 'Are you a full-service digital agency?', a: "Not in the traditional sense. We cover paid social, creative and marketing automation properly rather than covering everything shallowly. Where a project genuinely needs SEO or PR we will say so and stay out of it, because subcontracting a discipline you cannot audit is how retainers quietly get worse." },
      { q: 'Why are Sydney CPMs so high?', a: "Because the advertisers with the highest margins in the country are concentrated here — finance, property, insurance, professional services — and they can afford to pay more for the same impression than a consumer brand can. You are not bidding against your competitors alone; you are bidding against everyone targeting the same person." },
      { q: 'Do you work with Sydney businesses only?', a: "No. We are based in Sydney and work wherever the auction runs, including New Zealand and Southeast Asia. The local pages exist because that is how people search, not because the work is geographically limited." },
      { q: 'What does it cost?', a: "The Meta setup is $19,500 once and the daily decisions are $2,500 a month, both excluding GST, and creative packages start at $5,000. Marketing automation is quoted bespoke after we map what you run, because there is no standard shape to it." },
      { q: 'Can you take over an account an agency already built?', a: "Usually, and the first question is whose Business Manager it lives in. If the assets are in an agency-owned account, getting them moved is the first piece of work and it is worth doing whoever you end up using." },
    ],
    closing: { h2: 'Find out what the coordination is costing you.', p: "Fifteen minutes with Josh, no pitch deck. Bring the retainer and the account, and we will tell you which half of the invoice is actually buying performance." },
    related: [
      { href: '/digital-marketing-agency', title: 'Digital marketing agency', note: 'The full argument.' },
      { href: '/facebook-ads-sydney', title: 'Facebook ads Sydney', note: 'The paid social side.' },
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The systems side.' },
      { href: '/agency-fee', title: 'What a fee really costs', note: 'The calculator.' },
    ],
  },
  {
    slug: 'digital-marketing-agency-melbourne',
    title: 'Digital Marketing Agency Melbourne | Sevenam',
    description: 'Digital marketing for Melbourne businesses, built as systems you own. The densest agency market in the country, and the one where creative fatigue arrives first.',
    eyebrow: 'MELBOURNE', h1: 'Digital Marketing Agency in Melbourne',
    lead: 'The most crowded agency market in the country, selling to the most crowded advertiser market in the country.',
    s1: {
      h2: 'Why breadth is the pitch here, and why it should not be.',
      paras: [
        "Melbourne has more agencies per advertiser than anywhere else in Australia, and when a market is that crowded the easiest way to differentiate is to add a service line. So the pitch becomes range — paid, organic, SEO, content, email, CRO, all under one roof — because range is the thing a competitor down the road cannot immediately match. It is a good sales strategy. It is rarely a good operating one.",
        "The advertiser side is just as crowded, and in a specific way: Melbourne carries the country's densest concentration of retail, fashion and hospitality advertisers, all working the same seasonal calendar. They chase the same audiences in the same weeks, so a winning ad has a shorter useful life here than almost anywhere else. Frequency climbs, CPMs follow, and the concept that carried autumn stops working in a fortnight.",
        "Those two facts collide badly. An account that needs a high creative replacement rate is exactly the account that suffers when creative is one of eight things a generalist team is juggling. Volume of output is the whole game, and volume is what breadth costs you.",
      ],
      items: [
        'More agencies per advertiser than any other Australian market.',
        'Breadth is the local differentiator, so it gets sold hard.',
        'Retail, fashion and hospitality density means a shared seasonal calendar.',
        'Creative fatigue arrives in weeks, not months.',
        'A high replacement rate is the first thing a generalist team drops.',
      ],
    },
    s2: {
      h2: 'What we actually do, and what we do not.',
      paras: [
        "Meta advertising on your own ad account, operated by written decisions every morning. The creative that feeds it, produced at the rate this market actually consumes rather than the rate a retainer makes convenient. And marketing automation underneath both — CRM, the data repository, agents with real job specs.",
        "We do not do SEO, PR or organic social. In a market where every second agency offers all of it, saying that out loud costs us some enquiries and saves everyone the more expensive discovery six months in. If you need the full stack, hire the full stack and let us do the paid and the systems inside it.",
        "We work from Sydney and run Melbourne accounts remotely. There is no Melbourne office and we will not imply one — what there is instead is a read of the account before your morning, every morning, which is worth considerably more than a quarterly visit.",
      ],
      items: [
        'Creative volume as the primary lever, because here it is the constraint.',
        'Meta advertising on your Business Manager, yours from hour one.',
        'Marketing automation and CRM, scoped and quoted bespoke.',
        'No SEO, no PR, no organic calendar — deliberately.',
        'Sydney-based and remote. No Melbourne office, and we will not claim one.',
      ],
    },
    faqs: [
      { q: 'Do you have a Melbourne office?', a: "No. We are based in Sydney and work remotely, which is how every account runs regardless of city. If having someone in the room matters to you, a Melbourne agency is the better fit and we would say so." },
      { q: 'Why does creative fatigue faster in Melbourne?', a: "Because the addressable audience is being worked by an unusually dense set of advertisers on the same seasonal calendar. Frequency against any given segment climbs faster, and cost per result follows it. The fix is supply — genuinely distinct concepts entering the auction continuously, not variations of one image." },
      { q: 'Can you replace our full-service agency?', a: "For paid social, creative and the systems underneath, yes. For SEO, PR and organic social, no — and we would rather you kept a specialist for those than let us pretend. Most of the businesses we work with end up with two suppliers instead of one, and spend less in total." },
      { q: 'How much creative do we actually need?', a: "More than most accounts produce, and the honest answer depends on spend and audience size. The creative calculator on the site gives an indicative figure from your own numbers, and the call turns that into a real one." },
      { q: 'What does it cost?', a: "The Meta setup is $19,500 once and the daily decisions are $2,500 a month, both excluding GST. Creative packages start at $5,000. Marketing automation is quoted bespoke after we map what you already run." },
    ],
    closing: { h2: 'Find out whether your ceiling is the market or the creative.', p: "Fifteen minutes with Josh, no pitch deck. In this market it is almost always the creative, and the account will show it." },
    related: [
      { href: '/digital-marketing-agency', title: 'Digital marketing agency', note: 'The full argument.' },
      { href: '/facebook-ads-melbourne', title: 'Facebook ads Melbourne', note: 'The paid social side.' },
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'What volume costs.' },
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The systems side.' },
    ],
  },
  {
    slug: 'digital-marketing-agency-brisbane',
    title: 'Digital Marketing Agency Brisbane | Sevenam',
    description: 'Digital marketing for Brisbane businesses, built as systems you own. Cheaper media than the southern capitals, and a retainer market that has not caught up.',
    eyebrow: 'BRISBANE', h1: 'Digital Marketing Agency in Brisbane',
    lead: 'Cheaper media than Sydney and Melbourne, sold at southern-capital retainer rates.',
    s1: {
      h2: 'The mismatch worth knowing about.',
      paras: [
        "Brisbane media is meaningfully cheaper than Sydney or Melbourne — a smaller pool of advertisers bidding for a fast-growing population. That is a real advantage and it is the reason a lot of Queensland accounts look healthier than their southern equivalents at the same spend. What has not adjusted at the same rate is the price of managing it.",
        "The result is a common shape: an account spending $20,000 a month paying a retainer sized for an account spending $60,000, because the retainer was benchmarked against a Sydney rate card. On cheaper media the fee is a much larger fraction of total marketing cost, and the ratio is what matters — not whether the number sounds reasonable in isolation.",
        "The other Brisbane pattern is owner-operators and franchise groups rather than marketing departments. That changes what good looks like: the person deciding is usually also running the business, so a monthly report nobody has time to read is worse than useless, and a daily instruction they can act on in five minutes is worth a great deal.",
      ],
      items: [
        'Lower CPMs than the southern capitals, from a thinner advertiser pool.',
        'Retainers often benchmarked against Sydney rather than the local account size.',
        'On cheaper media, the fee is a larger share of total cost.',
        'More owner-operators and franchise groups, fewer marketing departments.',
        'A daily instruction beats a monthly report when the reader also runs the business.',
      ],
    },
    s2: {
      h2: 'What we actually do, and what we do not.',
      paras: [
        "Meta advertising built on your own ad account and run by written decisions every morning — one page, in plain English, telling you what to do that day. The creative that feeds it. And marketing automation across the wider business, which in a franchise or multi-site group is often where the largest return sits, because the same manual work is being repeated in every location.",
        "We do not do SEO, PR or organic social. For a Brisbane business that mostly means keeping a local specialist for the local search work and using us for the paid and the systems — which is usually cheaper than one supplier billing for both.",
        "We are Sydney-based and work remotely. Same time zone for most of the year, no travel cost baked into a fee, and nothing that depends on being in the room.",
      ],
      items: [
        'Written decisions daily, sized for someone who also runs the business.',
        'Your Business Manager, your pixel, your creative library.',
        'Automation that removes work repeated across sites or franchisees.',
        'No SEO, no PR, no organic calendar.',
        'Sydney-based, remote, no travel loaded into the fee.',
      ],
    },
    faqs: [
      { q: 'Is our spend too small for this?', a: "It is about signal rather than city. Below roughly $10,000 a month there is usually not enough daily conversion data for a daily decision to beat a weekly one, and we will tell you that rather than sell you the system anyway." },
      { q: 'Do you work with franchise groups?', a: "Yes, and it is one of the clearer cases for the automation side — the same reporting, list-building and lead follow-up is usually being done by hand in every location. Building it once and running it everywhere is a larger return than tuning any single ad account." },
      { q: 'Do you have a Brisbane office?', a: "No. We are based in Sydney and work remotely with businesses across Australia and the region. We will not claim a local presence we do not have." },
      { q: 'Is Brisbane media really cheaper?', a: "Generally yes, for the same audience definition, because fewer advertisers are competing for it. It is not a licence to spend less attention on the account — a cheap auction still punishes a thin creative library, it just takes slightly longer to do it." },
      { q: 'What does it cost?', a: "The Meta setup is $19,500 once and the daily decisions are $2,500 a month, both excluding GST, with creative packages from $5,000. Automation is quoted bespoke after the mapping session." },
    ],
    closing: { h2: 'Find out what share of your marketing budget is fee.', p: "Fifteen minutes with Josh, no pitch deck. Bring what you spend and what you pay, and the ratio will tell you most of it." },
    related: [
      { href: '/digital-marketing-agency', title: 'Digital marketing agency', note: 'The full argument.' },
      { href: '/facebook-ads-brisbane', title: 'Facebook ads Brisbane', note: 'The paid social side.' },
      { href: '/agency-fee', title: 'What a fee really costs', note: 'The calculator.' },
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The systems side.' },
    ],
  },
  {
    slug: 'digital-marketing-agency-perth',
    title: 'Digital Marketing Agency Perth | Sevenam',
    description: 'Digital marketing for Perth businesses, built as systems you own. Three hours behind the east coast, which is exactly why a written daily decision beats a national agency call.',
    eyebrow: 'PERTH', h1: 'Digital Marketing Agency in Perth',
    lead: 'Three hours behind the east coast, which is where most of the agencies are.',
    s1: {
      h2: 'The time zone is the whole problem.',
      paras: [
        "Perth sits two to three hours behind Sydney and Melbourne depending on the season, and almost every national agency is on the east coast. In practice that means an eastern team starts work as the Perth morning is already underway and finishes before the Perth afternoon does. A question asked at 9am in Perth is answered at lunchtime; a problem spotted on Friday afternoon in Perth reaches the account on Monday.",
        "That gap is invisible on a monthly report and expensive in an ad account. A losing ad set left running from Friday to Monday is three days of spend, and the platform does not pause while anyone is offline. It is the single most common reason a Perth business ends up feeling like it is being serviced rather than managed.",
        "A written decision removes the problem entirely, because it does not require anyone to be awake at the same time as anyone else. The account is read overnight, the instruction is waiting before your morning, and you approve what runs. Distance from the agency stops mattering when the agency is not the bottleneck.",
      ],
      items: [
        'Two to three hours behind the agencies most likely to be pitching you.',
        'An eastern working day barely overlaps a western one.',
        'Weekend drift is real money and does not show up in a monthly report.',
        'Written decisions do not need two people awake at once.',
        'A thinner local agency market, so less competitive pressure on rates.',
      ],
    },
    s2: {
      h2: 'What we actually do, and what we do not.',
      paras: [
        "Meta advertising on your own ad account with a written decision waiting each morning — which for a Perth account means genuinely each morning, not the east coast's. The creative that feeds it. And marketing automation across the business, which suits the resources-adjacent B2B common here, where the sales cycle runs long past the click and most of the value is in what the CRM does with the lead afterwards.",
        "We do not do SEO, PR or organic social. Perth has a good local market for that work and we would rather you used it than let us subcontract something we cannot audit.",
        "We are Sydney-based and remote, and we are not going to pretend the time difference is a feature. What we will say is that the operating model was built so it does not matter, and that is a stronger claim than a fly-in visit twice a year.",
      ],
      items: [
        'The morning decision lands in your morning, not the east coast’s.',
        'Your Business Manager and your creative library from hour one.',
        'Automation for long B2B cycles, where the CRM does most of the work.',
        'No SEO, no PR, no organic calendar.',
        'Sydney-based and remote, with an operating model that does not need overlap.',
      ],
    },
    faqs: [
      { q: 'Does the time difference actually matter?', a: "It matters when the operating model depends on people talking. Ours does not — the account is read overnight and the instruction is written before your morning. That is the reason we can say the distance is not the issue without it being a sales line." },
      { q: 'Do you have a Perth office?', a: "No. We are based in Sydney and work remotely across Australia and the region. If a local presence is a requirement, say so early and we will not waste your time." },
      { q: 'Do you work with B2B and resources-adjacent businesses?', a: "Yes, and the shape of the work is different: fewer decisions in the ad account, far more in what happens between the lead arriving and the deal closing. That is usually an automation and CRM project with paid social attached, rather than the other way round." },
      { q: 'Can you handle Western Australian compliance requirements?', a: "We build to whatever claims and evidentiary standards your industry requires, and where an industry has specific advertising rules the approval gate is where they get enforced. We are not lawyers and will not act as your compliance sign-off." },
      { q: 'What does it cost?', a: "The Meta setup is $19,500 once and the daily decisions are $2,500 a month, both excluding GST, with creative packages from $5,000. Automation is bespoke, quoted after we map what you run." },
    ],
    closing: { h2: 'Find out what the time difference is costing you.', p: "Fifteen minutes with Josh, no pitch deck. Look at what happened in the account over the last three weekends — that is usually the answer." },
    related: [
      { href: '/digital-marketing-agency', title: 'Digital marketing agency', note: 'The full argument.' },
      { href: '/facebook-ads-perth', title: 'Facebook ads Perth', note: 'The paid social side.' },
      { href: '/marketing-automation', title: 'Marketing automation', note: 'The systems side.' },
      { href: '/system', title: 'How the mornings work', note: 'The operating model.' },
    ],
  },
  {
    slug: 'digital-marketing-agency-canberra',
    title: 'Digital Marketing Agency Canberra | Sevenam',
    description: 'Digital marketing for Canberra businesses, built as systems you own. A government-shaped market where the click is the start of a long procurement, not the end of a funnel.',
    eyebrow: 'CANBERRA', h1: 'Digital Marketing Agency in Canberra',
    lead: 'A market where almost nothing closes on the click, and the funnel is a procurement process.',
    s1: {
      h2: 'Why the usual playbook does not fit here.',
      paras: [
        "Canberra's economy is shaped by government and the businesses that sell to it, and that changes the fundamentals of a digital marketing account. The buying cycle is long, the decision is made by a group rather than a person, and the thing being bought is frequently awarded through a panel or a tender rather than a checkout. Optimising towards a purchase event is meaningless when there is no purchase event for eighteen months.",
        "That has two practical consequences. First, whatever you optimise towards has to be a real early signal that correlates with revenue — a qualified enquiry, a capability document downloaded by the right kind of organisation — and defining that honestly is most of the work. Second, the value of the account is decided long after the click, in whether the CRM keeps the relationship warm through a cycle measured in quarters.",
        "The other Canberra particular is standards. Public-sector-adjacent advertising is held to a higher bar on claims, accessibility and record-keeping than consumer ecommerce, and an agency that treats those as friction will eventually create a problem that costs more than the campaign earned.",
      ],
      items: [
        'Long, committee-led buying cycles with no purchase event to optimise towards.',
        'Panels and tenders rather than checkouts.',
        'The optimisation event has to be an honest early proxy for revenue.',
        'Most of the value is created after the click, inside the CRM.',
        'Higher expectations on claims, accessibility and record-keeping.',
      ],
    },
    s2: {
      h2: 'What we actually do, and what we do not.',
      paras: [
        "For a market like this the automation side usually leads and the advertising follows. A marketing data repository holding what the market is actually telling you, CRM automation that keeps a long relationship warm without anyone remembering to, and agents with written job specs that draft and hand a person the decision. Then Meta advertising on your own ad account, optimised towards a signal that means something rather than the one that fills up fastest.",
        "We do not do SEO, PR or organic social, and we do not write tender responses. We are also not a compliance function: we will build approval gates so that nothing reaches a customer without a person agreeing to it, but the person agreeing has to be yours.",
        "We are Sydney-based and work remotely. Canberra is close enough that a meeting is possible and rarely necessary — the operating model is written decisions, and those arrive the same way from anywhere.",
      ],
      items: [
        'Automation and CRM first, advertising second, in most cases here.',
        'Optimisation towards a defined, honest early signal.',
        'Approval gates on anything that reaches a customer or changes a record.',
        'No SEO, no PR, no tender writing, no compliance sign-off.',
        'Sydney-based and remote, with the same written decisions.',
      ],
    },
    faqs: [
      { q: 'Do you work with government agencies?', a: "We work with businesses that sell to government and to the organisations around it. We are a small company and not on procurement panels, so if your requirement is a panel supplier we are not the answer and it is quicker to know that now." },
      { q: 'How do you measure anything with an eighteen-month cycle?', a: "By agreeing an early signal that genuinely correlates with revenue, and being honest that it is a proxy. Then the job is keeping the relationship alive from that signal to the decision, which is a CRM and automation problem rather than an advertising one." },
      { q: 'Can you meet accessibility requirements?', a: "The site work and the assets we produce are built to WCAG AA as a matter of course rather than on request. Where a specific standard applies to your organisation, tell us at the start and it shapes the build instead of being retrofitted." },
      { q: 'Is Meta advertising even right for this market?', a: "Sometimes not, and we will say so. Where the audience is a few hundred named organisations, paid social is a poor fit and the money is better spent on the systems that handle the relationships you already have. That is a real answer we give on the call." },
      { q: 'What does it cost?', a: "Marketing automation is quoted bespoke after we map what you run, because the work depends entirely on what already exists. Where Meta advertising is part of it, the setup is $19,500 once and the daily decisions $2,500 a month, both excluding GST." },
    ],
    closing: { h2: 'Find out whether advertising is even your constraint.', p: "Fifteen minutes with Josh, no pitch deck. In a market like this it is usually the systems between the enquiry and the decision, and that is a cheaper problem to fix." },
    related: [
      { href: '/digital-marketing-agency', title: 'Digital marketing agency', note: 'The full argument.' },
      { href: '/facebook-ads-canberra', title: 'Facebook ads Canberra', note: 'The paid social side.' },
      { href: '/marketing-automation', title: 'Marketing automation', note: 'Usually the lead here.' },
      { href: '/email-marketing-agency', title: 'Email and CRM', note: 'Keeping a long cycle warm.' },
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
    /* The Meta support line is wrong on a page selling something else, so it is
       overridable. Every other page still gets SUPPORT. */
    support: p.support || SUPPORT,
    trust: p.trust,
    gallery: p.gallery,
    sections: [
      { tone: 'paper', h2: p.s1.h2, paras: p.s1.paras, items: p.s1.items },
      { tone: 'ink', h2: p.s2.h2, paras: p.s2.paras, items: p.s2.items },
      /* /ad-creative carries the ownership argument in its FAQ instead — the page
         is long enough already, and repeating the section there pushes the
         creative case below the fold on a page that has to sell creative. */
      ...(p.skipOwnership ? [] : [{ tone: 'paper', h2: OWNERSHIP.h2, paras: OWNERSHIP.paras, items: OWNERSHIP.items }]),
    ],
    tables: p.tables,
    /* Only the digital-marketing head page sets this: a row of city links so the
       five city pages are reachable from the term they sit under. */
    pills: p.pills,
    /* Only the two cost pages set this. Undefined elsewhere, so every other
       service page renders exactly as before. */
    roasCalc: p.roasCalc,
    /* Only the automation pillar sets this. Undefined elsewhere. */
    systemMap: p.systemMap,
    /* Same rule: only the automation pillar sets these two. The explainer is
       the plain-English answer above the fold; the accordion folds the detail
       so the copy survives for search without being a wall to read. */
    explainer: p.explainer,
    accordion: p.accordion,
    sources: p.sources,
    callForm: p.callForm,
    /* Default /apply unless a page has a better next step of its own. Only
       /pricing-call sets these: its hero CTA points at its own form, because
       sending a "what does it cost" visitor away for the same four fields is
       the friction the page exists to remove. The closing CTA is still /apply. */
    ctaHref: p.ctaHref,
    ctaLabel: p.ctaLabel,
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
