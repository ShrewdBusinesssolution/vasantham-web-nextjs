"use client"
import ProfileService from '@/app/services/api-services/profile-service';
import { ProductCard } from '@/app/utility/components/utility-components'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu';

const Favourite = () => {
  const [wishlist, setwishList] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false)
  const [page, setPage] = useState(1);
  const [PaginationData, setPaginationData] = useState({})
  useEffect(() => {
    if (wishlist.length === 0) {
      getWishlistData(1);
    }
  }, []);


  const getWishlistData = async (page, fromPageination = false) => {
    try {

      if (fromPageination) {
        setLoadMore(true)
      } else {
        setLoading(true)
      }

      const response = await ProfileService.getWishList(page);
      if (response.status) {
        if (Array.isArray(response.data)) {
          setwishList([]);
        } else {
          if (fromPageination) {
            setwishList(prevData => [...prevData, ...response.data.wishlists]);
          } else {
            setwishList(response.data.wishlists);
          }

          setPage(response.data.pagination.current_page)
          setPaginationData(response.data.pagination)
        }
      }
    } catch (error) {
      const message = error?.response?.data?.message ?? error.message;
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
        !loading && wishlist.length !== 0 ?
          <main>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
              {wishlist.map((item, index) => (
                <ProductCard key={index} product={item} homePage={true} />

              ))}
            </div>
            {PaginationData?.total_pages > 1 && PaginationData?.total_pages !== page ?
              <div className="flex justify-center py-5">
                <Button onClick={() => { getWishlistData(page + 1, true) }} variant="primary" className="flex gap-2 items-center">
                  Load More
                  {loadMore ? <LuLoader2 className="w-4 h-4 text-white animate-spin" />
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
        <Image src={'/assets/images/fav-empty.png'} width={200} height={200} alt='empty image' className='h-[200px] w-auto' />
        <div className='flex flex-col items-center gap-5'>
          <p className='text-center'>You haven&apos;t added any favorites yet. Start exploring and add your top picks!</p>
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

export default Favourite