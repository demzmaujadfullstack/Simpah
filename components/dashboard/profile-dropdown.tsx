"use client";

import { signOut, useSession } from "next-auth/react";

export default function ProfileDropdown() {

    const { data } = useSession();

    return (

        <div className="flex items-center gap-4">

            <div className="text-right">

                <h3 className="font-semibold">

                    {data?.user?.name}

                </h3>

                <p className="text-sm text-gray-500">

                    {data?.user?.role}

                </p>

            </div>

            <button

                onClick={() => signOut({ callbackUrl: "/login" })}

                className="rounded-lg bg-red-500 px-4 py-2 text-white"

            >

                Logout

            </button>

        </div>

    );

}