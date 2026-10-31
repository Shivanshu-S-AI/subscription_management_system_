import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ROLE_DESTINATIONS, type UserRole } from "@/lib/constants/roles";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase environment variables are missing (e.g. during preliminary build), pass through
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Resolve user role if authenticated
  let userRole: UserRole = "customer";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role) {
      userRole = profile.role as UserRole;
    }
  }

  // 1. Protected Admin routes (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/internal-login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (userRole !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_DESTINATIONS[userRole] || "/portal";
      return NextResponse.redirect(url);
    }
  }

  // 2. Protected Staff routes (/staff/*)
  if (pathname.startsWith("/staff")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/internal-login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (userRole !== "staff" && userRole !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }
  }

  // 3. Protected Customer Portal routes (/portal/*)
  if (pathname.startsWith("/portal")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // 4. Auth routes: redirect already-logged-in users to their destination
  if (pathname === "/login" || pathname === "/signup") {
    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_DESTINATIONS[userRole] || "/portal";
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/internal-login") {
    if (user && (userRole === "admin" || userRole === "staff")) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_DESTINATIONS[userRole];
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
