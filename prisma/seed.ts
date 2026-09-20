/**
 * ThinkSpace Seed Data
 * 
 * Creates:
 * - 20 realistic users (2 admins, 2 moderators, 16 regular)
 * - 30 topics
 * - 100 thoughts with realistic content
 * - 200 comments
 * - ~1,000 likes
 * - 50 follow relationships
 * - 50 notifications
 *
 * Test accounts:
 * - admin@thinkspace.app / Admin@12345
 * - mod@thinkspace.app / Mod@12345
 * - alice@thinkspace.app / User@12345
 * - bob@thinkspace.app / User@12345
 */

import { PrismaClient, type Prisma } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

// ─── Seed data ────────────────────────────────────────────

const TOPICS = [
  { name: 'Technology', slug: 'technology', description: 'All things tech' },
  { name: 'Artificial Intelligence', slug: 'ai', description: 'AI, ML, LLMs and the future' },
  { name: 'Career', slug: 'career', description: 'Work, jobs, and professional growth' },
  { name: 'College', slug: 'college', description: 'Student life, academics, and campus experiences' },
  { name: 'Programming', slug: 'programming', description: 'Code, software, and development' },
  { name: 'Life', slug: 'life', description: 'Everyday thoughts and experiences' },
  { name: 'Motivation', slug: 'motivation', description: 'Inspiration, goals, and personal growth' },
  { name: 'Philosophy', slug: 'philosophy', description: 'Deep thoughts and big questions' },
  { name: 'Books', slug: 'books', description: 'Reading, literature, and ideas from books' },
  { name: 'Movies', slug: 'movies', description: 'Film, cinema, and storytelling' },
  { name: 'Travel', slug: 'travel', description: 'Adventures, places, and cultures' },
  { name: 'Relationships', slug: 'relationships', description: 'Love, friendship, and human connection' },
  { name: 'Mental Health', slug: 'mental-health', description: 'Wellbeing, emotions, and self-care' },
  { name: 'Productivity', slug: 'productivity', description: 'Getting things done and working smarter' },
  { name: 'Finance', slug: 'finance', description: 'Money, investing, and financial freedom' },
  { name: 'Science', slug: 'science', description: 'Research, discoveries, and the natural world' },
  { name: 'Politics', slug: 'politics', description: 'Society, governance, and civic life' },
  { name: 'Creativity', slug: 'creativity', description: 'Art, design, music, and creative expression' },
  { name: 'Startups', slug: 'startups', description: 'Entrepreneurship, building, and founding' },
  { name: 'Health', slug: 'health', description: 'Fitness, nutrition, and physical wellbeing' },
  { name: 'Education', slug: 'education', description: 'Learning, teaching, and knowledge' },
  { name: 'Gaming', slug: 'gaming', description: 'Video games, esports, and game culture' },
  { name: 'Music', slug: 'music', description: 'Songs, artists, genres, and listening experiences' },
  { name: 'Food', slug: 'food', description: 'Cooking, restaurants, and culinary adventures' },
  { name: 'Environment', slug: 'environment', description: 'Climate, sustainability, and the planet' },
  { name: 'Humor', slug: 'humor', description: 'Funny observations and lighthearted thoughts' },
  { name: 'Sports', slug: 'sports', description: 'Athletics, teams, and competition' },
  { name: 'Design', slug: 'design', description: 'UX, visual design, and aesthetics' },
  { name: 'Social Media', slug: 'social-media', description: 'Online culture and digital life' },
  { name: 'Writing', slug: 'writing', description: 'Words, storytelling, and the craft of writing' },
];

