import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function isAuthenticated(req) {
  const session = await getServerSession(authOptions);
  return session ? session.user.id : null;
}

// Get User's To-Dos
export async function GET(req) {
  const userId = await isAuthenticated(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const todos = await prisma.todo.findMany({ where: { userId } });
  return Response.json(todos);
}

// Add a To-Do
export async function POST(req) {
  const userId = await isAuthenticated(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  const newTodo = await prisma.todo.create({
    data: { title, userId },
  });
  return Response.json(newTodo);
}

// Update a To-Do
export async function PUT(req) {
  const userId = await isAuthenticated(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id, completed } = await req.json();
  const updatedTodo = await prisma.todo.update({
    where: { id, userId },
    data: { completed },
  });
  return Response.json(updatedTodo);
}

// Delete a To-Do
export async function DELETE(req) {
  const userId = await isAuthenticated(req);
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.todo.delete({ where: { id, userId } });
  return Response.json({ message: "Deleted" });
}
