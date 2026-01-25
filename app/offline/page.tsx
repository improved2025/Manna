export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-950 px-6">
      <div className="max-w-md text-center text-white space-y-4">
        <h1 className="text-2xl font-semibold">You’re offline</h1>
        <p className="text-sm text-emerald-100">
          MANNA is resting quietly until your connection returns.
        </p>
        <p className="text-xs text-emerald-200">
          Scripture, reflection, and prayer will resume once you’re back online.
        </p>
      </div>
    </main>
  );
}
