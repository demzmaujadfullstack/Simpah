"use client";

import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Warga",
      image: "https://ui-avatars.com/api/?name=Budi+Santoso&background=16a34a&color=fff",
      quote:
        "SIMPAH sangat memudahkan saya dalam mengelola sampah rumah tangga. Tinggal foto dan upload, petugas langsung verifikasi. Poinnya juga menarik!",
    },
    {
      name: "Siti Rahayu",
      role: "Petugas",
      image: "https://ui-avatars.com/api/?name=Siti+Rahayu&background=2563eb&color=fff",
      quote:
        "Sebagai petugas, saya bisa memverifikasi setoran dengan cepat. Dashboard yang intuitif membuat pekerjaan saya lebih efisien.",
    },
    {
      name: "Ahmad Fauzi",
      role: "Admin",
      image: "https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=dc2626&color=fff",
      quote:
        "Dengan SIMPAH, saya bisa memonitor seluruh aktivitas setoran dan warga. Laporan lengkap membantu pengambilan keputusan.",
    },
  ];

  return (
    <section id="testimoni" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Apa Kata <span className="text-emerald-600">Mereka?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Testimoni dari pengguna SIMPAH yang sudah merasakan manfaatnya.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
              {/* PERBAIKAN: Gunakan &quot; atau &#34; */}
              <p className="mt-4 text-slate-600">
                &#34;{testimonial.quote}&#34;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}