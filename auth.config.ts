import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

const authConfig: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Custom',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req) {
        try {
          if (!credentials) return null;
          const email = credentials.email;
          const password = credentials.password;
          const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: `
                mutation Login($email: String!, $password: String!) {
                  login(data: { email: $email, password: $password }) {
                    accessToken
                    refreshToken
                    user {
                      firstname
                      email
                      id
                      role
                      lastname
                      companyId
                    }
                  }
                }
              `,
              variables: {
                email,
                password
              }
            })
          });

          const user = await response.json();

          if (user.errors) {
            throw new Error(user?.errors?.message);
          } else {
            console.log('user', user);
            return user;
          }
        } catch (errors) {
          return null;
        }
      }
    })
  ],
  secret: process.env.JWT_ACCESS_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.data = user);
      return token;
    },
    async session({ session, token }) {
      session = token as any;
      return session;
    }
  },

  pages: {
    signIn: '/login'
  }
};

export default authConfig;
