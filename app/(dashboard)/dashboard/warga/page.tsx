import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import WargaHeader from "@/components/dashboard/warga/WargaHeader";
import WargaStats from "@/components/dashboard/warga/WargaStats";
import WargaStatusCard from "@/components/dashboard/warga/WargaStatusCard";
import WargaRecentSubmissions from "@/components/dashboard/warga/WargaRecentSubmissions";
import WargaProfileCard from "@/components/dashboard/warga/WargaProfileCard";

export default async function WargaDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Ambil data user lengkap dengan relasi
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      region: true,
      submissions: {
        include: {
          category: true,
          region: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // ======================
  // HITUNG STATISTIK
  // ======================
  const totalSubmissions = user.submissions.length;
  const totalPoints = user.totalPoint;
  const totalWeight = user.submissions.reduce(
    (acc, submission) => acc + submission.weight,
    0
  );

  const pendingSubmissions = user.submissions.filter(
    (s) => s.status === "PENDING"
  );
  const verifiedSubmissions = user.submissions.filter(
    (s) => s.status === "VERIFIED"
  );
  const rejectedSubmissions = user.submissions.filter(
    (s) => s.status === "REJECTED"
  );

  return (
    <div className="space-y-6">
      <WargaHeader
        name={user.name}
        regionName={user.region?.name}
      />

      <WargaStats
        totalPoints={totalPoints}
        totalSubmissions={totalSubmissions}
        totalWeight={totalWeight}
        pendingCount={pendingSubmissions.length}
      />

      <WargaStatusCard
        verifiedCount={verifiedSubmissions.length}
        pendingCount={pendingSubmissions.length}
        rejectedCount={rejectedSubmissions.length}
        total={totalSubmissions}
      />

      <WargaRecentSubmissions submissions={user.submissions} />

      <WargaProfileCard
        name={user.name}
        email={user.email}
        role={user.role}
        regionName={user.region?.name}
        createdAt={user.createdAt}
      />
    </div>
  );
}