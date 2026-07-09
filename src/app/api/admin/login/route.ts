import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../../../lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionToken = process.env.ADMIN_SESSION_TOKEN;

    if (!adminEmail || !adminPassword || !sessionToken) {
      return NextResponse.json(
        { error: "Acesso administrativo não configurado." },
        { status: 500 },
      );
    }

    const isValidLogin = email === adminEmail && password === adminPassword;

    if (!isValidLogin) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erro ao fazer login." },
      { status: 500 },
    );
  }
}
