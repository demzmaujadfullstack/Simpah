"use client";

import { useState } from "react";
import Link from "next/link";
import { Recycle, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
            <Recycle className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-800">SIMPAH</span>
            <span className="ml-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              SMART WASTE
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="#tentang" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
            Tentang
          </Link>
          <Link href="#fitur" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
            Fitur
          </Link>
          <Link href="#cara-kerja" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
            Cara Kerja
          </Link>
          <Link href="#dashboard" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
            Dashboard
          </Link>
          <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
            FAQ
          </Link>
          
          {/* Tombol Login & Register */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Daftar
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 border-b border-slate-200 bg-white p-4 shadow-lg lg:hidden">
            <div className="flex flex-col space-y-3">
              <Link 
                href="#tentang" 
                className="text-sm text-slate-600 hover:text-emerald-600 transition" 
                onClick={handleLinkClick}
              >
                Tentang
              </Link>
              <Link 
                href="#fitur" 
                className="text-sm text-slate-600 hover:text-emerald-600 transition" 
                onClick={handleLinkClick}
              >
                Fitur
              </Link>
              <Link 
                href="#cara-kerja" 
                className="text-sm text-slate-600 hover:text-emerald-600 transition" 
                onClick={handleLinkClick}
              >
                Cara Kerja
              </Link>
              <Link 
                href="#dashboard" 
                className="text-sm text-slate-600 hover:text-emerald-600 transition" 
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
              <Link 
                href="#faq" 
                className="text-sm text-slate-600 hover:text-emerald-600 transition" 
                onClick={handleLinkClick}
              >
                FAQ
              </Link>
              
              {/* Tombol Login & Register di Mobile */}
              <div className="flex gap-3 pt-2 border-t border-slate-100">
                <Link
                  href="/auth/login"
                  className="flex-1 rounded-lg border border-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                  onClick={handleLinkClick}
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                  onClick={handleLinkClick}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}