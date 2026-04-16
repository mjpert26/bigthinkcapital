import type { Metadata } from 'next';
import './globals.css';
import { PostsProvider } from '@/lib/PostsContext';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: 'Big Think Capital | Small Business Funding Made Simple',
  description: 'Get the business funding you need with fast approvals, flexible terms, and multiple funding options. Over $500M funded for 10,000+ businesses.',
  keywords: 'small business funding, business loans, SBA loans, merchant cash advance, equipment financing, business line of credit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PostsProvider>
            {children}
          </PostsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
