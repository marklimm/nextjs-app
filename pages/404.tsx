import Link from 'next/link'

const Custom404 = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl mb-2'>
          404 - Sorry, we could not find that page!
        </h1>

        <span className='mb-2'>
          Back to the&nbsp;
          <Link href={`/`}>
            <a>Home page</a>
          </Link>
        </span>

        <img
          src='/technical-difficulties.jpg'
          alt='Star Wars technical difficulties image'
          title='Star Wars technical difficulties image'
          className='w-2/3'
        />
      </div>
    </>
  )
}

export default Custom404
