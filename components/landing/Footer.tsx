import Link from "next/link";
import { Recycle, Mail, Phone, MapPin as MapPinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                <Recycle className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">SIMPAH</span>
                <span className="ml-1.5 rounded-full bg-emerald-600/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  SMART WASTE
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Sistem Informasi Pengelolaan Sampah berbasis digital untuk
              menciptakan lingkungan yang bersih dan sehat.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-emerald-600"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-emerald-600"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-emerald-600"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-emerald-600"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white">Tautan</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#tentang" className="text-slate-400 transition hover:text-white">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="#fitur" className="text-slate-400 transition hover:text-white">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#cara-kerja" className="text-slate-400 transition hover:text-white">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-slate-400 transition hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-white">Kontak</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="h-4 w-4" />
                info@simpah.com
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="h-4 w-4" />
                +62 21 1234 5678
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPinIcon className="h-4 w-4" />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="font-semibold text-white">Jam Operasional</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-slate-400">
                Senin - Jumat: 08.00 - 17.00
              </li>
              <li className="text-slate-400">
                Sabtu: 08.00 - 12.00
              </li>
              <li className="text-slate-400">
                Minggu: Tutup
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500 md:px-8">
          <p>
            © {new Date().getFullYear()} SIMPAH - Smart Waste System. All rights reserved.
          </p>
          <p className="mt-1">
            Dibangun untuk mendukung program pemerintah dalam pengelolaan sampah berkelanjutan.
          </p>
        </div>
      </div>
    </footer>
  );
}