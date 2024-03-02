import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <body>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
      
    </html>
  );
}
