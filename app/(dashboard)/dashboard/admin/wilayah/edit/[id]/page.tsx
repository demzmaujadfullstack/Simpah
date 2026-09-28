import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import RegionForm from "@/components/region/region-form";

export default async function EditRegionPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const region = await prisma.region.findUnique({
    where: {
      id,
    },
  });

  if (!region) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <RegionForm
        region={{
          id: region.id,
          name: region.name,
          district: region.district,
        }}
      />
    </div>
  );
}