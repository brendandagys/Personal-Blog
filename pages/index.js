import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components'

const posts = [
  {
    title: 'Test-Driven Development',
    excerpt: 'Learn why test-driven development is so powerful.',
  },
  {
    title: 'How to Begin Learning Web Development',
    excerpt: 'How to effectively learn Web development.',
  },
]

export default function Home() {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>Brendan Dagys' Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          {posts.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
