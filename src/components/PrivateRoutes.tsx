import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState, type JSX } from "react";

export function PrivateRoutes({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return null; // ou um loading spinner

  return session ? children : <Navigate to="/" replace />;
}
