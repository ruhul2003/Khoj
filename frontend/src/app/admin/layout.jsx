export const metadata = {
  title: "Admin Console | Khoj Marketplace",
  description: "Advanced minimalist product management and moderation dashboard for Khoj.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a0e17] text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