const USERS_DATA = [
  { username: 'admin', email: 'admin@thinkspace.app', displayName: 'Admin', role: 'ADMIN' as const, bio: 'ThinkSpace administrator' },
  { username: 'moderator', email: 'mod@thinkspace.app', displayName: 'Moderator', role: 'MODERATOR' as const, bio: 'Platform moderator' },
  { username: 'alice_thinks', email: 'alice@thinkspace.app', displayName: 'Alice Chen', role: 'USER' as const, bio: 'Software engineer by day, philosopher by night. Currently exploring AI ethics.' },
  { username: 'bob_writes', email: 'bob@thinkspace.app', displayName: 'Bob Martinez', role: 'USER' as const, bio: 'Writer, reader, coffee drinker. Sharing thoughts on life and creativity.' },
  { username: 'priya_dev', email: 'priya@thinkspace.app', displayName: 'Priya Sharma', role: 'USER' as const, bio: 'Full-stack dev. Passionate about clean code and cleaner coffee.' },
  { username: 'james_curious', email: 'james@thinkspace.app', displayName: 'James Okafor', role: 'USER' as const, bio: 'Curious about everything. Student of philosophy and computer science.' },
  { username: 'sarah_builds', email: 'sarah@thinkspace.app', displayName: 'Sarah Kim', role: 'USER' as const, bio: 'Startup founder. Building things, breaking things, learning things.' },
  { username: 'rahul_reads', email: 'rahul@thinkspace.app', displayName: 'Rahul Verma', role: 'USER' as const, bio: '50 books a year. Sharing ideas from my reading.' },
  { username: 'emma_creates', email: 'emma@thinkspace.app', displayName: 'Emma Wilson', role: 'USER' as const, bio: 'Designer and artist. Making things that matter.' },
  { username: 'leo_ventures', email: 'leo@thinkspace.app', displayName: 'Leo Santos', role: 'USER' as const, bio: 'Entrepreneur. First-time founder navigating the startup world.' },
  { username: 'nadia_minds', email: 'nadia@thinkspace.app', displayName: 'Nadia Hassan', role: 'USER' as const, bio: 'Psychology researcher. Fascinated by how minds work.' },
  { username: 'david_codes', email: 'david@thinkspace.app', displayName: 'David Park', role: 'USER' as const, bio: 'Open source enthusiast. Writing code and occasional poetry.' },
  { username: 'sofia_explores', email: 'sofia@thinkspace.app', displayName: 'Sofia Reyes', role: 'USER' as const, bio: 'Traveler, photographer. The world is my classroom.' },
  { username: 'aaron_thinks', email: 'aaron@thinkspace.app', displayName: 'Aaron Thompson', role: 'USER' as const, bio: 'Former academic, now tech writer. Making complex ideas simple.' },
  { username: 'mia_grows', email: 'mia@thinkspace.app', displayName: 'Mia Johnson', role: 'USER' as const, bio: 'Career coach. Helping people figure out what they actually want.' },
  { username: 'kai_questions', email: 'kai@thinkspace.app', displayName: 'Kai Nakamura', role: 'USER' as const, bio: 'Always asking why. Engineer who loves philosophy.' },
  { username: 'luna_writes', email: 'luna@thinkspace.app', displayName: 'Luna García', role: 'USER' as const, bio: 'Journalist turned blogger. Words are my tools.' },
  { username: 'omar_builds', email: 'omar@thinkspace.app', displayName: 'Omar Al-Farsi', role: 'USER' as const, bio: 'Product manager. Building software people actually want to use.' },
  { username: 'zara_learns', email: 'zara@thinkspace.app', displayName: 'Zara Patel', role: 'USER' as const, bio: 'Lifelong learner. Currently studying quantum computing.' },
  { username: 'finn_adventures', email: 'finn@thinkspace.app', displayName: 'Finn O\'Brien', role: 'USER' as const, bio: 'Remote worker, world traveler. Thoughts from many time zones.' },
];

