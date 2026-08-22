// Local-only auth stub — works without a Convex backend.
// Replace with the real hook once a Convex project is connected.

export function useAuth() {
  return {
    isLoading: false,
    isAuthenticated: true,
    user: { name: "Local Dev" },
    signIn: async (_method?: string, _formData?: FormData) => {},
    signOut: async () => {},
  };
}
