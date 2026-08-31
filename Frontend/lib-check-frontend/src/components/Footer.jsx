function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-300 shadow-xl bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-7 sm:flex-row sm:px-6 lg:px-8">

        <p className="text-sm text-slate-800">
          © {new Date().getFullYear()} LibCheck. All rights reserved to Deepak.
        </p>

        <p className="text-sm text-slate-800">
          Library conditions, reported by members.
        </p>

      </div>
    </footer>
  );
}

export default Footer;