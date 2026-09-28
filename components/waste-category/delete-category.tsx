"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteWasteCategory } from "@/actions/waste-category.action";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  id: string;
  name: string;
};

export default function DeleteCategory({
  id,
  name,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteWasteCategory(id);

      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600">
  <Trash2 size={18} />
</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus Jenis Sampah
          </AlertDialogTitle>

          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus
            <span className="font-semibold">
              {" "}
              {name}
            </span>
            ?
            <br />
            <br />
            Data yang sudah dihapus tidak dapat
            dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={pending}
            className="bg-red-600 hover:bg-red-700"
          >
            {pending ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}