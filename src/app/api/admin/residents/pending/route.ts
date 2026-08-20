import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pending = await prisma.user.findMany({
    where: { role: "RESIDENT", isApproved: false },
    select: { id: true, name: true, email: true, flatNumber: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(pending);
}