import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import Posts from '../components/Posts';
import { getSlowPosts } from '../util/api';

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      {/* lazy loading with suspense */}
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

export async function loader() {
  return defer({ posts: getSlowPosts() });
  // wait the data are here with await
  return defer({ posts: await getSlowPosts() });
}
