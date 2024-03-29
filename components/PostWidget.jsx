import { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    slug
      ? getSimilarPosts(categories, slug).then((result) =>
          setRelatedPosts(result)
        )
      : getRecentPosts().then((result) => setRelatedPosts(result))
  }, [slug])

  // console.log(relatedPosts)

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.length > 0 ? (
        relatedPosts.map((post) => (
          <div key={post.title} className='flex items-center w-full mb-8'>
            <div className='w-16 flex-none'>
              <img
                alt={post.title}
                height={60}
                width={60}
                className='align-middle rounded-lg'
                src={post.featuredImage.url}
              />
            </div>
            <div className='flex-grow ml-4'>
              <p className='text-gray-500 font-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link
                key={post.title}
                href={`/post/${post.slug}`}
                className='text-md'
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className='text-gray-500'>None at this time</p>
      )}
    </div>
  )
}

export default PostWidget
