import ProfileService from '@/app/services/api-services/profile-service';
import { ProductCard } from '@/app/utility/components/utility-components';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu';
import { toast } from 'sonner';

const Courses = () => {

  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false)
  const [page, setPage] = useState(1);
  const [PaginationData, setPaginationData] = useState({})

  useEffect(() => {
    if (courseList.length === 0) {
      getpurchasedCourse(1);
    }
  }, []);


  const getpurchasedCourse = async (page, fromPageination = false) => {
    try {

      if (fromPageination) {
        setLoadMore(true)
      } else {

        setLoading(true)
      }

      const response = await ProfileService.getCouorseList(page);
      if (response.status) {
        if (Array.isArray(response.data)) {
          setCourseList([]);
        } else {
          if (fromPageination) {
            setCourseList(prevData => [...prevData, ...response.data.courses]);
          } else {
            setCourseList(response.data.courses);
          }

          setPage(response.data.pagination.current_page)
          setPaginationData(response.data.pagination)
        }
      }
    } catch (error) {
      const message = error?.response?.data?.message ?? error.message;
      toast.error(message, { position: "top-right", duration: 2000 })
    } finally {
      if (fromPageination) {
        setLoadMore(false)
      } else {
        setLoading(false)
      }
    }
  }

  return (
    (
      loading ?
        <Loading />
        :
        !loading && courseList.length !== 0 ?
          <main>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
              {courseList?.map((item, index) => (
                <ProductCard key={index} product={item} homePage={false} />
              ))}
            </div>
            {PaginationData?.total_pages > 1 && PaginationData?.total_pages !== page ?
              <div className="flex justify-center py-5">

                <Button onClick={() => { getpurchasedCourse(page + 1, true) }} variant="primary" className="flex gap-2 items-center">
                  Load More
                  {loadMore ? <LuLoader2 className="w-4 h-4x text-white animate-spin" />
                    : null}
                </Button>

              </div>
              : null}
          </main>
          :
          <EmptyHandling />
    )
  )
}


const EmptyHandling = () => {
  return (
    <div className='w-full grid place-items-center'>

      <div className='flex flex-col items-center gap-3  pt-20'>
        <Image src={'/assets/images/my-course-empty.png'} width={200} height={200} alt='empty course' className='h-[200px] w-auto' />
        <div className='flex flex-col items-center gap-5'>
          <p className='text-center'>You haven&apos;t completed any courses yet. Explore and finish a course to see it here!</p>
          <Link href={'/courses'}>
            <Button variant="primary" className="uppercase">
              Explore courses
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

const Loading = () => {
  return (
    <div className='grid place-items-center'>
      <LuLoader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  )
}



export default Courses