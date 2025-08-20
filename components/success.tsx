// Marimon, Kyr Djan R.
// IT101 - DL1

"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

export function Success() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const router = useRouter();

    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <div className="text-center text-2xl p-4 md:p-8 max-w-sm w-full font-bold">
                {message}
            </div>
            <Button
                type="button"
                className="w-40"
                onClick={() => router.push("/login")} 
                >
                Go to Login
            </Button>

        </div>
    )
}
