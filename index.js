import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchUsers } from '@/network/network';

export default function Home({ page }) {
  const router = useRouter();
  const { data, isLoading } = useQuery(['users', page], () => fetchUsers(page), {
    keepPreviousData: true,
  });

  const handlePagination = (nextPage) => {
    router.push(`/?page=${nextPage}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Users - Page {page}</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            {user.name}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handlePagination(page - 1)} disabled={page <= 1}>Previous</button>
        <button onClick={() => handlePagination(page + 1)} style={{ marginLeft: '10px' }}>Next</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const page = parseInt(context.query.page) || 1;

  await queryClient.prefetchQuery(['users', page], () => fetchUsers(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      page,
    },
  };
}