const THOUGHT_CONTENTS = [
  // Technology/AI
  { content: "AI is not going to take your job. A person using AI effectively is going to take your job. The skill gap is widening every day.", topics: ['technology', 'ai', 'career'] },
  { content: "We're building AGI with the safety standards of a startup MVP. That should terrify everyone.", topics: ['ai', 'technology'] },
  { content: "The most underrated programming skill: knowing when NOT to write code.", topics: ['programming', 'technology'] },
  { content: "Every senior developer I've met has been humbled by debugging a problem that turned out to be a missing semicolon or a timezone issue.", topics: ['programming', 'humor'] },
  { content: "Open source is one of humanity's greatest collaborative achievements and most people don't even know it exists.", topics: ['technology', 'programming'] },
  { content: "Learning a new programming language is like learning a new way of thinking. Python taught me elegance. C taught me empathy for computers.", topics: ['programming', 'education'] },
  { content: "The biggest lie in tech: 'We'll clean up the technical debt after launch.'", topics: ['technology', 'programming', 'humor'] },
  { content: "ChatGPT writing code is like a super-smart intern: incredibly fast, occasionally confidently wrong, needs supervision.", topics: ['ai', 'programming'] },
  { content: "We spent 50 years making computers faster. Now we're spending billions making AI slower and calling it 'deliberate reasoning.'", topics: ['ai', 'technology'] },
  { content: "The future of software is probably mostly AI-generated code reviewed by humans who barely understand it. I'm not sure how I feel about that.", topics: ['ai', 'programming'] },

  // Career/Work
  { content: "Nobody tells you that finding the right problem to work on is harder than solving the problem itself.", topics: ['career', 'life'] },
  { content: "The best career advice I ever got: be so good they can't ignore you. Still working on the 'good' part.", topics: ['career', 'motivation'] },
  { content: "I used to think success meant having all the answers. Now I think it means knowing which questions to ask.", topics: ['career', 'life', 'philosophy'] },
  { content: "Hustle culture convinced an entire generation that rest is laziness. Burnout is not a badge of honor.", topics: ['career', 'mental-health', 'life'] },
  { content: "Most career advice is either blindingly obvious or deeply specific to the person giving it. Very little of it actually transfers.", topics: ['career', 'life'] },
  { content: "The best skill I developed in my 20s wasn't technical. It was learning how to have difficult conversations.", topics: ['career', 'relationships'] },
  { content: "Remote work isn't just about location flexibility. It's about rethinking what 'work' actually means.", topics: ['career', 'life'] },
  { content: "Nobody ever got fired for saying 'I need to think about that.' Take the time.", topics: ['career', 'motivation'] },

  // College/Student life
  { content: "College teaches you how to learn, not what to learn. The specific content matters far less than the skill of figuring things out.", topics: ['college', 'education'] },
  { content: "First year of college: trying to impress everyone. Final year of college: wearing pajamas to class and not caring.", topics: ['college', 'humor', 'life'] },
  { content: "The most valuable thing I learned in college wasn't in any course. It was learning to live with strangers.", topics: ['college', 'life', 'relationships'] },
  { content: "Exam season is society's way of testing if you can perform under irrational pressure. Spoiler: most jobs involve exactly that.", topics: ['college', 'career'] },
  { content: "Nobody prepares you for the weird grief of leaving a place you complained about every day for four years.", topics: ['college', 'life', 'mental-health'] },

  // Life/Philosophy
  { content: "We're all just making up adulthood as we go. The people who seem to have it figured out are the best improvisers.", topics: ['life', 'philosophy'] },
  { content: "The quietest, most revolutionary thing you can do is slow down on purpose in a world that rewards speed.", topics: ['life', 'mental-health', 'philosophy'] },
  { content: "Nobody actually remembers most of their days. We remember feelings, moments, and peaks. Build those.", topics: ['life', 'philosophy'] },
  { content: "Accepting that you will never have 'enough' time is terrifying. It's also the most freeing thing I've ever realized.", topics: ['philosophy', 'life', 'mental-health'] },
  { content: "The older I get, the more I believe kindness requires courage.", topics: ['life', 'philosophy', 'relationships'] },
  { content: "Most conflict is two people who both think they're being reasonable.", topics: ['philosophy', 'relationships'] },
  { content: "We tend to judge ourselves by our intentions and others by their behavior. This is the root of so much unnecessary conflict.", topics: ['philosophy', 'relationships', 'mental-health'] },
  { content: "Books are weird. A stranger figured something out decades ago, wrote it down, and now that idea lives in your head.", topics: ['books', 'philosophy'] },

  // Motivation/Growth
  { content: "Your standards are set by what you're willing to accept, not what you say you want.", topics: ['motivation', 'life'] },
  { content: "The reason most people don't change is that change is uncomfortable and the status quo isn't uncomfortable enough yet.", topics: ['motivation', 'psychology', 'life'] },
  { content: "Discipline is not willpower. Discipline is designing your environment so that good choices are easy.", topics: ['motivation', 'productivity'] },
  { content: "Most people overestimate what they can do in a day and underestimate what they can do in a year.", topics: ['motivation', 'productivity'] },
  { content: "The first step in solving a problem is admitting you have one. The second is resisting the urge to make it about your identity.", topics: ['motivation', 'mental-health'] },

  // Mental health
  { content: "Rest is not laziness. Rest is maintenance. You wouldn't drive a car 50,000 miles without an oil change.", topics: ['mental-health', 'life'] },
  { content: "Anxiety is often the brain trying to solve a future problem with today's resources. Sometimes you need to put the problem down.", topics: ['mental-health', 'philosophy'] },
  { content: "Therapy taught me that 'I'm fine' is often a coping mechanism, not a description of reality.", topics: ['mental-health', 'life'] },
  { content: "Setting a boundary is not being cold. It's being clear. Big difference.", topics: ['mental-health', 'relationships'] },

  // Relationships
  { content: "Real friendship is being able to pick up exactly where you left off, even after months of silence.", topics: ['relationships', 'life'] },
  { content: "The most important relationship skill nobody teaches you: how to repair, not just avoid conflict.", topics: ['relationships', 'life'] },
  { content: "I've learned more about myself from my relationships than from any amount of solo reflection.", topics: ['relationships', 'life', 'philosophy'] },
  { content: "People don't actually want advice most of the time. They want to feel heard. Learning to give that is underrated.", topics: ['relationships', 'mental-health'] },

  // Creativity/Arts
  { content: "Creativity is not a talent. It's a habit. The people who seem most creative are just the ones who practice it most consistently.", topics: ['creativity', 'productivity'] },
  { content: "Most writers don't suffer from a lack of ideas. They suffer from a lack of commitment to bad first drafts.", topics: ['writing', 'creativity'] },
  { content: "Music is the only art that exists entirely in time. Every other art form, you can pause and come back. Music demands your full presence.", topics: ['music', 'philosophy', 'creativity'] },
  { content: "Good design is invisible. You only notice bad design.", topics: ['design', 'technology'] },

  // Startups/Finance
  { content: "Startups don't fail because of bad ideas. They fail because smart people fall in love with their bad ideas.", topics: ['startups', 'career'] },
  { content: "The best time to start a company is when you're frustrated enough with a problem that you'd rather build the solution than complain about it.", topics: ['startups', 'career', 'motivation'] },
  { content: "Financial literacy should be mandatory education. We teach calculus but not compound interest.", topics: ['finance', 'education'] },
  { content: "The secret to wealth isn't earning more. It's widening the gap between what you earn and what you need.", topics: ['finance', 'life'] },

  // Environment/Science
  { content: "Climate change isn't a future problem. It's a present emergency that we've decided to treat as a future problem.", topics: ['environment', 'science'] },
  { content: "Science doesn't have opinions. Scientists do. Learn to tell the difference.", topics: ['science', 'philosophy'] },
  { content: "We live in an age where anyone with a phone can access more information than was in the Library of Alexandria. We're somehow less informed.", topics: ['technology', 'education', 'philosophy'] },

  // Social media/Technology culture
  { content: "Social media optimized for engagement accidentally optimized for outrage. That was a very expensive mistake for everyone.", topics: ['social-media', 'technology', 'philosophy'] },
  { content: "We have 5G internet and still can't have a calm political discussion online. The technology was never the bottleneck.", topics: ['social-media', 'politics', 'technology'] },
  { content: "Doomscrolling is the modern equivalent of stress eating. Satisfying in the moment, terrible for you in aggregate.", topics: ['social-media', 'mental-health'] },

  // Humor
  { content: "When someone says 'it'll only take 5 minutes' in a tech context, that means it could take anywhere from 5 minutes to 3 weeks.", topics: ['technology', 'humor', 'programming'] },
  { content: "Adult friendship is texting 'we should hang out soon!' every 3 months and calling it maintaining a relationship.", topics: ['relationships', 'humor', 'life'] },
  { content: "Everyone's a morning person when they go to sleep excited about what they're working on.", topics: ['motivation', 'humor', 'productivity'] },

  // Books/Education
  { content: "A book that changes 1% of how you see the world is better than 10 books that confirm what you already believe.", topics: ['books', 'education', 'philosophy'] },
  { content: "Reading fiction develops empathy. That's not a metaphor. Studies show it literally does.", topics: ['books', 'science'] },
  { content: "The best teachers don't give you answers. They give you better questions.", topics: ['education', 'philosophy'] },

  // Travel
  { content: "Travel doesn't make you a better person. Showing up with curiosity and humility does. You can do that in your hometown.", topics: ['travel', 'life', 'philosophy'] },
  { content: "The most important thing I've learned from traveling is that most people in most places are just trying to live a decent life.", topics: ['travel', 'philosophy', 'life'] },

  // Anonymous thoughts (will be marked isAnonymous=true)
  { content: "I'm doing well by every external metric and I still feel like something is missing. I don't know how to say that to people who care about me.", topics: ['mental-health', 'life'], anonymous: true },
  { content: "I applied to 47 jobs this year. Got 3 interviews. Still nothing. I'm starting to wonder if it's me.", topics: ['career', 'mental-health'], anonymous: true },
  { content: "Sometimes I wonder if the relationships I have online are more real than some of my offline ones.", topics: ['relationships', 'social-media', 'life'], anonymous: true },
  { content: "I'm terrified of becoming my parents. I'm also terrified of not being good enough to be like them.", topics: ['life', 'mental-health', 'relationships'], anonymous: true },
  { content: "Hot take: most 'imposter syndrome' is actually just correct assessment of being new to something. The cure is doing the work, not mindset shifts.", topics: ['career', 'mental-health', 'motivation'], anonymous: true },
];

