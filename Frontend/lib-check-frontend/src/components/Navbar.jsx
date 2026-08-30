import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          Lib<span className="text-blue-600">Check</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            History
          </Link>

          {/* User */}
          <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800">
                {user?.name || "Member"}
              </p>

              <p className="text-xs text-slate-400">
                Member
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">

            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              to="/history"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              History
            </Link>

            <div className="my-2 border-t border-slate-100" />

            <div className="px-3 py-2">
              <p className="text-sm font-medium text-slate-800">
                {user?.name || "Member"}
              </p>

              <p className="text-xs text-slate-400">
                Member
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <LogOut size={16} />
              Logout
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;