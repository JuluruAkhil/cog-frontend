import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Image Prediction App',
  description: 'Upload an image to get predictions using a public API.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}
