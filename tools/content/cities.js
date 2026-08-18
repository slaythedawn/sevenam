/* City pages. Built from the Sydney template's structure, but each one argues a
   different point — near-duplicate city pages are a ranking liability, not a win. */

const CITIES = [
  {
    slug: 'facebook-ads-melbourne', city: 'Melbourne', region: 'Victoria', short: 'VIC',
    eyebrow: 'MELBOURNE, VICTORIA',
    lead: "Australia's most crowded auction, and the one where creative fatigue shows up first.",
    costH2: 'Why Melbourne accounts fatigue faster.',
    costParas: [
      "Melbourne carries the densest concentration of retail and fashion advertisers in the country, and they are largely chasing the same audiences with the same seasonal calendar. The practical effect is that a winning ad has a shorter useful life here than almost anywhere else — frequency climbs, CPMs follow, and the creative that carried you through autumn stops working in a fortnight.",
      "That makes production volume, not targeting, the thing that decides your year. An account being fed two new concepts a month cannot outrun fatigue in this market, no matter how the campaigns are structured.",
    ],
    costItems: [
      'Seasonal retail density means more advertisers bidding on the same weeks.',
      'Creative fatigue arrives sooner, so the replacement rate has to be higher.',
      'A percentage fee rises with the budget you added to fight that fatigue.',
      'Decision speed matters most when a winner only lasts a fortnight.',
    ],
    whoH2: 'Who this suits in Melbourne.',
    whoParas: [
      "The brands this fits are usually past the point where one person can keep up with the creative calendar by hand, and are spending enough that a day of drift costs real money.",
      "We work nationally from Sydney. In practice that means the decisions land in your morning, and you can get a person on the phone the same working day.",
    ],
    whoItems: [
      'Fashion, footwear and apparel with a heavy seasonal calendar.',
      'Ecommerce and DTC brands shipping nationally from a Victorian warehouse.',
      'Multi-site hospitality, fitness and retail groups.',
      'Considered-purchase B2B where the sales cycle runs past the click.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "You do not need someone in your postcode to buy media. The auction does not know where your agency sits, and neither does your customer. What you do need is somebody who reads the account properly and acts on it the same day.",
      "Everything is built inside your own Business Manager — the account, the pixel, the audiences, the creative files. If we stop working together, none of it moves.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you a Melbourne agency?', a: "We are not an agency at all, and we are based in Sydney. We install the system on your own ad account and the decisions land first thing in your morning. Most of the businesses we work with we have never met in person, and it has never been the thing that mattered." },
      { q: 'Is Melbourne more expensive to advertise in?', a: "Media costs are set by the auction you are actually competing in, not by your postcode — a Melbourne fashion brand and a Sydney fashion brand bidding for the same national audience see much the same CPMs. What differs here is the density of advertisers on the same seasonal peaks, which is a creative volume problem more than a cost problem." },
      { q: 'Our agency charges a percentage of spend. Is that standard?', a: "It is common, and it is worth seeing in dollars rather than percent. Put your monthly spend into the fee calculator and look at the annual figure, then at what it becomes the next time you double the budget for the same work." },
      { q: 'Do we need someone in-house to run this?', a: "Someone needs about a minute each morning to approve the day's decisions — usually a founder, a marketing coordinator or an ecommerce manager. If nobody can, we quote the end-to-end option instead and do the execution ourselves." },
      { q: 'How quickly would we see anything change?', a: "The account check takes five days and tells you what is actually wrong. The setup runs four weeks. Daily decisions start from the moment the system is reading a clean account, which is usually inside the first fortnight." },
    ],
    closing: { h2: 'Have your Melbourne account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing the two or three things costing you the most right now — and what it would take to fix them." },
  },
  {
    slug: 'facebook-ads-brisbane', city: 'Brisbane', region: 'Queensland', short: 'QLD',
    eyebrow: 'BRISBANE, QUEENSLAND',
    lead: 'A market growing faster than the agencies serving it.',
    costH2: 'What Brisbane advertisers are actually paying for.',
    costParas: [
      "Brisbane has fewer specialist media buyers per advertiser than Sydney or Melbourne, which sounds like an advantage until you look at what fills the gap: generalist digital agencies running Meta as one line item among six, on a retainer that has not been re-examined in two years.",
      "The cost of that is rarely the fee itself. It is the decisions nobody made — the ad set left running eleven days past the point the numbers turned, the creative concept nobody replaced because it was not anybody's job that week.",
    ],
    costItems: [
      'Meta is often one service among many, and gets a fraction of the attention.',
      'Fewer specialists means slower decisions, not cheaper media.',
      'Retainers set at a smaller spend rarely get revisited as you scale.',
      'The expensive mistakes are the ones that took a week to notice.',
    ],
    whoH2: 'Who this suits in Brisbane.',
    whoParas: [
      "Queensland businesses that have outgrown a generalist agency but do not want to hire a full in-house media team to replace it. The system covers the daily decisions; you keep the judgement calls.",
      "We work nationally from Sydney, in your timezone, on your own account.",
    ],
    whoItems: [
      'Ecommerce and DTC brands distributing nationally.',
      'Home services and trades businesses buying leads at volume.',
      'Multi-location retail, hospitality and fitness.',
      'Health, allied health and NDIS providers advertising under compliance rules.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "Being in the same city as your media buyer buys you a coffee meeting, not better performance. What changes the numbers is how fast somebody reads the account and acts on what it says.",
      "The account, the pixel, the audiences and the creative files are all built in your own Business Manager, and they stay with you.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you a Brisbane agency?', a: "We are not an agency, and we are based in Sydney. The system runs on your own ad account and the decisions arrive first thing in your morning, in your timezone. We work with Queensland businesses remotely." },
      { q: 'We are with a digital agency that also does SEO and web. Is that a problem?', a: "Not necessarily, but it is worth checking how many hours a month actually go into the ad account, and who makes the call when performance turns on a Tuesday. Generalist agencies are usually fine at build and campaign setup, and structurally bad at daily decisions." },
      { q: 'What spend does this start making sense at?', a: "Around ten thousand a month in media. Below that there is not enough daily volume for a daily decision to be worth making, and we will tell you so rather than sell you the setup." },
      { q: 'Do you work with trades and home services?', a: "Yes. Lead quality matters more than lead volume there, so the decisions are built around booked jobs and cost per qualified enquiry rather than cost per form fill." },
      { q: 'What happens to the work if we stop?', a: "It stays. Everything is in your Business Manager from the first hour — you keep the account, the pixel, the audiences and every creative file we produced." },
    ],
    closing: { h2: 'Have your Brisbane account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing what is actually costing you money in the account, whether or not you do anything about it with us." },
  },
  {
    slug: 'facebook-ads-perth', city: 'Perth', region: 'Western Australia', short: 'WA',
    eyebrow: 'PERTH, WESTERN AUSTRALIA',
    lead: 'Two or three hours behind the east coast, and usually a day behind on decisions.',
    costH2: 'The timezone problem nobody prices in.',
    costParas: [
      "If your media buyer is on the east coast, their working day ends mid-afternoon in Perth. A change flagged on Tuesday morning in Sydney reaches a Perth account after lunch; a change flagged at four in Perth waits until Wednesday. Over a quarter, that gap compounds into a meaningful amount of spend running past the point it should have stopped.",
      "The decisions are written overnight and land at 7am wherever you are. That removes the timezone question entirely: you approve in your own morning, and the changes are actioned against your account the same day.",
    ],
    costItems: [
      'East coast agencies are effectively offline for half your working day.',
      'A one-day decision lag is a real cost at any serious spend level.',
      'Your 7am is your 7am — the decisions are written to your clock.',
      'Approving takes about a minute, from a phone, before the office opens.',
    ],
    whoH2: 'Who this suits in Perth.',
    whoParas: [
      "WA businesses that have felt the east coast lag and want the account decided locally without hiring a full in-house team to do it.",
      "We are based in Sydney and work nationally. The system removes the part of the relationship that timezone actually breaks — the daily decision.",
    ],
    whoItems: [
      'Ecommerce and DTC brands shipping nationally from WA.',
      'Mining services, industrial and B2B lead generation.',
      'Multi-site retail, hospitality and fitness groups.',
      'Home services and trades buying leads at volume.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "Perth has good operators and not many of them, which tends to mean the good ones are full. The system does not compete for their attention: it reads the account every night and puts the day's decisions in front of whoever you nominate.",
      "Everything is built in your own Business Manager and stays there.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you a Perth agency?', a: "No, we are based in Sydney, and the timezone is the reason the system exists in the shape it does. The decisions are written overnight and land at 7am your time, so you are never waiting on the east coast to wake up." },
      { q: 'Does the 7am timing follow WA time?', a: "Yes. The point of the system is that the day's decisions are ready before your working day starts, wherever that is." },
      { q: 'Is WA media more expensive?', a: "Not inherently. Some WA-specific audiences are thinner, which pushes frequency up faster at high spend, and that is a creative volume problem. The auction itself does not charge you extra for a postcode." },
      { q: 'Who approves the decisions?', a: "Whoever you nominate — usually the founder or a marketing coordinator. It takes about a minute on a phone. If nobody in the business can, we quote the end-to-end option and do the execution ourselves." },
      { q: 'Can we keep our current agency for creative?', a: "Yes, and some accounts do exactly that. We will tell you plainly if we think the creative supply is the constraint, but the system does not require you to move anything you are happy with." },
    ],
    closing: { h2: 'Have your Perth account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing the two or three things costing you the most right now — and what it would take to fix them." },
  },
  {
    slug: 'facebook-ads-adelaide', city: 'Adelaide', region: 'South Australia', short: 'SA',
    eyebrow: 'ADELAIDE, SOUTH AUSTRALIA',
    lead: 'A smaller market, where fee structure decides more of your margin.',
    costH2: 'Why the fee matters more at Adelaide spend levels.',
    costParas: [
      "In a market where a strong account might run thirty to eighty thousand a month rather than several hundred, the agency fee is a much larger share of the total cost of advertising. A percentage that looks modest against a national budget can be most of the difference between a campaign that pays and one that does not.",
      "The other half is attention. Smaller accounts get less of it from agencies priced on spend, because that is exactly what the pricing model rewards.",
    ],
    costItems: [
      'A percentage fee takes a bigger bite out of a smaller margin.',
      'Accounts priced on spend get attention in proportion to spend.',
      'Fixed cost makes the maths legible before you commit.',
      'Daily decisions do not cost more because the account is smaller.',
    ],
    whoH2: 'Who this suits in Adelaide.',
    whoParas: [
      "South Australian businesses spending enough for daily decisions to matter, who want the cost of running the account to be a known number rather than a function of the budget.",
      "We work nationally from Sydney, on your own ad account.",
    ],
    whoItems: [
      'Ecommerce and DTC brands with national distribution.',
      'Wine, food and producer brands selling direct.',
      'Professional services and B2B lead generation.',
      'Multi-site retail and hospitality.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "There is no version of media buying that works better because the buyer is nearby. What matters is that somebody reads the account daily and does something about what they find.",
      "The account, pixel, audiences and creative files live in your Business Manager from the first hour.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you an Adelaide agency?', a: "No, we are based in Sydney and work nationally. The system runs on your own account and the decisions land at 7am in your morning." },
      { q: 'Is our spend big enough?', a: "If you are consistently past about ten thousand a month in media, yes. Below that we will say so — there is not enough daily volume for the system to earn its keep, and we would rather tell you than sell you the setup." },
      { q: 'How is this cheaper than an agency?', a: "It may not be, and we would not lead with that. What it is, is fixed: the setup fee is quoted in writing and the monthly does not move when your budget does. Whether that is cheaper depends on what you are paying now, which the fee calculator will show you in about a minute." },
      { q: 'Do you understand the South Australian market?', a: "We understand the account. The auction, the creative constraint and the decision lag behave the same way in Adelaide as everywhere else, and your customers are usually national anyway." },
      { q: 'What is the first step?', a: "The account check: five days, a straight read on what the account is actually doing, and a written list of what would change. Plenty of them end with us saying you do not need us." },
    ],
    closing: { h2: 'Have your Adelaide account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave with a clear read on what the account is costing you and what is worth fixing first." },
  },
  {
    slug: 'facebook-ads-canberra', city: 'Canberra', region: 'Australian Capital Territory', short: 'ACT',
    eyebrow: 'CANBERRA, AUSTRALIAN CAPITAL TERRITORY',
    lead: 'Long sales cycles, small audiences, and reporting that has to survive scrutiny.',
    costH2: 'What makes Canberra accounts different.',
    costParas: [
      "A great deal of Canberra advertising is B2B, professional services or government-adjacent, which means the audience is small, the sales cycle runs for months, and the thing you actually care about happens long after the click. In-platform conversion numbers are close to useless in that setting, and they are exactly what most reporting leans on.",
      "Small audiences also fatigue fast. When your entire addressable market is a few hundred thousand people, frequency is the constraint from day one, and creative volume is the only lever that moves it.",
    ],
    costItems: [
      'Small addressable audiences hit frequency ceilings quickly.',
      'Long sales cycles make in-platform ROAS a misleading headline.',
      'Reporting has to hold up when somebody senior interrogates it.',
      'Creative volume is the constraint earlier here than in consumer markets.',
    ],
    whoH2: 'Who this suits in Canberra.',
    whoParas: [
      "Organisations that need advertising to produce qualified enquiries rather than impressions, and need to be able to explain the numbers to a board or a committee.",
      "We work nationally from Sydney, on your own ad account, with reporting you can audit.",
    ],
    whoItems: [
      'Professional services and B2B lead generation.',
      'Education, training and membership organisations.',
      'Health, allied health and NDIS providers.',
      'National ecommerce brands operating out of the ACT.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "Proximity does not improve an ad account. Reading it properly does, and so does acting the same day rather than at the next monthly meeting.",
      "Everything sits in your own Business Manager, which matters more than usual when procurement asks who owns what.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you a Canberra agency?', a: "No, we are based in Sydney and work nationally. The system runs on your own ad account and the daily decisions land at 7am." },
      { q: 'Does this work for B2B and long sales cycles?', a: "Yes, with the measurement built around qualified enquiries rather than in-platform conversions. The honest caveat is that the feedback loop is slower, so decisions lean harder on leading indicators and creative testing than on daily conversion counts." },
      { q: 'Our audience is tiny. Is Meta even right for us?', a: "Sometimes not, and we will say so. Where it does work, the answer is usually fewer audiences and far more creative, because frequency rather than reach is what is holding the account back." },
      { q: 'Can we own the account for procurement reasons?', a: "You already do — everything is built in your own Business Manager from the first hour. That is the default, not an option we charge for." },
      { q: 'What does the reporting look like?', a: "Plain English, with the numbers behind each decision attached. It is written so somebody who has never opened Ads Manager can follow why a change was made." },
    ],
    closing: { h2: 'Have your Canberra account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing whether Meta is the right channel for what you are selling, and what would have to change for it to work." },
  },
  {
    slug: 'facebook-ads-gold-coast', city: 'Gold Coast', region: 'Queensland', short: 'QLD',
    eyebrow: 'GOLD COAST, QUEENSLAND',
    lead: 'Founder-run brands that outgrew doing it themselves.',
    costH2: 'The point where running it yourself stops working.',
    costParas: [
      "The Gold Coast is full of founder-run ecommerce brands that got their first million dollars of revenue out of Meta by hand, learning the platform as they went. That works right up until the account needs a decision every day and the creative needs replacing every week, at which point the founder becomes the bottleneck in their own business.",
      "The usual next step is an agency on a percentage of spend, which fixes the time problem and creates a fee that grows every time the founder's own work scales the budget.",
    ],
    costItems: [
      'The founder becomes the constraint once daily decisions are needed.',
      'Hiring a media buyer is a big fixed cost at this stage.',
      'A percentage agency fee grows with budget you added yourself.',
      'Creative supply is almost always the real ceiling, not targeting.',
    ],
    whoH2: 'Who this suits on the Gold Coast.',
    whoParas: [
      "Brands past the hobby stage and short of an in-house media team — where somebody can still approve a decision each morning but nobody has time to make it from scratch.",
      "We work nationally from Sydney, on your own ad account.",
    ],
    whoItems: [
      'Ecommerce and DTC brands shipping nationally.',
      'Apparel, activewear, beauty and supplements.',
      'Tourism, accommodation and experience operators.',
      'Multi-site fitness, hospitality and retail.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "You do not need to meet your media buyer for the account to perform. You need somebody reading it every day and shipping enough creative to keep it fed.",
      "Everything is built in your own Business Manager and stays yours.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you a Gold Coast agency?', a: "No, we are based in Sydney and work nationally. The system runs on your own ad account, and the day's decisions land at 7am in your morning." },
      { q: 'I have always run the ads myself. Will I lose control?', a: "The opposite, in practice. You approve every decision before it happens and you keep the account, so you can see exactly what changed and why. Founders who have run their own ads tend to get the most out of it, because they can read the reasoning." },
      { q: 'Can we start with just creative?', a: "Yes. If the account is structurally fine and the real problem is that you cannot ship enough new ads, the creative batch on its own is often the right purchase and we will say so." },
      { q: 'What spend does this need?', a: "About ten thousand a month in media before daily decisions start earning their keep. Under three thousand, none of it is the right purchase yet and we will tell you that plainly." },
      { q: 'How long is the commitment?', a: "The setup is a four-week project with a fixed start and finish. Everything monthly is month to month, with no notice period." },
    ],
    closing: { h2: 'Have your Gold Coast account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing what is actually capping the account and what it would take to lift it." },
  },
  {
    slug: 'facebook-ads-sunshine-coast', city: 'Sunshine Coast', region: 'Queensland', short: 'QLD',
    eyebrow: 'SUNSHINE COAST, QUEENSLAND',
    lead: 'Smaller budgets, thinner margins, and no room for a fee that scales itself.',
    costH2: 'What a percentage fee does to a lean account.',
    costParas: [
      "Most Sunshine Coast advertisers are running budgets where every dollar of overhead is visible in the margin. A fee calculated as a share of media takes its cut before the campaign has proven anything, and it takes more every time you push the budget up to test something.",
      "The second problem is attention. An agency paid on spend has a structural reason to focus on its largest accounts, and a lean local account is rarely one of them.",
    ],
    costItems: [
      'Percentage fees compound exactly when you are trying to scale.',
      'Lean accounts get proportionally less attention under that model.',
      'A fixed cost can be compared against a return before you commit.',
      'Daily decisions do not become less useful because the budget is small.',
    ],
    whoH2: 'Who this suits on the Sunshine Coast.',
    whoParas: [
      "Businesses with enough consistent spend for a daily decision to be worth making, and a preference for knowing what the account costs to run before the month starts.",
      "We work nationally from Sydney, on your own ad account.",
    ],
    whoItems: [
      'Ecommerce and DTC brands selling nationally.',
      'Home services and trades buying leads at volume.',
      'Tourism, accommodation and hospitality operators.',
      'Health, allied health and NDIS providers.',
    ],
    localH2: 'Local, but not a local agency.',
    localParas: [
      "Being nearby is pleasant and it is not what moves the numbers. Reading the account daily and replacing creative before it fatigues is what moves the numbers.",
      "Everything is built in your own Business Manager from the first hour and stays there.",
    ],
    localItems: [
      'Your ad account, your pixel, your creative library. Always.',
      'A fixed setup fee and a fixed monthly, never a share of spend.',
      'Month to month, with no notice period.',
    ],
    faqs: [
      { q: 'Are you a Sunshine Coast agency?', a: "No, we are based in Sydney and work nationally. The system runs on your own account and the decisions land at 7am in your morning." },
      { q: 'Our budget is fairly small. Is this worth it?', a: "Honestly, maybe not yet. Under about three thousand a month in media there is not enough daily volume for any of this to pay for itself, and we will point you at the free guides instead. Past ten thousand it starts to make clear sense." },
      { q: 'We only sell locally. Does that change anything?', a: "It changes the audience size, which means frequency climbs faster and creative has to be replaced more often. The structure of the work is the same; the creative cadence matters more." },
      { q: 'Can we do this without hiring anyone?', a: "Yes, provided somebody can spend about a minute a morning approving decisions. If nobody can, the end-to-end option exists and we quote it as a fixed monthly." },
      { q: 'What do we get if we stop?', a: "Everything. The account, the pixel, the audiences and every creative file are yours and were never anywhere else." },
    ],
    closing: { h2: 'Have your Sunshine Coast account read properly.', p: "Fifteen minutes with Josh, no pitch. You will get a straight read on whether this is worth buying at your spend — including if the answer is no." },
  },
];

const SUPPORT = "Sevenam installs a Meta advertising system on your own ad account and runs the technology that operates it — written decisions at 7am every morning telling you exactly what to do that day. One fixed setup fee, a fixed monthly, and never a share of your media budget.";

function build() {
  return CITIES.map(c => {
    const others = CITIES.filter(o => o.slug !== c.slug)
      .map(o => ({ href: '/' + o.slug, label: o.city }));
    others.push({ href: '/facebook-ads-sydney', label: 'Sydney' });
    return {
      path: '/' + c.slug,
      title: `Facebook Ads ${c.city} — A System You Own, Not a Retainer | Sevenam`,
      description: `Meta advertising for ${c.city} businesses, run on your own ad account. Written decisions at 7am, a fixed fee, and never a percentage of your media spend.`,
      eyebrow: c.eyebrow,
      h1: `Facebook Ads ${c.city}`,
      lead: c.lead,
      support: SUPPORT,
      sections: [
        { tone: 'paper', h2: c.costH2, paras: c.costParas, items: c.costItems },
        { tone: 'ink', h2: c.whoH2, paras: c.whoParas, items: c.whoItems },
        { tone: 'paper', h2: c.localH2, paras: c.localParas, items: c.localItems },
      ],
      faqs: c.faqs,
      pills: { label: 'Other cities', links: others },
      related: [
        { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'Why you might not need one.' },
        { href: '/what-facebook-ads-agencies-charge', title: 'What agencies charge', note: 'The going rates, in dollars.' },
        { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
      ],
      closing: c.closing,
      service: { name: `Meta advertising systems in ${c.city}`, areaServed: `${c.city}, ${c.region}, Australia` },
      breadcrumb: [{ name: 'Home', path: '/' }, { name: `Facebook Ads ${c.city}`, path: '/' + c.slug }],
    };
  });
}

module.exports = { build, CITIES };
