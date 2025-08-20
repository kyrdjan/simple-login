// Marimon, Kyr Djan R.
// IT101 - DL1

'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let hasError = false
    setUsernameError(null)
    setPasswordError(null)

    // basic client-side validation
    if (!username.trim()) {
      setUsernameError("Username is required")
      hasError = true
    }
    if (!password.trim()) {
      setPasswordError("Password is required")
      hasError = true
    }

    if (hasError) {
      return
    }

    setLoading(true)
    try {

      if (username || password) {
        setUsernameError(null)
        setPasswordError(null)
      }


      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, action: "login" })

      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login failed")
      else{
        setSuccess(true);
        setTimeout(() => { // for effects
          router.push(`/dashboard?username=${encodeURIComponent(username)}`);
        }, 1500);
      }
    } catch (err: any) {
      setUsernameError(err.message)
      setPasswordError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      noValidate
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your credentials below to login
        </p>
      </div>

      <div className="grid gap-6">
        <div className="relative grid gap-2">
        <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (usernameError) setUsernameError(null)
            }}
            aria-invalid={!!usernameError}
            className="aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          />
          {usernameError && (
            <p className="absolute text-red-500 text-sm top-full left-0">
              {usernameError}
            </p>
          )}
        </div>

        <div className="relative grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgotpassword"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (passwordError) setPasswordError(null)
            }}
            aria-invalid={!!passwordError}
            className="aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          />
          {passwordError && (
            <p className="absolute text-red-500 text-sm top-full left-0">
              {passwordError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full mt-1.5",
            success  && "bg-green-500 hover:bg-green-600 text-white"
          )}
          disabled={loading || success}
        >
        {loading ? "Logging in..." : success ? "Success!" : "Login"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