const COMMENTS = [
  "This is exactly what I needed to read today.",
  "I've been thinking about this a lot lately. Thank you for putting it into words.",
  "Respectfully disagree. The counterargument is that...",
  "The nuance here is important. It's not just about X, it's about when and why.",
  "This hit differently after what happened to me last week.",
  "Hard agree. Been saying this for years.",
  "Could you expand on this? I feel like there's a lot more to unpack here.",
  "I've shared this with three people already. That rarely happens.",
  "The last part especially. That's wisdom right there.",
  "Not sure I agree, but this gave me something to think about.",
  "Why don't we talk about this more openly?",
  "Coming back to this one for the third time today.",
  "Simple words, big truth.",
  "This is the kind of thought that makes you pause what you're doing.",
  "I wish more people understood this.",
  "Okay but what's the solution? Diagnosing is easy, fixing is hard.",
  "Personal experience fully validates this.",
  "The more I think about this, the more I believe it applies to almost everything.",
  "Reading this at exactly the right moment. Weird how that happens.",
  "Sharing this in the group chat immediately.",
];

// ─── Main seed function ────────────────────────────────────

async function main() {
  console.log('🌱 Starting ThinkSpace seed...');

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.report.deleteMany();
  await prisma.block.deleteMany();
  await prisma.like.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.repost.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.thoughtTopic.deleteMany();
  await prisma.thought.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Create topics
  const topics = await Promise.all(
    TOPICS.map((topic) =>
      prisma.topic.create({ data: topic }),
    ),
  );
  const topicMap = new Map(topics.map((t) => [t.slug, t]));
  console.log(`✅ Created ${topics.length} topics`);

  // Hash passwords
  const adminPasswordHash = await argon2.hash('Admin@12345');
  const modPasswordHash = await argon2.hash('Mod@12345');
  const userPasswordHash = await argon2.hash('User@12345');

  // Create users
  const users = await Promise.all(
    USERS_DATA.map((u, i) => {
      const hash = u.role === 'ADMIN' ? adminPasswordHash
        : u.role === 'MODERATOR' ? modPasswordHash
        : userPasswordHash;

      return prisma.user.create({
        data: {
          ...u,
          passwordHash: hash,
          emailVerified: true,
          isVerified: i < 4, // first 4 users are verified
        },
      });
    }),
  );
  console.log(`✅ Created ${users.length} users`);

  // Create follow relationships
  const regularUsers = users.filter((u) => u.role === 'USER');
  const follows: Prisma.FollowCreateManyInput[] = [];

  for (let i = 0; i < regularUsers.length; i++) {
    for (let j = 0; j < regularUsers.length; j++) {
      if (i !== j && Math.random() < 0.3) {
        follows.push({
          followerId: regularUsers[i].id,
          followingId: regularUsers[j].id,
        });
      }
    }
  }

  // Ensure no duplicates
  const uniqueFollows = follows.filter(
    (f, i, arr) =>
      arr.findIndex(
        (x) => x.followerId === f.followerId && x.followingId === f.followingId,
      ) === i,
  );

  await prisma.follow.createMany({ data: uniqueFollows });
  console.log(`✅ Created ${uniqueFollows.length} follow relationships`);

  // Create thoughts
  const thoughts = [];
  for (let i = 0; i < THOUGHT_CONTENTS.length; i++) {
    const thoughtData = THOUGHT_CONTENTS[i];
    const authorIndex = i % regularUsers.length;
    const author = regularUsers[authorIndex];

    const moods = ['HAPPY', 'CURIOUS', 'REFLECTIVE', 'MOTIVATED', 'PEACEFUL', null, null] as const;
    const mood = moods[Math.floor(Math.random() * moods.length)];

    const thought = await prisma.thought.create({
      data: {
        content: thoughtData.content,
        userId: author.id,
        mood: mood ?? undefined,
        isAnonymous: 'anonymous' in thoughtData ? thoughtData.anonymous : false,
        visibility: 'PUBLIC',
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random time in last 30 days
      },
    });

    // Connect topics
    if (thoughtData.topics.length > 0) {
      const topicConnections = thoughtData.topics
        .map((slug) => topicMap.get(slug))
        .filter(Boolean)
        .map((topic) => ({
          thoughtId: thought.id,
          topicId: topic!.id,
        }));

      if (topicConnections.length > 0) {
        await prisma.thoughtTopic.createMany({ data: topicConnections });
      }
    }

    thoughts.push(thought);
  }
  console.log(`✅ Created ${thoughts.length} thoughts`);

  // Create likes (~1000 distributed across thoughts)
  const likes: Prisma.LikeCreateManyInput[] = [];
  for (const thought of thoughts) {
    const numLikes = Math.floor(Math.random() * 20);
    const shuffledUsers = [...regularUsers].sort(() => Math.random() - 0.5);
    const likers = shuffledUsers.slice(0, numLikes);

    for (const liker of likers) {
      if (liker.id !== thought.userId) {
        likes.push({
          thoughtId: thought.id,
          userId: liker.id,
        });
      }
    }
  }

  // Remove duplicates
  const uniqueLikes = likes.filter(
    (l, i, arr) =>
      arr.findIndex((x) => x.thoughtId === l.thoughtId && x.userId === l.userId) === i,
  );

  await prisma.like.createMany({ data: uniqueLikes });
  console.log(`✅ Created ${uniqueLikes.length} likes`);

  // Create bookmarks
  const bookmarks: Prisma.BookmarkCreateManyInput[] = [];
  for (const user of regularUsers) {
    const numBookmarks = Math.floor(Math.random() * 5);
    const shuffledThoughts = [...thoughts].sort(() => Math.random() - 0.5);
    for (const thought of shuffledThoughts.slice(0, numBookmarks)) {
      bookmarks.push({ userId: user.id, thoughtId: thought.id });
    }
  }

  const uniqueBookmarks = bookmarks.filter(
    (b, i, arr) =>
      arr.findIndex((x) => x.thoughtId === b.thoughtId && x.userId === b.userId) === i,
  );

  await prisma.bookmark.createMany({ data: uniqueBookmarks });
  console.log(`✅ Created ${uniqueBookmarks.length} bookmarks`);

  // Create comments
  const comments = [];
  for (const thought of thoughts.slice(0, 50)) {
    const numComments = Math.floor(Math.random() * 5);
    for (let i = 0; i < numComments; i++) {
      const commenter = regularUsers[Math.floor(Math.random() * regularUsers.length)];
      const commentContent = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];

      const comment = await prisma.comment.create({
        data: {
          content: commentContent,
          thoughtId: thought.id,
          userId: commenter.id,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        },
      });
      comments.push(comment);
    }
  }

  // Create some replies
  for (const comment of comments.slice(0, 20)) {
    if (Math.random() < 0.3) {
      const replier = regularUsers[Math.floor(Math.random() * regularUsers.length)];
      await prisma.comment.create({
        data: {
          content: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
          thoughtId: comment.thoughtId,
          userId: replier.id,
          parentCommentId: comment.id,
          createdAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000),
        },
      });
    }
  }

  console.log(`✅ Created ~${comments.length} comments`);

  // Create notifications
  const notifications: Prisma.NotificationCreateManyInput[] = [];
  for (const like of uniqueLikes.slice(0, 50)) {
    const thought = thoughts.find((t) => t.id === like.thoughtId);
    if (thought && like.userId !== thought.userId) {
      notifications.push({
        type: 'LIKE',
        recipientId: thought.userId,
        actorId: like.userId,
        thoughtId: thought.id,
      });
    }
  }

  for (const follow of uniqueFollows.slice(0, 30)) {
    notifications.push({
      type: 'FOLLOW',
      recipientId: follow.followingId,
      actorId: follow.followerId,
    });
  }

  await prisma.notification.createMany({ data: notifications });
  console.log(`✅ Created ${notifications.length} notifications`);

  console.log('\n🎉 Seed complete!\n');
  console.log('📋 Test Accounts:');
  console.log('  admin@thinkspace.app    / Admin@12345  (Admin)');
  console.log('  mod@thinkspace.app      / Mod@12345    (Moderator)');
  console.log('  alice@thinkspace.app    / User@12345   (User)');
  console.log('  bob@thinkspace.app      / User@12345   (User)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
