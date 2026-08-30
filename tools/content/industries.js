/* Industry pages, built from the tradies template's structure. Each vertical has
   a different binding constraint — compliance, seasonality, lead quality — and
   the copy argues that rather than swapping a noun. */

const INDUSTRIES = [
  {
    slug: 'facebook-ads-for-healthcare', name: 'healthcare',
    eyebrow: 'HEALTHCARE AND ALLIED HEALTH',
    h1: 'Facebook Ads for Healthcare',
    lead: 'Compliance decides what you can say, so creative volume decides how well it works.',
    title: 'Facebook Ads for Healthcare — Compliant Creative, Real Enquiries | Sevenam',
    description: 'Meta advertising for Australian healthcare and allied health providers. Compliant creative, decisions at 7am, on your own ad account for a fixed fee.',
    s1: {
      h2: 'Compliance is the constraint, not the audience.',
      paras: [
        "Health advertising in Australia sits under both Meta's own rules and the advertising provisions that apply to regulated health services. Testimonials about clinical outcomes, before-and-after imagery and anything that could read as a guarantee are the usual points of failure — and the cost of getting it wrong is not a slap on the wrist, it is an account restriction that takes your whole channel offline.",
        "The practical consequence is that the creative angles available to you are narrower than in consumer ecommerce. Narrower angles fatigue faster, which means you need more distinct creative in market, not less.",
      ],
      items: [
        'Restricted claims narrow the usable creative angles from the start.',
        'Narrow angles fatigue faster, so replacement rate has to be higher.',
        'Account restrictions take the entire channel down, not one ad.',
        'Personal attributes rules affect how audiences can be described.',
      ],
    },
    s2: {
      h2: 'What we measure instead of clicks.',
      paras: [
        "A booked appointment that shows up is the only number that matters, and it happens days after the click, off-platform, in a practice management system Meta cannot see. Optimising to form fills produces a great deal of enquiry from people who were never going to attend.",
        "The daily decisions are built around cost per booked appointment where we can get that data back, and cost per qualified enquiry where we cannot.",
      ],
      items: [
        'Booked and attended, not form fills.',
        'Enquiry quality tracked back from your practice system where possible.',
        'Frequency watched closely on small local audiences.',
        'Creative rotated before fatigue shows up in cost per enquiry.',
      ],
    },
    s3: {
      h2: 'Your account, your patient data.',
      paras: [
        "Everything is built inside your own Business Manager — the ad account, the pixel, the audiences and the creative files. That matters more in health than anywhere else, because your data handling obligations do not transfer to an agency just because they set up the tracking.",
        "If we stop working together, none of it moves, and there is nothing to hand back.",
      ],
      items: [
        'Your ad account, your pixel, your creative library. Always.',
        'A fixed setup fee and a fixed monthly, priced to the work.',
        'Month to month, with no notice period.',
      ],
    },
    faqs: [
      { q: 'Can healthcare businesses advertise on Meta at all?', a: "Yes, within limits. What gets accounts into trouble is usually claims and imagery rather than the category itself — clinical outcome testimonials, before-and-after photos and anything implying a guaranteed result. Plenty of health advertisers run well inside the rules for years." },
      { q: 'Do you write the ad copy, and who is responsible for the claims?', a: "We produce the creative and we will flag anything that looks like a compliance risk, but the clinical and regulatory sign-off stays with you. You know your obligations and your professional body's rules better than we do, and you approve everything before it runs." },
      { q: 'Our audience is one suburb. Is that too small?', a: "It is small enough that frequency becomes the main constraint quickly. That is workable, but it means creative has to be replaced more often than a national advertiser would need to, and we would rather set that expectation up front." },
      { q: 'Can you track whether enquiries actually became appointments?', a: "Where your practice management system can export it, yes, and that is the number worth optimising against. Where it cannot, we work from qualified enquiry and tell you plainly that it is a proxy." },
      { q: 'What if our account gets restricted?', a: "It stays your account, so the appeal is yours to make and nothing is trapped with a third party. Prevention is the real answer: keeping claims conservative and the creative reviewable is cheaper than any appeal process." },
    ],
    closing: { h2: 'Have your health account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing where the compliance risk actually sits and what is capping enquiry volume." },
    related: [
      { href: '/ndis-facebook-ads', title: 'NDIS Facebook ads', note: 'Participant enquiry, within the rules.' },
      { href: '/facebook-ads-for-schools', title: 'Facebook ads for schools', note: 'Enrolment, not impressions.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
  {
    slug: 'facebook-ads-for-hotels', name: 'hotels',
    eyebrow: 'HOTELS AND ACCOMMODATION',
    h1: 'Facebook Ads for Hotels',
    lead: 'Every direct booking is the one the OTAs did not take a cut of.',
    title: 'Facebook Ads for Hotels — Direct Bookings, Not OTA Commission | Sevenam',
    description: 'Meta advertising for Australian hotels and accommodation. Drive direct bookings, run it on your own ad account, decisions at 7am for a fixed fee.',
    s1: {
      h2: 'The commission you are trying to avoid.',
      paras: [
        "Most accommodation businesses are already paying a substantial share of revenue to online travel agents for demand they could partly own. Advertising direct is the obvious answer, and it is usually run in a way that competes with the OTAs on their strongest ground — brand terms and last-minute intent — rather than earlier, where Meta actually works.",
        "The second thing that goes wrong is seasonality. An account tuned for peak season keeps spending the same way into the shoulder, and the numbers only reveal it weeks later.",
      ],
      items: [
        'OTA commission is the cost you are actually competing against.',
        'Meta earns its keep before intent, not at the point of booking search.',
        'Seasonal demand swings punish accounts that are only reviewed monthly.',
        'Booking windows vary by segment, so attribution has to allow for the lag.',
      ],
    },
    s2: {
      h2: 'What the daily decisions handle.',
      paras: [
        "Rates change, availability changes and demand changes daily; the advertising usually does not. That mismatch is the single most expensive thing in most accommodation accounts.",
        "The system reads the account overnight and writes what should change that day — where budget moves as occupancy shifts, which creative to push into a soft midweek, what to stop when a period is already filling.",
      ],
      items: [
        'Budget follows occupancy rather than a fixed monthly plan.',
        'Creative rotated by season, segment and length of stay.',
        'Direct booking value tracked against OTA-equivalent cost.',
        'Spend pulled back on dates that are already selling themselves.',
      ],
    },
    s3: {
      h2: 'Your account, your booking data.',
      paras: [
        "The ad account, pixel, audiences and creative are built in your own Business Manager. Guest data and booking data stay in your systems, where they belong.",
        "If you stop working with us, nothing has to be handed back, because none of it left.",
      ],
      items: [
        'Your ad account, your pixel, your creative library. Always.',
        'A fixed setup fee and a fixed monthly, priced to the work.',
        'Month to month, with no notice period.',
      ],
    },
    faqs: [
      { q: 'Can Meta ads actually beat OTA distribution?', a: "Not replace it, in most cases. What they can do is shift a share of your bookings direct, and every point of that shift is margin you keep. The comparison worth running is cost per direct booking against the commission rate you currently pay." },
      { q: 'How do you handle seasonality?', a: "That is the main argument for daily decisions in this category. Budget follows demand rather than a plan written a month ago, and spend comes off dates that are already filling instead of pushing them harder." },
      { q: 'Our booking engine tracking is a mess. Is that a problem?', a: "It is the first thing the account check looks at, and it is very often the real issue. Advertising decisions made on unreliable conversion data are guesses with a budget attached." },
      { q: 'Do you produce the creative?', a: "Yes. Accommodation is a category where property imagery goes stale fast and the same six photos get run for a year — production volume is usually the constraint rather than targeting." },
      { q: 'We are one property, not a group. Does this still work?', a: "If you are consistently past about ten thousand a month in media, yes. Below that we will tell you it is too early rather than sell you a system." },
    ],
    closing: { h2: 'Have your property account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing what a direct booking is really costing you and where the account is leaking." },
    related: [
      { href: '/ecommerce-facebook-ads-agency', title: 'Ecommerce Meta ads', note: 'The commercial case, in full.' },
      { href: '/facebook-ads-for-tradies', title: 'Facebook ads for tradies', note: 'Leads, not likes.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
  {
    slug: 'facebook-ads-for-real-estate-agents', name: 'real estate',
    eyebrow: 'REAL ESTATE',
    h1: 'Facebook Ads for Real Estate Agents',
    lead: 'Listings sell themselves. Appraisals are what the advertising is actually for.',
    title: 'Facebook Ads for Real Estate Agents — Appraisals First | Sevenam',
    description: 'Meta advertising for Australian real estate agents and agencies. Vendor appraisals and buyer enquiry on your own ad account, decisions at 7am, fixed fee.',
    s1: {
      h2: 'Listing ads are the easy half.',
      paras: [
        "Most agency advertising is listing promotion, because it is easy to justify to a vendor and easy to run. It also mostly reaches people who were already going to find the property on the major portals, which makes it a branding exercise billed as performance.",
        "The advertising that changes a business is the part aimed at future vendors — the appraisal request from someone who is twelve months out and has not spoken to an agent yet. That audience is far less competitive and far more valuable, and it needs a completely different creative approach.",
      ],
      items: [
        'Listing ads largely reach demand the portals already capture.',
        'Appraisal generation is where the compounding value sits.',
        'Vendor decisions run on a long timeline, so nurture matters more than the click.',
        'Agent-led creative outperforms property-led creative for appraisals.',
      ],
    },
    s2: {
      h2: 'Measuring something other than form fills.',
      paras: [
        "An appraisal form fill is cheap to generate and easy to inflate. An appraisal that turns into a listing authority is the only outcome worth optimising for, and it happens weeks or months later inside your CRM.",
        "The decisions are built around qualified appraisal requests, with the honest acknowledgement that the feedback loop in this category is slow and leading indicators have to carry more weight.",
      ],
      items: [
        'Qualified appraisal requests, not raw lead count.',
        'Lead quality traced back through your CRM where it can be exported.',
        'Frequency managed carefully across small suburb audiences.',
        'Creative rotated so the same agent face does not burn out its area.',
      ],
    },
    s3: {
      h2: 'Your account, your database.',
      paras: [
        "Everything is built in your own Business Manager. For an agency that means the audiences built off your database, the pixel data from your site and every piece of creative remain yours if an agent leaves or you change providers.",
        "This matters more in real estate than most categories, because the asset is the database and the relationship, not the campaign.",
      ],
      items: [
        'Your ad account, your pixel, your creative library. Always.',
        'A fixed setup fee and a fixed monthly, priced to the work.',
        'Month to month, with no notice period.',
      ],
    },
    faqs: [
      { q: 'Should we advertise listings at all?', a: "Some, and mostly for the vendor rather than the buyer — vendors expect to see their property promoted and that expectation is part of winning the listing. Just do not confuse it with the advertising that generates your next twelve months of appraisals." },
      { q: 'What does an appraisal lead actually cost?', a: "It varies enormously by area and by how competitive the agent landscape is, and anyone quoting you a national number is guessing. The account check will tell you what yours currently costs and what is inflating it." },
      { q: 'Can you run this for individual agents as well as the agency?', a: "Yes, and agent-led creative usually performs better for appraisals. The account structure needs to be deliberate about it so agents are not bidding against each other in the same suburb." },
      { q: 'Our suburb audience is very small. Is that workable?', a: "It works, but frequency becomes the binding constraint quickly, so creative has to be replaced more often than a national advertiser would need. That is a production question more than a targeting one." },
      { q: 'Do you take a percentage of our advertising budget?', a: "A fixed setup fee and a fixed monthly, priced to the work." },
    ],
    closing: { h2: 'Have your agency account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing what your appraisal pipeline actually costs and where the spend is going to waste." },
    related: [
      { href: '/facebook-ads-for-tradies', title: 'Facebook ads for tradies', note: 'Leads, not likes.' },
      { href: '/facebook-ads-agency', title: 'Facebook ads agency', note: 'Why you might not need one.' },
      { href: '/agency-fee', title: 'Fee calculator', note: 'What a percentage really costs.' },
    ],
  },
  {
    slug: 'facebook-ads-for-schools', name: 'schools',
    eyebrow: 'SCHOOLS AND EDUCATION',
    h1: 'Facebook Ads for Schools',
    lead: 'One enrolment decision, made by a family, over a year or more.',
    title: 'Facebook Ads for Schools — Enrolment Enquiry That Converts | Sevenam',
    description: 'Meta advertising for Australian schools and education providers. Enrolment enquiry on your own ad account, with decisions at 7am and a fixed fee.',
    s1: {
      h2: 'An enrolment is not a purchase.',
      paras: [
        "Families choose a school over months, often years, and usually with two parents holding different concerns. Nothing about that fits a campaign built to drive a conversion this week, and treating it like ecommerce produces a lot of open days attended by people who were never going to enrol.",
        "It also means the advertising calendar is genuinely seasonal — enquiry clusters around open days, offer rounds and the start of the enrolment cycle, and an account left on the same settings year-round wastes most of its budget in the quiet months.",
      ],
      items: [
        'Decision timelines run for months, so the funnel has to be built for it.',
        'Two decision-makers with different questions, needing different creative.',
        'Enquiry clusters hard around open days and offer rounds.',
        'Year-round flat spend is the most common source of waste.',
      ],
    },
    s2: {
      h2: 'What the daily decisions do here.',
      paras: [
        "In a seasonal category, the value of a daily decision is mostly about not wasting the peak. When enquiry starts moving ahead of an open day, budget needs to follow it that day rather than at the next monthly meeting.",
        "The rest of the year the job is different: keep a small amount of well-made creative in front of the right catchment so the school is familiar long before the family starts looking.",
      ],
      items: [
        'Budget follows enquiry within the enrolment cycle, not a fixed plan.',
        'Open day and offer round campaigns built and retired on time.',
        'Creative that speaks to parents rather than to the school itself.',
        'Catchment frequency watched so families are not saturated.',
      ],
    },
    s3: {
      h2: 'Your account, your family data.',
      paras: [
        "The ad account, pixel, audiences and creative all live in your own Business Manager. For a school that also means the enquiry data collected through advertising stays inside your systems and your privacy obligations, not an agency's.",
        "Nothing needs handing back if the relationship ends, because nothing left.",
      ],
      items: [
        'Your ad account, your pixel, your creative library. Always.',
        'A fixed setup fee and a fixed monthly, priced to the work.',
        'Month to month, with no notice period.',
      ],
    },
    faqs: [
      { q: 'Is Meta the right channel for enrolments?', a: "For awareness and consideration in your catchment, usually yes — it is where parents of school-age children spend time. For families already actively comparing schools, search tends to do the closing. The two work better together than either does alone." },
      { q: 'How do we measure something that takes a year?', a: "By tracking enquiry to application to enrolment through your own systems, and accepting that the advertising decisions in the meantime lean on leading indicators. Anyone claiming clean last-click attribution on a twelve-month decision is selling you a number, not a measurement." },
      { q: 'Should we advertise all year or only around open days?', a: "Both, at very different weights. A small constant presence keeps the school familiar; the concentrated spend belongs around the points where families actually act." },
      { q: 'Can we advertise if we are a small independent school?', a: "If your media spend is consistently past about ten thousand a month, the system is worth buying. Below that we will say so and point you at the guides — a smaller school is usually better served by fixing creative and the enquiry process first." },
      { q: 'Who signs off on the creative?', a: "You do, every time. Schools have community sensitivities and governance requirements that no external provider should be making calls on." },
    ],
    closing: { h2: 'Have your enrolment account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing what enquiry is costing you and how much of the budget is working outside the cycle." },
    related: [
      { href: '/facebook-ads-for-healthcare', title: 'Facebook ads for healthcare', note: 'Compliant creative that still works.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'The plain-English explanation.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
  {
    slug: 'ndis-facebook-ads', name: 'NDIS',
    eyebrow: 'NDIS PROVIDERS',
    h1: 'NDIS Facebook Ads',
    lead: 'Participant enquiry, generated within the rules, measured on who you can actually support.',
    title: 'NDIS Facebook Ads — Participant Enquiry, Within the Rules | Sevenam',
    description: 'Meta advertising for Australian NDIS providers. Compliant participant enquiry on your own ad account, decisions at 7am, a fixed fee priced to the work.',
    s1: {
      h2: 'Volume is not the problem. Fit is.',
      paras: [
        "Most NDIS providers can generate enquiry. What they struggle with is enquiry from participants whose plan, funding type and support needs actually match what the organisation is set up to deliver — and every mismatched enquiry costs intake staff time that was already scarce.",
        "Advertising optimised to cost per lead makes this worse in a very direct way, because the cheapest leads are almost always the least qualified ones.",
      ],
      items: [
        'Cheap enquiry is usually poorly matched enquiry.',
        'Intake staff time is the real cost of a bad lead.',
        'Plan type and funding management change who you can support.',
        'Service area limits make broad targeting actively wasteful.',
      ],
    },
    s2: {
      h2: 'Advertising inside the rules.',
      paras: [
        "NDIS providers sit under the NDIS Code of Conduct and, for registered providers, the Practice Standards — alongside Meta's own restrictions on how audiences can be described. The reliable failure mode is creative that implies something about the person seeing it, or that reads as a claim about outcomes.",
        "We will flag what looks risky and produce creative built to stay well clear of it, but the compliance sign-off stays with you. You know your obligations and your participants better than any advertising provider does.",
      ],
      items: [
        'Personal attribute rules shape how audiences can be addressed.',
        'Outcome claims are the most common source of trouble.',
        'Creative written for families and support coordinators, not just participants.',
        'Everything reviewable and approved by you before it runs.',
      ],
    },
    s3: {
      h2: 'Your account, your participant data.',
      paras: [
        "The ad account, pixel, audiences and creative files are built in your own Business Manager. Participant enquiry data stays in your systems, under your privacy obligations — which do not transfer to a provider just because they configured the tracking.",
        "If we stop working together, there is nothing to hand back.",
      ],
      items: [
        'Your ad account, your pixel, your creative library. Always.',
        'A fixed setup fee and a fixed monthly, priced to the work.',
        'Month to month, with no notice period.',
      ],
    },
    faqs: [
      { q: 'Are NDIS providers allowed to advertise on Meta?', a: "Yes. The constraints are on how you say it rather than whether you can — Meta restricts creative that implies personal attributes about the viewer, and the NDIS Code of Conduct governs how services are represented. Plenty of providers advertise well inside both." },
      { q: 'How do we stop getting enquiries we cannot support?', a: "Mostly through creative and the enquiry form rather than targeting. Being specific about service type, service area and plan management in the ad itself filters far more effectively than any audience setting, even though it raises cost per lead." },
      { q: 'Should we optimise for cost per lead?', a: "No, and this is the single most common mistake in the category. Optimise for enquiries your intake team can actually convert, and expect the cost per enquiry to rise while the cost per participant falls." },
      { q: 'Who is responsible for compliance?', a: "You are, and you approve everything before it runs. We will raise anything that looks like a risk, but we are not your compliance function and would not pretend to be." },
      { q: 'What spend does this need to make sense?', a: "About ten thousand a month in media before daily decisions earn their keep. Under about three thousand, we will tell you plainly that none of this is the right purchase yet." },
    ],
    closing: { h2: 'Have your NDIS account read properly.', p: "Fifteen minutes with Josh, no pitch. You will leave knowing what a well-matched enquiry actually costs you and where the compliance risk sits." },
    related: [
      { href: '/facebook-ads-for-healthcare', title: 'Facebook ads for healthcare', note: 'The same compliance problem.' },
      { href: '/facebook-ads-for-tradies', title: 'Facebook ads for tradies', note: 'Leads, not likes.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
];

const SUPPORT = "Sevenam installs a Meta advertising system on your own ad account and runs the technology that operates it — written decisions at 7am every morning telling you exactly what to do that day. One fixed setup fee, a fixed monthly, priced to the work.";

function build() {
  return INDUSTRIES.map(v => ({
    path: '/' + v.slug,
    title: v.title,
    description: v.description,
    eyebrow: v.eyebrow,
    h1: v.h1,
    lead: v.lead,
    support: SUPPORT,
    sections: [
      { tone: 'paper', h2: v.s1.h2, paras: v.s1.paras, items: v.s1.items },
      { tone: 'ink', h2: v.s2.h2, paras: v.s2.paras, items: v.s2.items },
      { tone: 'paper', h2: v.s3.h2, paras: v.s3.paras, items: v.s3.items },
    ],
    faqs: v.faqs,
    pills: {
      label: 'Other industries',
      links: INDUSTRIES.filter(o => o.slug !== v.slug)
        .map(o => ({ href: '/' + o.slug, label: o.h1.replace(/^Facebook Ads (for )?/, '').replace(/^NDIS Facebook Ads$/, 'NDIS') }))
        .concat([{ href: '/facebook-ads-for-tradies', label: 'Tradies' }]),
    },
    related: v.related,
    closing: v.closing,
    service: { name: `Meta advertising systems for ${v.name}`, areaServed: 'AU' },
    breadcrumb: [{ name: 'Home', path: '/' }, { name: v.h1, path: '/' + v.slug }],
  }));
}

module.exports = { build, INDUSTRIES };
