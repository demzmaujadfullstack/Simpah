"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Role, Region } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createUserSchema,
  updateUserSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from "@/lib/validations/user";

import {
  createUser,
  updateUser,
} from "@/actions/user.action";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  user?: {
    id: string;
    name: string;
    email: string;
    role: Role;
    regionId: string | null;
  };

  regions: Region[];
};

export default function UserForm({
  user,
  regions,
}: Props) {
  const router = useRouter();

  const [loading, startTransition] =
    useTransition();

  const isEdit = !!user;

  const form = useForm<
    CreateUserSchema | UpdateUserSchema
  >({
    resolver: zodResolver(
      isEdit
        ? updateUserSchema
        : createUserSchema
    ),

    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? Role.WARGA,
      regionId: user?.regionId ?? undefined,
    },
  });

  function onSubmit(
    values:
      | CreateUserSchema
      | UpdateUserSchema
  ) {
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateUser(user.id, {
            name: values.name,
            email: values.email,
            role: values.role,
            regionId:
              values.regionId || null,
          });
        } else {
          const createValues =
            values as CreateUserSchema;

          await createUser({
            name: createValues.name,
            email: createValues.email,
            password:
              createValues.password,
            role: createValues.role,
            regionId:
              createValues.regionId ||
              null,
          });
        }

        router.push(
          "/dashboard/admin/users"
        );

        router.refresh();
      } catch (err) {
        alert(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan"
        );
      }
    });
  }

  return (
    <div className="rounded-2xl border bg-card p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Lengkap
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Nama user"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {!isEdit && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>

                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem
                      value={Role.ADMIN}
                    >
                      ADMIN
                    </SelectItem>

                    <SelectItem
                      value={Role.PETUGAS}
                    >
                      PETUGAS
                    </SelectItem>

                    <SelectItem
                      value={Role.WARGA}
                    >
                      WARGA
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="regionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Wilayah
                </FormLabel>

                <Select
                  value={
                    field.value ??
                    "__none__"
                  }
                  onValueChange={(value) =>
                    field.onChange(
                      value === "__none__"
                        ? null
                        : value
                    )
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Wilayah" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="__none__">
                      Tidak Ada
                    </SelectItem>

                    {regions.map(
                      (region) => (
                        <SelectItem
                          key={region.id}
                          value={
                            region.id
                          }
                        >
                          {region.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="w-full"
            type="submit"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Update User"
              : "Tambah User"}
          </Button>
        </form>
      </Form>
    </div>
  );
}