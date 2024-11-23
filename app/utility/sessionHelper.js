// utils/sessionHelper.js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

/**
 * Handles redirection based on session.
 * @param {string} redirectIfHasSession - Route to redirect if session exists.
 * @param {string} [redirectIfNoSession] - Route to redirect if no session (optional).
 * @returns {object|null} - Session object or null if no session.
 */
export async function checkSessionAndRedirect(redirectIfHasSession, redirectIfNoSession = null) {
  const session = await getServerSession(authOptions);

  if (session && redirectIfHasSession) {
    redirect(redirectIfHasSession);
  } else if (!session && redirectIfNoSession) {
    redirect(redirectIfNoSession);
  }

  return session;
}
