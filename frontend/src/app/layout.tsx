import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'UseTrack - Personal Consumption & Item Lifecycle Tracking',
  description: 'Track your spending and items intelligently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
