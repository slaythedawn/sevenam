/* Guides and tools pages. These carry Article schema rather than Service, and
   their job is to be genuinely useful whether or not the reader ever buys. */

const SUPPORT = "Sevenam installs a Meta advertising system on your own ad account and runs the technology that operates it — written decisions at 7am every morning telling you exactly what to do that day. One fixed setup fee, a fixed monthly, priced to the work rather than your media budget.";

const PAGES = [
  {
    slug: 'seedance-2-5',
    title: 'Seedance 2.5 for Ad Creative: What Changes | Sevenam',
    description: 'Seedance 2.5 is the newer generation of the video model. What actually matters for Meta ad creative, how to judge a new version, and what still does not work.',
    eyebrow: 'GUIDE', h1: 'Seedance 2.5 for Ad Creative',
    lead: 'A new version is only worth switching to if it fixes something that was costing you ads.',
    s1: {
      h2: 'How to judge a new model version.',
      paras: [
        "Every new release of a video model arrives with a reel of its best output, which tells you almost nothing about whether it will make your ads better. The useful test is narrower: does it fix the specific failure that was forcing you to discard generations? For advertisers that is nearly always one of three things \u2014 hands and faces, product physics, or motion that reads as synthetic.",
        "So run the new version against the shots you already abandoned. If the clips you had to throw away last month come back usable, the upgrade is real for you. If it just makes the shots that already worked slightly prettier, it changes nothing about your output rate, which is the only number that moves performance.",
      ],
      items: [
        'Test it on the generations you previously binned, not on new ideas.',
        'Measure the usable-output rate, not the best single clip.',
        'Hands, faces and product physics are where versions actually differ.',
        'Prettier is not the same as usable in an ad account.',
      ],
    },
    s2: {
      h2: 'What has not changed.',
      paras: [
        "The limits that matter for advertising have been stubborn across every generation so far. Sustained human performance is still the least reliable output, text inside the frame should still be laid over afterwards rather than generated, and any product with fine detail still needs checking frame by frame before it goes near an ad account.",
        "The other constant is that direction beats the model. An undirected generation converges on the same weightless look regardless of which version produced it, and that look is what a viewer scrolls past. The rejection rate is doing more work than the release notes.",
      ],
      items: [
        'Faces and hands remain the weakest element in any generation.',
        'Overlay text afterwards; do not generate it inside the frame.',
        'Check fine product detail frame by frame before shipping.',
        'Direction and a high rejection rate matter more than the version number.',
      ],
    },
    faqs: [
      { q: 'Should we move from Seedance 2.0 to 2.5?', a: "Only if it fixes a failure that was costing you usable output. Most accounts we see are not limited by model quality \u2014 they are limited by how many concepts get briefed and how much gets rejected. Upgrading the model does not fix either of those." },
      { q: 'Is it good enough to replace filming?', a: "For product motion, hooks and cuts, it does work that would otherwise not get made at all. For a founder to camera, a genuine customer testimonial, or a demonstration that depends on someone handling the product, no \u2014 and treating it as a substitute for those is the most common way brands waste money on video generation." },
      { q: 'What do you actually use?', a: "Whichever tool suits the shot. Seedance for video, Nano Banana for stills and edits, Higgsfield when the camera move is the point. Treating any one of them as the single answer is the mistake." },
      { q: 'How current is this page?', a: "Model versions move faster than any page can. What we keep current here is the method for judging a release and the limits that have held across every version so far \u2014 those change far more slowly than the capabilities do." },
    ],
    related: [
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'Freelance day rate vs a line.' },
      { href: '/ad-creative', title: 'Ad creative on an AI line', note: 'What we produce, and what it costs.' },
      { href: '/seedance-2', title: 'Seedance 2.0 for ad creative', note: 'The version most work still runs on.' },
      { href: '/higgsfield-ads', title: 'Higgsfield for ad creative', note: 'Directed motion, not prompt-and-hope.' },
    ],
    closing: { h2: 'Would rather not run the line yourself?', p: "Answer five questions about the account and Josh comes back with what producing the creative would cost." },
  },
  {
    slug: 'nano-banana-2',
    title: 'Nano Banana 2 for Ad Creative: What It Is Good At | Sevenam',
    description: 'Nano Banana 2 is Google\u2019s image model, and it has become a practical tool for ecommerce ad creative. What it does well, where it fails, and how to brief it.',
    eyebrow: 'GUIDE', h1: 'Nano Banana 2 for Ad Creative',
    lead: 'A genuinely useful image tool, and a fast way to make bad ads if you point it at the wrong job.',
    s1: {
      h2: 'What it is actually good at.',
      paras: [
        "Nano Banana is the informal name for Google's image generation and editing model, and the second generation is the first version most advertisers found worth using on real work. Its strength is editing rather than invention: give it a product photograph you already own and it will change the background, the lighting, the framing or the context without losing the product itself.",
        "For ecommerce that matters more than it sounds. The expensive part of ad creative is rarely the first image; it is the twentieth variation of it, in the format each placement wants, against a background that suits a different audience. That is the job this does well and cheaply.",
      ],
      items: [
        'Editing an existing product shot rather than inventing one.',
        'Background, lighting and context changes that keep the product intact.',
        'Format and framing variations for different placements.',
        'Volume: the twentieth variation costs what the first one did.',
      ],
    },
    s2: {
      h2: 'Where it falls over.',
      paras: [
        "It is unreliable with text, so anything with a price, a claim or a logo needs the type laid over afterwards rather than generated. It drifts on fine product detail across many generations, which matters if your product has a label, a pattern or a texture a customer would recognise. And it cannot invent a product it has never seen.",
        "The deeper failure mode is generic output. Left undirected it converges on the same glossy, weightless look everyone else is generating, and that reads as synthetic within three frames. The tool is only as good as the brief and the rejection rate behind it.",
      ],
      items: [
        'Text is unreliable: overlay type afterwards, do not generate it.',
        'Fine product detail drifts across generations \u2014 check labels and textures.',
        'It cannot invent a product it has not been shown.',
        'Undirected output looks generic, and generic does not convert.',
      ],
    },
    faqs: [
      { q: 'Is Nano Banana 2 good enough for real ads?', a: "For product stills, variations and background work, yes \u2014 it is already in production use. For anything depending on a person's face across many frames, or on text rendered inside the image, it still needs a human step afterwards." },
      { q: 'Do we still need a photographer?', a: "For the source product photography, usually yes, and that is the point: one good shoot becomes the input to hundreds of variations rather than four finished ads. What disappears is the second and third shoot, not the first." },
      { q: 'Will Meta penalise AI-generated creative?', a: "Meta does not penalise it for being generated. What gets punished is the same thing that always did \u2014 low engagement. Generated creative that looks generic performs badly because people scroll past it, not because a policy caught it." },
    ],
    related: [
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'Freelance day rate vs a line.' },
      { href: '/ad-creative', title: 'Ad creative on an AI line', note: 'What we produce, and what it costs.' },
      { href: '/facebook-ad-creative-testing', title: 'How to test creative', note: 'Judging what you make.' },
      { href: '/seedance-2-5', title: 'Seedance 2.5 for ad creative', note: 'Judging a new model version.' },
    ],
    closing: { h2: 'Would rather not run the line yourself?', p: "Answer five questions about the account and Josh comes back with what producing the creative would cost, and whether it is the right buy." },
  },
  {
    slug: 'seedance-2',
    title: 'Seedance 2.0 for Ad Creative: A Practical Guide (and 2.5) | Sevenam',
    description: 'Seedance 2.0 generates short video from a prompt or a still. Where it is genuinely useful for Meta ad creative, where it is not, and how to brief it properly.',
    eyebrow: 'GUIDE', h1: 'Seedance 2.0 for Ad Creative',
    lead: 'Short-form video without a shoot, which is either the unlock or the trap depending on the brief.',
    s1: {
      h2: 'Why video generation matters for Meta.',
      paras: [
        "Meta's placements have been steadily biased toward video for years, and the accounts that struggle most are the ones shipping statics because video production was too slow to keep up. Seedance generates short clips from a prompt or from a still image you already own, which removes the scheduling problem that caps most brands' output.",
        "The useful framing is not \u2018video without a camera\u2019. It is more concepts reaching the auction: the hook variations, the alternate openings and the format cuts that would otherwise never be made because the edit suite was booked.",
      ],
      items: [
        'Short clips from a prompt, or animated from a still you own.',
        'Hook and opening variations, which is where most video performance sits.',
        'Vertical and square cuts without a re-edit.',
        'No scheduling: the constraint becomes the brief, not the calendar.',
      ],
    },
    s2: {
      h2: 'The limits worth knowing before you brief it.',
      paras: [
        "Clips are short, so anything needing a sustained narrative has to be assembled from pieces rather than generated whole. Human faces and hands remain the least reliable part of any generated video, and a customer testimonial that looks almost-real is worse than no testimonial at all.",
        "Physical accuracy is the other trap. If your product pours, folds, stretches or clips together, generated motion frequently gets that wrong in ways your customer will notice immediately even if the frame looks beautiful.",
      ],
      items: [
        'Short clips: longer stories need assembly, not one generation.',
        'Faces and hands are the least reliable element.',
        'Product physics \u2014 pouring, folding, fastening \u2014 often reads wrong.',
        'Almost-real is worse than obviously-made for anything testimonial.',
      ],
    },
    faqs: [
      { q: 'Can Seedance replace UGC?', a: "No, and treating it as a UGC replacement is the most common way brands waste money on it. Genuine user content works because a viewer believes a real person used the product. Generated footage of a person who does not exist fails that test the moment it is noticed. Use it for product motion, hooks and cuts, not for pretending to be a customer." },
      { q: 'What does it cost to run?', a: "Per clip the compute is inexpensive relative to a shoot. The real cost is direction and rejection \u2014 the useful output rate is well under half of what you generate, and pretending otherwise is how brands end up shipping bad video quickly." },
      { q: 'Which placements suit it best?', a: "Reels and Stories, where the first second decides everything and variation on the hook is the highest-leverage thing you can test. It is far less useful for long-form or anything carrying detailed product explanation." },
    ],
    related: [
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'Freelance day rate vs a line.' },
      { href: '/ad-creative', title: 'Ad creative on an AI line', note: 'What we produce, and what it costs.' },
      { href: '/facebook-ad-creative-testing', title: 'How to test creative', note: 'Judging what you make.' },
      { href: '/seedance-2-5', title: 'Seedance 2.5 for ad creative', note: 'Judging a new model version.' },
    ],
    closing: { h2: 'Would rather not run the line yourself?', p: "Answer five questions about the account and Josh comes back with what producing the creative would cost, and whether it is the right buy." },
  },
  {
    slug: 'higgsfield-ads',
    title: 'Higgsfield AI for Ad Creative: What It Does Well | Sevenam',
    description: 'Higgsfield AI is built around motion and camera control rather than prompt-and-hope. Where that helps Meta ad creative, what it cannot do, and how to brief it.',
    eyebrow: 'GUIDE', h1: 'Higgsfield for Ad Creative',
    lead: 'Motion control is the part most generation tools get wrong, which is the whole reason to use this one.',
    s1: {
      h2: 'Why camera control changes the output.',
      paras: [
        "Most video generation is prompt-and-hope: you describe a scene and accept whatever motion arrives. Higgsfield's design centres on directing the movement itself \u2014 the push in, the orbit, the whip pan, the crash zoom \u2014 which is the difference between footage that looks generated and footage that looks shot.",
        "That matters for advertising more than it does for film, because a Reel is decided in its first second and the motion is what buys that second. Being able to specify the camera move rather than describe it and hope is the practical unlock.",
      ],
      items: [
        'Specify the camera move rather than describe it and hope.',
        'Motion is what earns the first second of a Reel.',
        'Consistent moves across a set, so variations feel like one campaign.',
        'Animating a still you already own, rather than generating from nothing.',
      ],
    },
    s2: {
      h2: 'What it will not fix.',
      paras: [
        "Camera control does not make a weak concept work. If the hook is wrong, a beautifully executed crash zoom onto it just makes the wrong idea arrive faster, and that is the most common way this tool gets wasted.",
        "It also inherits the limits of every generation model underneath it: sustained human performance is unreliable, text inside the frame should be laid over afterwards, and any product with fine detail needs checking frame by frame before it goes anywhere near an ad account.",
      ],
      items: [
        'A better camera move does not rescue a weak hook.',
        'Sustained human performance is still unreliable.',
        'Overlay text afterwards rather than generating it.',
        'Check fine product detail frame by frame before shipping.',
      ],
    },
    faqs: [
      { q: 'Is Higgsfield better than the other video tools?', a: "For directed motion, it is the one we reach for. For other jobs \u2014 product stills and edits, or straightforward image-to-video \u2014 different tools do better work. Treating any of them as the single answer is the mistake; a production line uses whichever one suits the shot." },
      { q: 'Do you need to be a video editor to use it?', a: "To get one clip, no. To get a set of clips that feel like the same campaign and test cleanly against each other, the skill required is closer to art direction than to editing \u2014 knowing what to ask for, and rejecting most of what comes back." },
      { q: 'How does this fit with a Meta account?', a: "Motion variations are hook tests. The account tells you which opening earns attention, the line produces more of that shape, and the next brief is better than the last. Without that loop it is just an expensive way to make videos nobody measures." },
    ],
    related: [
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'Freelance day rate vs a line.' },
      { href: '/ad-creative', title: 'Ad creative on an AI line', note: 'What we produce, and what it costs.' },
      { href: '/facebook-ad-creative-testing', title: 'How to test creative', note: 'Judging what you make.' },
      { href: '/seedance-2-5', title: 'Seedance 2.5 for ad creative', note: 'Judging a new model version.' },
    ],
    closing: { h2: 'Would rather not run the line yourself?', p: "Answer five questions about the account and Josh comes back with what producing the creative would cost, and whether it is the right buy." },
  },
  {
    slug: 'are-facebook-ads-worth-it',
    title: 'Are Facebook Ads Worth It in 2026? An Honest Answer | Sevenam',
    description: 'Whether Facebook and Instagram ads are worth it depends on margin, volume and creative capacity. Here is how to work out the answer for your business.',
    eyebrow: 'GUIDE', h1: 'Are Facebook Ads Worth It?',
    lead: 'For some businesses, plainly yes. For others it is the most expensive way to learn a lesson.',
    s1: {
      h2: 'The three things that decide it.',
      paras: [
        "Meta advertising works when three conditions hold at once: enough margin per sale to survive a customer acquisition cost, enough volume for the platform to learn from, and enough creative capacity to keep feeding it. Miss any one and the channel underperforms regardless of how well the account is run.",
        "Most businesses that conclude Meta does not work for them failed the third condition. They ran three ads for six months, watched performance decay as frequency climbed, and concluded the platform was the problem.",
      ],
      items: [
        'Margin: enough per sale to absorb an acquisition cost and profit.',
        'Volume: enough conversions weekly for the platform to optimise.',
        'Creative: enough new concepts monthly to outrun fatigue.',
        'Patience: enough runway to get through the learning period.',
      ],
    },
    s2: {
      h2: 'When the answer is honestly no.',
      paras: [
        "If your average order value is small and your margin is thin, paid social maths is brutal and no amount of optimisation rescues it. If you sell something bought perhaps twice in a lifetime with no repeat and no referral, search usually serves you better because it meets people who are already looking.",
        "And if your budget is under a few thousand a month, the platform simply cannot gather enough signal to optimise. That is not a failure of effort; it is a floor.",
      ],
      items: [
        'Thin margin on a low order value: the maths rarely works.',
        'Rare, one-off, high-consideration purchases: search fits better.',
        'Very small budgets: not enough signal to learn from.',
        'No capacity to make new creative: performance will decay.',
      ],
    },
    faqs: [
      { q: 'Do Facebook ads still work in 2026?', a: "Yes, for businesses that meet the conditions above. What has changed is where the work sits: the platform now automates much of the targeting and bidding that used to be the specialist's job, and creative volume has become the main lever." },
      { q: 'Did the privacy changes kill Meta advertising?', a: "They made measurement harder, not advertising ineffective. The practical answer is server-side tracking, cleaner conversion data and a willingness to look at blended numbers rather than in-platform ROAS alone." },
      { q: 'How long before we know if it works?', a: "Give it a few months of consistent spend and genuine creative rotation. Anything shorter tests your patience rather than the channel." },
      { q: 'How much do we need to spend to find out?', a: "Enough for the platform to gather signal — a few thousand a month at the very least, and closer to ten thousand before daily decisions add much." },
      { q: 'What if we have tried and it did not work?', a: "Worth checking what was actually run. In most accounts we read, the honest verdict is that the channel was never properly tested — too few creative concepts, too little time, or conversion tracking that was quietly broken throughout." },
    ],
    closing: { h2: 'Get a straight answer for your account.', p: "Five questions, two minutes, and an honest read on whether any of this fits — including if the answer is that it does not." },
    related: [
      { href: '/check', title: 'The account check', note: 'Whether they work on yours.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'The plain-English explanation.' },
      { href: '/facebook-ads-cost-australia', title: 'What ads cost', note: 'How the auction prices you.' },
      { href: '/google-ads-vs-facebook-ads', title: 'Google vs Facebook', note: 'Which does what.' },
    ],
  },
  {
    slug: 'google-ads-vs-facebook-ads',
    title: 'Google Ads vs Facebook Ads — Which One First? | Sevenam',
    description: 'Google captures demand that already exists. Meta creates it. Here is how to decide which to run first, and when running both actually makes sense.',
    eyebrow: 'GUIDE', h1: 'Google Ads vs Facebook Ads',
    lead: 'One harvests demand. The other creates it. Most businesses need both, in an order.',
    s1: {
      h2: 'The actual difference.',
      paras: [
        "Search advertising meets people who have already decided they want something and are looking for it. Social advertising interrupts people who were not looking, and has to earn attention before it can sell anything. That single difference explains nearly every practical distinction between them.",
        "It is why search usually converts at a higher rate and is capped by how many people are searching, while social can create demand that search then harvests — and why attributing the sale to whichever channel was clicked last flatters search at Meta's expense.",
      ],
      items: [
        'Search: existing demand, higher intent, capped by search volume.',
        'Social: created demand, lower intent, effectively uncapped reach.',
        'Last-click attribution systematically over-credits search.',
        'Social spend often raises branded search volume as a side effect.',
      ],
    },
    s2: {
      h2: 'Which to run first.',
      paras: [
        "If people are already searching for what you sell, start with search — it is the cheapest demand to capture and it validates that the offer converts. Once you have exhausted the searchers, growth has to come from people who were not looking, which is Meta's job.",
        "If nobody is searching for your product because it is new or category-defining, Meta first is the only sensible order.",
      ],
      items: [
        'Existing search volume: start with search, then add social.',
        'New or unfamiliar category: start with social to create demand.',
        'Watch branded search volume when you scale Meta — it should move.',
        'Judge both on blended cost per acquisition, not per-platform ROAS.',
      ],
    },
    faqs: [
      { q: 'Which one is cheaper?', a: "Search usually shows a lower cost per conversion and a lower ceiling; social usually shows a higher cost per conversion and far more available volume. Comparing them on cost per conversion alone will always mislead you." },
      { q: 'Should we run both?', a: "Once you can afford to, generally yes — they do different jobs and they compound. What you should not do is judge them against each other using last-click numbers." },
      { q: 'Why does our Meta ROAS look worse than Google?', a: "Partly because it genuinely is a harder job, and substantially because of attribution. Someone who sees a Meta ad on Monday and searches your brand on Thursday is recorded as a search conversion." },
      { q: 'Do you run Google Ads?', a: "No. We do Meta advertising and the creative that feeds it, and we would rather point you to someone good than do it adequately." },
      { q: 'How do we measure both fairly?', a: "Blended: total revenue against total marketing spend, watched over time. It is a blunter number and it is much harder to fool yourself with." },
    ],
    closing: { h2: 'Find out where your growth is actually coming from.', p: "Fifteen minutes with Josh, no pitch deck. You will leave with a clearer read on which channel is doing the work." },
    related: [
      { href: '/check', title: 'The account check', note: 'A straight read, five days.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'Placements and objectives.' },
      { href: '/are-facebook-ads-worth-it', title: 'Are Facebook ads worth it?', note: 'An honest answer.' },
      { href: '/facebook-ads-strategy', title: 'Meta ads strategy', note: 'How to structure it.' },
    ],
  },
  {
    slug: 'gst-on-facebook-advertising',
    title: 'GST on Facebook Advertising in Australia — What to Check | Sevenam',
    description: 'How GST applies to Meta advertising for Australian businesses, why your ABN matters in the ad account, and what to confirm with your accountant.',
    eyebrow: 'GUIDE', h1: 'GST on Facebook Advertising',
    lead: 'Mostly it comes down to whether Meta knows you are a GST-registered business.',
    s1: {
      h2: 'Why your ABN is in the ad account settings.',
      paras: [
        "Meta asks Australian advertisers for an ABN and whether the business is registered for GST, and that answer changes how your advertising is invoiced. Businesses that have not supplied those details are commonly treated as consumers for tax purposes, which can mean GST is charged in a way that is harder to reclaim.",
        "This is genuinely worth five minutes of somebody's attention, because it is set once and quietly affects every invoice afterwards. Check what is recorded in your ad account's payment settings and compare it against what your recent invoices actually show.",
      ],
      items: [
        'Your ABN and GST registration status sit in ad account payment settings.',
        'They are frequently left blank when an account is set up in a hurry.',
        'The setting affects how every subsequent invoice is issued.',
        'Meta invoices are downloadable from the billing section of the account.',
      ],
    },
    s2: {
      h2: 'What to confirm, and with whom.',
      paras: [
        "Tax treatment of digital services has changed more than once, and the entity that bills you can differ by product and by period. We are advertisers, not tax advisers, and the correct answer for your business depends on your registration status and how the invoices are actually issued.",
        "So the useful advice is procedural: pull your last three Meta invoices, check whether GST appears on them, check what ABN and GST status your account has recorded, and put both in front of your accountant. Whatever you conclude, keep the invoices — they are your substantiation either way.",
      ],
      items: [
        'Pull the last three invoices from the billing section.',
        'Check whether GST is itemised on them and which entity issued them.',
        'Check the ABN and GST status recorded in payment settings.',
        'Confirm the treatment with your accountant, not with a blog post.',
      ],
    },
    faqs: [
      { q: 'Is GST charged on Facebook ads in Australia?', a: "It depends on how your account is set up and how Meta bills your business, and it has changed over time. Rather than take a general answer, look at your own recent invoices — they will show you what is actually being charged — and confirm the treatment with your accountant." },
      { q: 'Where do I add my ABN?', a: "In the ad account's payment settings, alongside the business details. If your account was set up quickly, there is a fair chance nobody ever filled it in." },
      { q: 'Can we claim GST credits on advertising?', a: "Where GST has been correctly charged on a business expense and you are registered, that is ordinarily the sort of thing you would discuss with your accountant. Keep the tax invoices from the billing section as substantiation." },
      { q: 'Does this apply to Instagram ads too?', a: "Instagram advertising is billed through the same Meta ad account, so it is the same invoice and the same settings." },
      { q: 'Do you handle any of this for us?', a: "We will flag it during the setup if the account details look incomplete, because it is a common oversight. We do not give tax advice and would not pretend to." },
    ],
    closing: { h2: 'Have the whole account checked, not just the tax settings.', p: "Five days, a written read on what the account is doing — including the details nobody filled in when it was set up." },
    related: [
      { href: '/facebook-ads-cost-australia', title: 'What ads cost', note: 'Media pricing explained.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
      { href: '/how-to-run-meta-ads-yourself', title: 'Run it yourself', note: 'The setup basics.' },
    ],
  },
  {
    slug: 'how-to-run-meta-ads-yourself',
    title: 'How to Run Meta Ads Yourself — A Practical Guide | Sevenam',
    description: 'A working guide to running your own Meta ads: account setup, tracking, campaign structure, creative cadence and the mistakes that cost the most.',
    eyebrow: 'GUIDE', h1: 'How to Run Meta Ads Yourself',
    lead: 'Entirely doable below a certain spend, and genuinely the right choice there.',
    s1: {
      h2: 'Get the foundations right once.',
      paras: [
        "Most self-run accounts fail on setup rather than on strategy. The pixel fires inconsistently, the conversions API was never configured, the events do not match what the business actually values, and every decision afterwards is made on data that is quietly wrong.",
        "Do this part slowly. It is the only part where being thorough beats being clever, and it is the part you cannot fix retrospectively.",
      ],
      items: [
        'Own the Business Manager yourself — never build inside someone else\'s.',
        'Install the pixel and the conversions API, and verify both fire.',
        'Define events that map to money, not to page views.',
        'Set the ABN and GST details in payment settings while you are there.',
      ],
    },
    s2: {
      h2: 'Then keep it simple and feed it.',
      paras: [
        "Modern Meta accounts do not reward complexity. A small number of campaigns, broad targeting and a steady supply of genuinely different creative outperforms elaborate audience structures in almost every account we read.",
        "The discipline that matters is cadence: ship new creative every week, look at the account daily, and change one meaningful thing at a time so you can tell what caused what.",
      ],
      items: [
        'Few campaigns, broad audiences, let the platform find people.',
        'New creative weekly — different concepts, not colour variants.',
        'Give changes time to leave the learning phase before judging them.',
        'Watch frequency; when it climbs, the creative is the problem.',
        'Judge on blended revenue against total spend, not in-platform ROAS.',
      ],
    },
    faqs: [
      { q: 'At what point should we stop doing it ourselves?', a: "Usually when the account needs a decision every day and nobody has time to make it — commonly somewhere past ten thousand a month in spend. Under about three thousand, running it yourself is genuinely the right answer and we will say so." },
      { q: 'What is the most common self-run mistake?', a: "Too little creative. Two or three ads run for months, then a conclusion that the platform stopped working, when what actually happened is frequency climbed and the ads went stale." },
      { q: 'How many ads should be running?', a: "Enough distinct concepts for the platform to have real choices — think in terms of several genuinely different angles per month, not variations on one image." },
      { q: 'Should we use Advantage+ campaigns?', a: "Often worth testing, particularly for ecommerce. They hand more control to the platform, which suits accounts with clean conversion data and good creative and punishes accounts without either." },
      { q: 'Is broad targeting really better?', a: "In most accounts now, yes. The platform's targeting has improved to the point where narrow audiences mostly limit its ability to find buyers, while raising frequency on the people you did allow." },
    ],
    closing: { h2: 'Or have someone read it once, properly.', p: "The account check is five days and ends in a written list of what would change — plenty of them conclude you should keep running it yourself." },
    related: [
      { href: '/tools', title: 'Free calculators', note: 'Fee and creative cost.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'Start here if it is all new.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'The part most people skip.' },
      { href: '/glossary', title: 'Glossary', note: 'Every term, in plain English.' },
    ],
  },
  {
    slug: 'meta-ad-library',
    title: 'Meta Ad Library — How to Use It Properly | Sevenam',
    description: 'The Meta Ad Library shows every ad your competitors are running. Here is how to read it for creative intelligence rather than for copying.',
    eyebrow: 'TOOL', h1: 'The Meta Ad Library',
    lead: 'Every ad your competitors run is public. Very few people use that well.',
    s1: {
      h2: 'What it actually shows you.',
      paras: [
        "The Ad Library lists the ads any advertiser is currently running, along with when each started. It does not show spend, results, or audience for ordinary commercial ads — those details are only published for political and social issue advertising.",
        "That limitation matters, because the most common misuse is treating a competitor's ad as proof that something works. You cannot see whether it is working. You can only see that it exists.",
      ],
      items: [
        'Every live ad from any advertiser, with its start date.',
        'No spend, results or audience data for commercial ads.',
        'Searchable by page name, and filterable by country.',
        'A competitor\'s ad is evidence of a decision, not of a result.',
      ],
    },
    s2: {
      h2: 'The one signal worth reading.',
      paras: [
        "Duration. An ad that has been running continuously for months is almost certainly earning its place, because advertisers turn off what loses money. An ad that appeared last week tells you nothing at all.",
        "So scan for longevity, not for volume — then look at what those long-running ads have in common structurally. Hook, format, length, the first three seconds. Take the mechanism and build your own version; copying the execution just puts you second in someone else's test.",
      ],
      items: [
        'Sort your attention by how long an ad has been live.',
        'Long-running ads are the closest thing to a public result.',
        'Read the mechanism — hook, format, pacing — not the surface.',
        'A wall of new ads usually means a competitor is still searching.',
        'Check your own library too: it is what your customers see.',
      ],
    },
    faqs: [
      { q: 'Is the Meta Ad Library free?', a: "Yes, and it needs no login for basic searching. It is at facebook.com/ads/library." },
      { q: 'Can I see how much a competitor spends?', a: "Not for ordinary commercial advertising. Spend and reach ranges are published only for political and social issue ads." },
      { q: 'Can competitors see our ads?', a: "Yes, all of them, while they are running. That is worth remembering before you put an aggressive offer in an ad rather than behind a click." },
      { q: 'Should we copy ads that have run a long time?', a: "Copy the mechanism, not the ad. Running a close imitation puts you in a worse position than the original — same idea, less credibility, and no idea which part actually did the work." },
      { q: 'How often should we look at it?', a: "Monthly is plenty for most businesses. It is a creative research input, not a performance signal, and treating it as the latter leads to a lot of reactive churn." },
    ],
    closing: { h2: 'Turn competitive research into creative output.', p: "Fifteen minutes with Josh, no pitch deck. Research only pays once something gets made from it." },
    related: [
      { href: '/tools', title: 'Free calculators', note: 'Fee and creative cost.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'What to do with the ideas.' },
      { href: '/what-are-meta-ads', title: 'What are Meta ads?', note: 'The fundamentals.' },
      { href: '/glossary', title: 'Glossary', note: 'Every term, in plain English.' },
    ],
  },
  {
    slug: 'meta-advantage-plus',
    title: 'Meta Advantage+ — What It Automates, and What It Does Not | Sevenam',
    description: 'A plain read on Meta Advantage+ campaigns: what the automation actually does, when it outperforms manual setups, and what it cannot fix.',
    eyebrow: 'GUIDE', h1: 'Meta Advantage+',
    lead: 'It automates the part that used to be the job. It cannot automate the part that matters most.',
    s1: {
      h2: 'What it takes off your hands.',
      paras: [
        "Advantage+ hands audience selection, placement and budget distribution to Meta's own systems. In accounts with clean conversion data and a decent supply of creative, it frequently beats a manually structured campaign — largely because the platform can test combinations far faster than a person can.",
        "That is a genuine shift in where the work sits. A great deal of what agencies historically charged for — audience research, ad set architecture, manual budget shuffling — is now done by the platform, at no extra cost.",
      ],
      items: [
        'Audience discovery and targeting, handled by the platform.',
        'Placement selection across Facebook, Instagram and the rest.',
        'Budget distribution across creative combinations.',
        'Faster iteration than any human account manager can match.',
      ],
    },
    s2: {
      h2: 'What it still cannot do.',
      paras: [
        "It cannot make your creative. It cannot fix conversion tracking that is reporting the wrong events. It cannot decide what a customer is worth to you, or tell you when a winning ad has quietly gone stale in a way the in-platform numbers flatter.",
        "So automation raises the floor and moves the constraint. When the platform handles the mechanics, the accounts that win are the ones supplying more and better creative, and making faster decisions about what to feed it.",
      ],
      items: [
        'Creative supply: still entirely yours to solve.',
        'Measurement integrity: garbage in, confident garbage out.',
        'Business judgement: what a customer is worth, what margin allows.',
        'Knowing when to stop something the platform is still defending.',
      ],
    },
    faqs: [
      { q: 'Should we use Advantage+ campaigns?', a: "Usually worth testing, especially for ecommerce with clean conversion data. It rewards accounts with good creative and reliable tracking, and it exposes accounts without either." },
      { q: 'Does it mean we do not need a media buyer?', a: "It means you need less of the mechanical work and more of the creative and decision work. The job did not disappear; it moved." },
      { q: 'Why did our Advantage+ campaign do worse?', a: "Most often because conversion data is unreliable or there is not enough distinct creative for the system to choose between. Automation amplifies whatever it is given." },
      { q: 'Can we control anything at all?', a: "Yes — budget, exclusions, creative and the conversion event you optimise toward. Those are the levers that matter most anyway." },
      { q: 'Does this change what an agency should charge?', a: "In our view, yes. If the platform now performs a large share of the work a percentage fee was originally justified by, the fee ought to reflect that. It largely has not." },
    ],
    closing: { h2: 'Find out whether automation is helping or hiding a problem.', p: "Fifteen minutes with Josh, no pitch deck. Automation flatters accounts right up until it does not." },
    related: [
      { href: '/check', title: 'The account check', note: 'What yours is actually doing.' },
      { href: '/ai-marketing-agency', title: 'Where we use AI', note: 'And where we do not.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'The remaining constraint.' },
      { href: '/scaling-meta-ads', title: 'Scaling Meta ads', note: 'What breaks as you grow.' },
    ],
  },
  {
    slug: 'scaling-meta-ads',
    title: 'Scaling Meta Ads — What Actually Breaks | Sevenam',
    description: 'Why more budget stops producing more sales, what breaks first when you scale Meta ads, and how to lift the ceiling without wrecking performance.',
    eyebrow: 'GUIDE', h1: 'Scaling Meta Ads',
    lead: 'Adding budget is easy. Adding budget without wrecking the numbers is the job.',
    s1: {
      h2: 'What breaks first.',
      paras: [
        "Creative fatigue, almost always. More budget on the same ads means the same people see them more often, frequency climbs, response falls and cost per result rises — and it looks exactly like the account degrading for no reason.",
        "The second failure is impatience. Large budget jumps push campaigns back into learning, performance wobbles, and the account gets changed again before the previous change had a chance to settle. Two or three rounds of that and nobody can tell what is working.",
      ],
      items: [
        'Frequency climbs and response falls: the fatigue ceiling.',
        'Big budget jumps reset learning and hide the signal.',
        'Reacting to daily noise compounds the confusion.',
        'The cheapest attention gets exhausted first, so costs drift up.',
      ],
    },
    s2: {
      h2: 'How the ceiling actually lifts.',
      paras: [
        "More distinct creative, more often. Not variations — genuinely different angles, formats and hooks, so the system has real choices and the same person is not shown the same thing repeatedly.",
        "Then move budget in steps the account can absorb, and give each step long enough to leave learning before judging it. Scaling is mostly a supply problem wearing a media buying costume.",
      ],
      items: [
        'Increase creative volume before increasing budget.',
        'Move budget in increments the account can absorb.',
        'Let each change settle past the learning phase before judging.',
        'Watch frequency and blended cost per acquisition, not daily ROAS.',
        'Expect efficiency to soften as volume grows — plan margin for it.',
      ],
    },
    faqs: [
      { q: 'How fast can we increase budget?', a: "Increments the account can absorb without resetting learning, with time between them to see the effect. The exact size depends on how much conversion volume you already have — thinner accounts need gentler steps." },
      { q: 'Why does cost per purchase rise as we scale?', a: "Partly because you exhaust the cheapest attention first, partly because frequency rises on a fixed audience. Creative volume slows both; nothing stops them entirely." },
      { q: 'Should we duplicate winning ad sets to scale?', a: "Usually not. It tends to fragment learning and put you in competition with yourself in the same auction. Raising budget on what works, gradually, is the less exciting and more reliable route." },
      { q: 'How much creative does scaling need?', a: "More than most businesses are producing. If your ceiling keeps reappearing at the same spend level, creative supply is the constraint, not the media buying." },
      { q: 'Is there a level where Meta simply stops working?', a: "There is a level where your audience is saturated and incremental spend buys reach you already had. That is when the answer is a new offer, a new market or a new channel rather than more budget." },
    ],
    closing: { h2: 'Find out where your ceiling actually is.', p: "Fifteen minutes with Josh, no pitch deck. Most ceilings turn out to be creative supply wearing a media buying costume." },
    related: [
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'What a concept costs you now.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'How to lift the ceiling.' },
      { href: '/meta-advantage-plus', title: 'Advantage+', note: 'What automation changes.' },
      { href: '/facebook-ads-cost-australia', title: 'What ads cost', note: 'Why costs drift up.' },
    ],
  },
  {
    slug: 'shopify-facebook-ads',
    title: 'Shopify Facebook Ads — Tracking, Catalogue and Scale | Sevenam',
    description: 'Running Meta ads for a Shopify store: getting conversion tracking right, using the catalogue properly, and the numbers worth trusting.',
    eyebrow: 'GUIDE', h1: 'Shopify and Facebook Ads',
    lead: 'The integration is easy to install and easy to have quietly wrong.',
    s1: {
      h2: 'Tracking that you can actually trust.',
      paras: [
        "Shopify's Meta integration will connect a pixel in a few clicks, which is exactly why so many stores never check what it is sending. Duplicate events, missing purchase values, checkout steps firing twice and the conversions API either absent or double-counting are all common, and all invisible unless you go looking.",
        "Every advertising decision downstream inherits those errors. An account optimising toward inflated purchase events will confidently spend money in the wrong place for months.",
      ],
      items: [
        'Verify purchase events fire once, with the correct value.',
        'Set up the conversions API and check for duplication.',
        'Confirm event deduplication is actually working.',
        'Reconcile Meta-reported purchases against Shopify orders.',
      ],
    },
    s2: {
      h2: 'Catalogue, and the number that decides everything.',
      paras: [
        "A properly maintained product catalogue lets Meta serve dynamic ads that respond to what people actually looked at, which for most stores is the single highest-return piece of setup after tracking. Feeds go stale, products go out of stock and images go missing, so it needs occasional attention rather than none.",
        "Beyond that, judge the account on blended numbers: total store revenue against total ad spend. In-platform ROAS is a useful diagnostic and a terrible headline, because it counts sales that would have happened anyway.",
      ],
      items: [
        'Keep the catalogue feed current — stale feeds waste spend.',
        'Dynamic ads earn their keep once you have real product interest.',
        'Track blended revenue against total spend as the headline number.',
        'Watch new customer acquisition cost separately from repeat revenue.',
      ],
    },
    faqs: [
      { q: 'Is the Shopify Facebook app enough on its own?', a: "It is a reasonable starting point and it is rarely the finished job. The conversions API setup, event deduplication and value accuracy all need checking, and those are exactly what nobody checks." },
      { q: 'Why does Meta report more sales than Shopify?', a: "Usually attribution window differences, and sometimes duplicate events. Meta counts a sale it believes it influenced within its window; Shopify counts orders. Reconciling the two is a standard part of the account check." },
      { q: 'Should we use dynamic product ads?', a: "Once you have meaningful product-level traffic, yes. They are among the most reliably profitable formats for stores with a decent catalogue." },
      { q: 'What ROAS should we aim for?', a: "Whatever leaves you a margin at the volume you want. A stated target divorced from your own margin structure is a number someone else invented." },
      { q: 'Does this work for a small catalogue?', a: "Yes, though dynamic ads matter less with few products and creative matters correspondingly more." },
    ],
    closing: { h2: 'Have your store account read properly.', p: "Five days, a written read — starting with whether the numbers you have been making decisions on are real." },
    related: [
      { href: '/ecommerce-facebook-ads-agency', title: 'Ecommerce Meta ads', note: 'The full commercial case.' },
      { href: '/scaling-meta-ads', title: 'Scaling Meta ads', note: 'What breaks as you grow.' },
      { href: '/check', title: 'Account check', note: 'Five days, a straight read.' },
    ],
  },
  {
    slug: 'facebook-ad-creative-testing',
    title: 'Facebook Ad Creative Testing — A Working System | Sevenam',
    description: 'How to test Meta ad creative properly: what to vary, how long to run it, what to measure, and why volume beats cleverness every time.',
    eyebrow: 'GUIDE', h1: 'Facebook Ad Creative Testing',
    lead: 'The binding constraint in nearly every account we read.',
    s1: {
      h2: 'Test concepts, not colours.',
      paras: [
        "Most creative testing is variation testing: the same idea with a different headline, a different background, a different button colour. Those differences produce small effects that take enormous volume to detect, which is why so much testing concludes nothing.",
        "The differences that actually move an account are conceptual — a different reason to care, a different opening three seconds, a different format entirely. Test angles against each other, and only refine within an angle once one is clearly winning.",
      ],
      items: [
        'Vary the concept: the angle, the hook, the format.',
        'Small variations need volume most accounts do not have.',
        'The first three seconds decide most of the outcome.',
        'Refine within a winner only after the winner is clear.',
      ],
    },
    s2: {
      h2: 'Cadence beats cleverness.',
      paras: [
        "An account fed several genuinely different concepts every week will beat one running an elaborate testing framework on two ideas a month. Volume is what gives the platform something to optimise between, and it is what outruns fatigue.",
        "Give each test long enough to leave the learning phase, judge it on cost per result rather than on click-through rate, and keep every loser documented — knowing which angles fail is most of what makes the next batch better.",
      ],
      items: [
        'Ship new concepts weekly, not in one monthly batch.',
        'Let tests exit the learning phase before drawing conclusions.',
        'Judge on cost per result; click-through rate flatters bad ads.',
        'Document losers — the pattern in them is the real output.',
        'Retire winners before frequency does it for you.',
      ],
    },
    faqs: [
      { q: 'How many creatives do we need each month?', a: "More than two, and the honest answer scales with spend. The test is whether you can retire a fatiguing ad without leaving a hole — if you cannot, you are not producing enough." },
      { q: 'How long should a test run?', a: "Long enough to exit learning and accumulate meaningful results, which depends on your conversion volume. Judging in the first couple of days is the most common and most expensive mistake." },
      { q: 'Should we use split testing tools?', a: "For genuinely important structural questions, sometimes. For everyday creative, running concepts together and reading cost per result is faster and closer to how the account actually operates." },
      { q: 'What makes a good hook?', a: "Something specific enough that the right person recognises themselves in the first second. Generic openings are skipped by everyone equally." },
      { q: 'Can AI make the creative?', a: "It helps with volume — variations, cuts, versioning for placements. The concept, the offer and the judgement about what is worth saying still need a person, and pretending otherwise produces a lot of forgettable ads quickly." },
    ],
    closing: { h2: 'Fix the supply, not the settings.', p: "Fifteen minutes with Josh, no pitch deck. In most accounts the ceiling is creative volume, and it is the easiest thing to prove." },
    related: [
      { href: '/creative-cost', title: 'Creative cost calculator', note: 'What a concept costs you now.' },
      { href: '/scaling-meta-ads', title: 'Scaling Meta ads', note: 'Why the ceiling appears.' },
      { href: '/meta-ad-library', title: 'Meta Ad Library', note: 'Where to find angles.' },
      { href: '/pricing', title: 'How it works to buy', note: 'Creative by batch or month.' },
    ],
  },
  {
    slug: 'facebook-ads-strategy',
    title: 'Facebook Ads Strategy — What Actually Matters Now | Sevenam',
    description: 'A current, practical Meta ads strategy: simple account structure, broad targeting, creative volume and fast decisions — and what to stop doing.',
    eyebrow: 'GUIDE', h1: 'Facebook Ads Strategy',
    lead: 'Most of what is still taught as strategy was made obsolete by the platform.',
    s1: {
      h2: 'What stopped mattering.',
      paras: [
        "Elaborate audience research, layered interest stacking, tightly segmented ad sets and manual bid management were genuine skills when the platform needed the help. It largely does not any more, and accounts still run that way tend to underperform simpler ones — they fragment the data the system learns from and raise frequency on artificially narrow audiences.",
        "The uncomfortable part for the industry is that a lot of the work agencies charge for lives in this category.",
      ],
      items: [
        'Interest stacking and micro-segmentation: mostly counterproductive.',
        'Manual bid management: superseded in most accounts.',
        'Dozens of ad sets: fragments learning without adding control.',
        'Elaborate funnel diagrams: rarely survive contact with the account.',
      ],
    },
    s2: {
      h2: 'What matters instead.',
      paras: [
        "Four things, in order: measurement you can trust, an offer that converts, creative volume, and decision speed. Everything else is detail, and no amount of clever structure compensates for a failure in any of the four.",
        "That is a less impressive-sounding strategy than a twenty-slide funnel diagram. It is also what the accounts that work actually do.",
      ],
      items: [
        'Measurement: events that map to money, verified rather than assumed.',
        'Offer: the thing no advertising can rescue if it is wrong.',
        'Creative: enough distinct concepts, shipped continuously.',
        'Decisions: acted on daily, not at the monthly meeting.',
        'Simple structure so the platform can learn from all of it.',
      ],
    },
    faqs: [
      { q: 'Do we still need a full funnel structure?', a: "Some separation between prospecting and retargeting still earns its place. The elaborate multi-stage funnels drawn in strategy decks usually do not, and they cost you learning data." },
      { q: 'Is broad targeting really the answer?', a: "In most accounts now, yes. The platform finds buyers more effectively than interest selection does, provided your conversion data is clean and the creative gives it something to work with." },
      { q: 'How often should we change things?', a: "Decisions daily, changes deliberately. Reading the account every day does not mean altering it every day — most days the right decision is to leave it alone, and knowing that is the point." },
      { q: 'What should we stop doing first?', a: "Running too few creative concepts. It is the constraint in the overwhelming majority of accounts, and it is the one that gets the least attention in strategy conversations." },
      { q: 'Does strategy differ by industry?', a: "The measurement and the creative angles differ enormously. The four things that matter do not." },
    ],
    closing: { h2: 'Find out which of the four is failing.', p: "Fifteen minutes with Josh, no pitch deck. It is usually measurement or creative, and it is usually fixable." },
    related: [
      { href: '/check', title: 'The account check', note: 'Before you change anything.' },
      { href: '/facebook-ad-creative-testing', title: 'Creative testing', note: 'The main constraint.' },
      { href: '/meta-advantage-plus', title: 'Advantage+', note: 'What automation changed.' },
      { href: '/system', title: 'How it works', note: 'Decisions, daily.' },
    ],
  },
  {
    slug: 'facebook-ads-audit',
    title: 'Facebook Ads Audit — What a Real One Covers | Sevenam',
    description: 'What a genuine Meta ads audit examines, what a free audit is usually for, and the checklist to run against your own account before you buy one.',
    eyebrow: 'AUDIT', h1: 'Facebook Ads Audit',
    lead: 'Most free audits are a sales call with a spreadsheet attached.',
    s1: {
      h2: 'What a free audit usually is.',
      paras: [
        "A free audit is a lead generation product. That does not make it worthless — a competent person looking at your account for an hour will usually spot something real — but it is scoped to produce a reason to hire whoever performed it, and it is scoped to the hour.",
        "The tell is what it concludes. If every audit from a provider recommends the service that provider sells, it was a pitch with findings attached.",
      ],
      items: [
        'Free audits are scoped to produce a proposal.',
        'An hour is enough to spot symptoms, not causes.',
        'Findings tend to align with what the auditor sells.',
        'A real audit can conclude that nothing needs changing.',
      ],
    },
    s2: {
      h2: 'What a real one examines.',
      paras: [
        "Start with measurement, because everything downstream is built on it. Then structure, then creative supply, then the decision history — what was changed, when, and how long the account ran in a state somebody should have caught.",
        "Run this list against your own account before paying anyone. Most of it is visible to you already.",
      ],
      items: [
        'Do purchase or lead events fire once, with correct values?',
        'Is the conversions API live, and is deduplication working?',
        'Does Meta-reported conversion volume reconcile with your own systems?',
        'How many genuinely distinct creative concepts ran last month?',
        'What is frequency doing on your main prospecting audiences?',
        'How long did the last underperforming ad set run before it was stopped?',
        'Who owns the ad account, the pixel and the creative files?',
      ],
    },
    faqs: [
      { q: 'Do you do a free audit?', a: "Not a free one, and that is deliberate. The account check is five days of actual work — reading the data, reconciling the numbers, writing the findings — and pricing it honestly is what keeps it from being a sales call." },
      { q: 'What do we get at the end of it?', a: "A written document covering measurement integrity, account structure, creative supply and where money is going that should not be, with the changes ranked by what they are worth." },
      { q: 'Can we run the audit ourselves?', a: "Much of it, yes, using the checklist above. What is harder to do alone is the reconciliation work and judging creative volume against what your spend actually requires." },
      { q: 'Do we have to buy anything afterwards?', a: "No. A fair number of checks end with us saying the account is in decent shape and the constraint is elsewhere." },
      { q: 'How long does it take?', a: "Five days, so there is time to look at the data properly rather than skim a dashboard." },
    ],
    closing: { h2: 'Have the account read properly.', p: "Five days, a written read on what it is actually doing, and a list of what would change. Some of those end with us telling you to change nothing." },
    related: [
      { href: '/check', title: 'Account check', note: 'The product itself.' },
      { href: '/facebook-ads-consultant', title: 'Consultant or execution?', note: 'Which one you need.' },
      { href: '/how-to-run-meta-ads-yourself', title: 'Run it yourself', note: 'If the account is fine.' },
    ],
  },
  {
    slug: 'growth',
    title: 'The Growth Thesis — Why Fees Should Not Scale With Spend | Sevenam',
    description: 'The argument behind Sevenam: platform automation moved the work, creative volume and decision speed became the constraints, and percentage fees stopped making sense.',
    eyebrow: 'THE THESIS', h1: 'The Growth Thesis',
    lead: 'The work changed. The pricing model did not.',
    s1: {
      h2: 'What the platform took over.',
      paras: [
        "For most of the last decade, the skilled part of paid social was audience construction, ad set architecture and bid management. Agencies priced accordingly, usually as a percentage of the budget they were managing, and that was defensible while the work scaled with the money.",
        "The platform has since automated most of it. Targeting, placement and budget distribution are now handled better by Meta's own systems than by hand in the overwhelming majority of accounts. The work did not disappear, but the part that remains does not grow when your budget does.",
      ],
      items: [
        'Targeting and bidding: largely automated by the platform.',
        'Account structure: simpler now, and better for being simpler.',
        'The remaining work is creative supply and decision speed.',
        'Neither of those scales with your media budget.',
      ],
    },
    s2: {
      h2: 'What follows from that.',
      paras: [
        "If the work no longer scales with spend, a fee calculated on spend is charging you for your own growth. Double the budget because the account is working — your capital, your risk — and the invoice doubles for work that did not.",
        "Two things follow. Fees should be fixed and quoted against what the account actually needs. And the asset should be yours, because a provider who owns your account has an interest in you not being able to leave.",
      ],
      items: [
        'Fixed fees, sized to the account rather than the budget.',
        'The account, pixel and creative owned by the business, not the provider.',
        'Creative volume treated as the primary deliverable.',
        'Decisions made daily, and written down where you can audit them.',
        'No lock-in, because retention should be earned monthly.',
      ],
    },
    faqs: [
      { q: 'Is this just an argument for being cheaper?', a: "No. A fixed fee is sometimes more than a percentage would have been, particularly at lower spend. The argument is that the price should track the work, in either direction." },
      { q: 'Why do agencies still charge a percentage?', a: "Because it is simple to explain, it scales revenue without scaling headcount, and clients have accepted it for years. Those are good reasons for an agency and not reasons for you." },
      { q: 'What if automation improves further?', a: "Then the remaining work concentrates even harder on creative and judgement, and the case for a spend-based fee gets weaker again. We would rather be positioned for that than against it." },
      { q: 'Does this mean media buying is dead?', a: "It means the mechanical part is. Somebody still has to decide what to stop, what to scale and what to make next, and those decisions are worth more now, not less." },
      { q: 'Where does AI fit?', a: "In reading the account overnight and drafting the day's decisions, and in creative production volume. Not in deciding what your customers are worth or what is worth saying to them." },
    ],
    closing: { h2: 'See what the thesis looks like applied to your account.', p: "Fifteen minutes with Josh, no pitch deck. Or answer five questions first and get a straight read on which part fits." },
    related: [
      { href: '/agency-fee', title: 'Agency fee calculator', note: 'The percentage, in dollars.' },
      { href: '/about', title: 'About', note: 'Who builds the system.' },
      { href: '/system', title: 'How it works', note: 'Overnight, then 7am.' },
      { href: '/ai-marketing-agency', title: 'Where we use AI', note: 'And where we do not.' },
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
    secondaryHref: '/learn',
    secondaryLabel: 'More guides',
    sections: [
      { tone: 'paper', h2: p.s1.h2, paras: p.s1.paras, items: p.s1.items },
      { tone: 'ink', h2: p.s2.h2, paras: p.s2.paras, items: p.s2.items },
    ],
    faqs: p.faqs,
    related: p.related,
    closing: p.closing,
    article: { headline: p.h1 },
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Learn', path: '/learn' },
      { name: p.h1, path: '/' + p.slug },
    ],
  }));
}

module.exports = { build, PAGES };
