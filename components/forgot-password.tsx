// Marimon, Kyr Djan R.
// IT101 - DL1

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function ForgotPassword({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "New Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm New Password is required";
    if (password && confirmPassword && password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // stop if errors exist

    setLoading(true);

    try {
        // Make API call
        const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, action: "change" })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Signup failed");
        else{
        const message = "Password changed successfully!"
        setSuccess(true);
        setTimeout(() => { // for effects
           router.push(`/success_signup?message=${encodeURIComponent(message)}`);
        }, 1500);
      }

    } catch (err: any) {
        setErrors({ general: err.message });
    } finally {
        setLoading(false);
    }
    };


  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      noValidate
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Change old password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          hassle-free!
        </p>
      </div>

      <div className="grid gap-6">
        <div className="relative grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
            }}
            placeholder="Enter your username"
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="absolute top-full left-0 text-red-500 text-sm">
              {errors.username}
            </p>
          )}
        </div>

        <div className="relative grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="Enter your new password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="absolute top-full left-0 text-red-500 text-sm">
              {errors.password}
            </p>
          )}
        </div>

        <div className="relative grid gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword)
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
            placeholder="Confirm your new password"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="absolute top-full left-0 text-red-500 text-sm">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className={cn(
            "w-full mt-1.5",
            success  && "bg-green-500 hover:bg-green-600 text-white"
          )}
          disabled={loading || success}
        >
        {loading ? "Confirming..." : success ? "Success!" : "Login"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </form>
  );
}
