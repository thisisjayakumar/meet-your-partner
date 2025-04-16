import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/global.css';

function MyApp({ Component, pageProps }) {
  // Create a new QueryClient for every server-side render
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  useEffect(() => {
    // Import Bootstrap JS on the client side only
    import('bootstrap/dist/js/bootstrap.bundle.min.js'); // Use bundle to include Popper.js
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState || null}>
        <Component {...pageProps} />
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;