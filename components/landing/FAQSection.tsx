"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Apa itu SIMPAH?",
      answer:
        "SIMPAH (Sistem Informasi Pengelolaan Sampah) adalah platform digital yang menghubungkan masyarakat, petugas, dan admin dalam pengelolaan sampah berbasis reward.",
    },
    {
      question: "Siapa saja yang bisa menggunakan SIMPAH?",
      answer:
        "SIMPAH dapat digunakan oleh masyarakat umum (warga), petugas pengelola sampah, dan administrator. Setiap role memiliki akses dan fitur yang berbeda sesuai kebutuhan.",
    },
    {
      question: "Bagaimana cara mendapatkan poin?",
      answer:
        "Poin didapatkan dengan menyetor sampah melalui aplikasi. Setiap setoran akan diverifikasi oleh petugas dan poin akan otomatis ditambahkan ke akun Anda.",
    },
    {
      question: "Apakah SIMPAH gratis?",
      answer:
        "Ya, SIMPAH gratis untuk masyarakat. Tidak ada biaya pendaftaran atau biaya bulanan untuk menggunakan platform ini.",
    },
    {
      question: "Bagaimana cara verifikasi setoran?",
      answer:
        "Petugas akan memverifikasi setoran melalui dashboard. Setelah diverifikasi, poin akan otomatis ditambahkan ke akun warga dan status setoran akan berubah.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
            Pertanyaan yang Sering <span className="text-emerald-600">Diajukan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Temukan jawaban dari pertanyaan yang paling sering ditanyakan tentang SIMPAH.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
              >
                <span className="font-medium text-slate-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-emerald-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="border-t border-slate-200 px-6 py-4 text-sm text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}