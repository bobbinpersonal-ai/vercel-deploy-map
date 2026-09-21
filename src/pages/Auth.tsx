import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import { ArrowRight, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps { redirectAfterAuth?: string }

function resolveRedirect(returnTo: string | null, fallback = "/dashboard") {
  return returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : fallback;
}

export default function AuthPage({ redirectAfterAuth = "/dashboard" }: AuthProps) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = resolveRedirect(params.get("returnTo"), redirectAfterAuth);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate(redirect, { replace: true });
  }, [authLoading, isAuthenticated, navigate, redirect]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await signIn(mode === "signUp" ? "signUp" : "signIn", new FormData(event.currentTarget));
      navigate(redirect, { replace: true });
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not sign you in. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f0e9] px-5 py-10 text-[#252523]">
      <Card className="w-full max-w-md border-[#252523]/15 bg-[#ebe7de] shadow-none">
        <CardHeader className="text-center">
          <button onClick={() => navigate("/")} className="mx-auto mb-4" aria-label="Back to LoveMeAfter home">
            <img src={logo} alt="LoveMeAfter" width={60} height={60} className="rounded-xl" />
          </button>
          <CardTitle className="font-serif text-3xl">{mode === "signIn" ? "Welcome back" : "Create your account"}</CardTitle>
          <CardDescription>Access the LoveMeAfter operations workspace.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <label className="block text-sm font-medium">Email
              <span className="relative mt-1.5 block"><Mail className="absolute left-3 top-3 size-4 text-[#9b9990]" /><Input name="email" type="email" required placeholder="you@example.com" className="pl-9" disabled={isSaving} /></span>
            </label>
            <label className="block text-sm font-medium">Password
              <span className="relative mt-1.5 block"><LockKeyhole className="absolute left-3 top-3 size-4 text-[#9b9990]" /><Input name="password" type="password" minLength={6} required placeholder="At least 6 characters" className="pl-9" disabled={isSaving} /></span>
            </label>
            {error && <p className="text-sm text-red-700">{error}</p>}
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button type="submit" disabled={isSaving} className="w-full rounded-full bg-[#252523] text-[#f3f0e9] hover:bg-[#454541]">
              {isSaving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <ArrowRight className="mr-2 size-4" />}
              {mode === "signIn" ? "Sign in" : "Create account"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => { setMode(mode === "signIn" ? "signUp" : "signIn"); setError(null); }}>
              {mode === "signIn" ? "Need an account? Create one" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
