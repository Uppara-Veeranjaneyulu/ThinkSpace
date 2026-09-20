import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold">ThinkSpace</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost btn-md">Sign In</Link>
            <Link to="/register" className="btn-primary btn-md">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span>✨</span>
            <span>A new kind of social platform</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
            Share what's on
            <br />
            <span className="text-primary">your mind.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Thoughts. Perspectives. Conversations.
            <br />
            A calm, focused space to express yourself and discover what others are thinking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary btn-xl">
              Start Sharing — it's free
            </Link>
            <Link to="/explore" className="btn-outline btn-xl">
              Explore Thoughts
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            emoji: '💭',
            title: 'Share Your Thoughts',
            desc: 'Express your ideas, opinions, experiences, and questions in a dedicated space built for thoughtful sharing.',
          },
          {
            emoji: '🔍',
            title: 'Discover Perspectives',
            desc: 'Explore trending thoughts, browse topics that interest you, and find people who think deeply.',
          },
          {
            emoji: '🕶️',
            title: 'Post Anonymously',
            desc: 'Share sensitive thoughts without revealing your identity. Your authorship stays private.',
          },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            className="card p-6"
          >
            <div className="text-3xl mb-4">{feature.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of thinkers, creators, and curious minds.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-brand-600 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors">
            Create your ThinkSpace
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 ThinkSpace. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
