// Marimon, Kyr Djan R.
// IT101 - DL1

"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Welcome() {
    const searchParams = useSearchParams()  
    const username = searchParams.get("username")
    const router = useRouter()

    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <div className="text-center text-2xl p-4 md:p-8 max-w-sm w-full font-bold">
                Welcome, {username}.
            </div>
            <Button
                type="button" 
                className="w-40"
                onClick={() => router.push("/login")} 
                >
                Log out
            </Button>

        </div>
    )
}
