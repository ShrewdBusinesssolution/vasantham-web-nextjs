"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileService from "@/app/services/api-services/profile-service";
import { toast } from "sonner";
import { timeAgo } from "@/app/utility/helper";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";

const Notification = () => {

  const [notificationList, setNotificationList] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false)
  const [page, setPage] = useState(1);
  const [PaginationData, setPaginationData] = useState({})
  useEffect(() => {
    if (notificationList.length === 0) {
      getNotificationData(1);
    }
  }, []);


  const getNotificationData = async (page, fromPageination = false) => {
    try {

      if (fromPageination) {
        setLoadMore(true)
      } else {

        setLoading(true)
      }

      const response = await ProfileService.getNotificationList(page);
      if (response.status) {
        if (Array.isArray(response.data)) {
          setNotificationList([]);
        } else {
          if (fromPageination) {
            setNotificationList(prevData => [...prevData, ...response.data.list]);
          } else {
            setNotificationList(response.data.list);
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
        !loading && notificationList.length !== 0 ?
          <main>
            <div className="flex flex-col gap-5">
              {/* Map through notifications array */}
              {notificationList?.map((notification) => (
                <div
                  key={notification.id}
                  className="flex bg-[#f7f7f7]/80 p-5 gap-5 rounded-lg"
                >
                  <Image
                    src={'/assets/profile/icon.webp'}
                    alt="icon"
                    width={25}
                    height={25}
                    className="h-10 w-10 bg-white border p-2 aspect-square rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h5 className="font-medium text-[17px]">
                      {notification.title}
                    </h5>
                    <p className="text-[16px] text-[#737373]">
                      {notification.content}
                    </p>
                    <p className="font-medium text-[17px]">{timeAgo(notification.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
            {PaginationData?.total_pages > 1 && PaginationData?.total_pages !== page ?
              <div className="flex justify-center py-5">

                <Button onClick={() => { getNotificationData(page + 1, true) }} variant="primary" className="flex gap-2 items-center">
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
  );
};

const EmptyHandling = () => {
  return (
    <div className='w-full grid place-items-center'>

      <div className='flex flex-col items-center gap-3  pt-20'>
        <Image src={'/assets/images/notify-empty.png'} width={200} height={200} alt='empty notification' className='h-[200px] w-auto' />
        <div className='flex flex-col items-center gap-5'>
          <p className='text-center'>No notifications yet. Stay tuned for updates!</p>         
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

export default Notification;
