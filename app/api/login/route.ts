// Marimon, Kyr Djan R.
// IT101 - DL1

import { NextResponse } from "next/server";

let users: { username: string; password: string }[] = [];

export async function POST(req: Request) {
  const { username, password, action } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  if (action === "signup") {
    if (users.find((u) => u.username === username)) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }
    users.push({ username, password });
    return NextResponse.json({ message: "Signup success", user: { username } });
  }

  if (action === "login") {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      return NextResponse.json({ message: "Login success", user: { username } });
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  }

  if (action === "change") {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.password = password;
    return NextResponse.json({ message: "Password changed successfully" });
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 });
}
