
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name:{label:"Enter your Name", type:"text"},
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Login Type", type: "hidden" } // Added to differentiate login type
      },
      async authorize(credentials) {
        try {
          if (credentials.loginType === 'login') {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
            const user = await res.json();
            if (!user.status) {
              throw new Error(user.message);
            }
            return user.data; // Return existing user data for session creation

            
          } else if (credentials.loginType === 'register') {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                mobile_number: null,
                password: credentials.password,
              }),
            });
            const user = await res.json();
            if (!user.status) {
              throw new Error(user.message);
            }
            return user.data; // Return existing user data for session creation



          }

        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error)
          throw new Error(error.message || "Something went wrong during authentication");

        }

        // try {
        //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/login`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //       email: credentials.email,
        //       password: credentials.password,
        //     }),
        //   });

        //   const user = await res.json();
        //   if (!user.status) {
        //     throw new Error(user.message);
        //   }
        //   // Ensure that the `user` object is valid and contains the expected properties
        //   return user.data;
        // } catch (error) {
        //   throw new Error(error.message || "Something went wrong during authentication");
        // }
      }
    }),
  ],

  pages: {
    signIn: '/auth-error',
    signOut: '/',
    error: '/auth-error',
  },

  // Callbacks
  callbacks: {
    // Callback after sign-in
    async signIn({ user, account, profile, email, credentials }) {
      // You can add custom logic here, for example:
      if (account.provider === "google") {
        // Logic after Google sign-in
        // user.token = 12344567890;
      }
      if (user) {
        // Return true to allow sign-in
        return true;
      } else {
        // Return false to deny sign-in
        return false;
      }
    },

    // Redirect after sign-in
    async redirect({ url, baseUrl }) {
      // Redirect to a custom URL after sign-in
      return baseUrl; // You can customize this, e.g., return '/dashboard'
    },

    // Handle session data
    async session({ session, token, user }) {
      // session.user.id = token.id;
      // session.user.name = token.name;
      session.user.token = token.token; // Include your custom token
      return session;
    },

    // Handle JWT token
    async jwt({ token, user, account }) {
      if (user) {
        // Store user details in the JWT token
        // token.id = user.customer_id;
        // token.name = user.name;
        token.token = user.token; // Example: storing custom token from API
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
