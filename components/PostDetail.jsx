import moment from 'moment'
import getContentFragment from '../services/rtfUtility'

const PostDetail = ({ post }) => {
  // console.log(post.content.raw.children)
  // console.log(post.content.raw.children[1])
  // console.log(post.content.raw.children[15])

  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-2 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top h-full w-full rounded-t-lg'
        />
      </div>
      <div className='px-4 lg:px-0 text-sm'>
        <div className='flex items-center mb-8 w-full'>
          <div className='flex items-center mb-4 lg:mb-0'>
            <img
              alt={post.author.name}
              height='40px'
              width='40px'
              className='align-middle rounded-full'
              src={post.author.photo.url}
            />
            <p className='inline align-middle text-gray-700 ml-3 text-lg'>
              {post.author.name}
            </p>
          </div>
          <div className='text-sm text-gray-700 ml-auto mb-3.5 xs:w-full pl-1  pr-2'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 inline mr-2 text-pink-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <span style={{ minWidth: '82px' }}>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
        </div>
        <h1 className='mb-8 text-3xl font-semibold text-center'>
          {post.title}
        </h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((obj, itemIndex) =>
            getContentFragment(itemIndex, obj.text, obj)
          )

          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail
