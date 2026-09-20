export function RightPanel() {
  return (
    <div className="flex flex-col h-full p-4 xl:p-6 gap-6">
      {/* Search (placeholder — Phase 8 will fill this) */}
      <div className="relative">
        <input
          type="search"
          placeholder="Search ThinkSpace..."
          className="input pl-10 pr-4"
          readOnly
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          🔍
        </span>
      </div>

      {/* Trending (placeholder) */}
      <div className="card p-4">
        <h2 className="text-sm font-semibold mb-3 text-foreground">Trending Topics</h2>
        <div className="space-y-3">
          {['#technology', '#ai', '#career', '#motivation', '#philosophy'].map((tag) => (
            <div key={tag} className="flex items-center justify-between group cursor-pointer">
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {tag}
                </p>
                <p className="text-xs text-muted-foreground">1.2K thoughts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested users (placeholder) */}
      <div className="card p-4">
        <h2 className="text-sm font-semibold mb-3 text-foreground">Who to follow</h2>
        <p className="text-xs text-muted-foreground">
          Suggestions will appear here after you set up your profile.
        </p>
      </div>

      {/* Footer links */}
      <div className="mt-auto pt-4 text-xs text-muted-foreground space-y-1">
        <p>© 2026 ThinkSpace</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Help</a>
        </div>
      </div>
    </div>
  );
}
