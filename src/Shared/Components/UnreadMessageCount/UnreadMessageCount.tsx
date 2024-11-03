/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useGlobalContext } from '@/Shared/Context/GlobalContext';
import { apiUrls } from '@/Shared/Tools';

interface Props {
  session: any;
}

const UnreadMessageCount = ({ session }: Props) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    fetchUnreadMessages();
  }, [session]);

  const fetchUnreadMessages = async () => {
    try {
      const res = await fetch(apiUrls.unReadMessagesCount);

      if (res.status === 200) {
        const data = await res.json();
        setUnreadCount(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};
export default UnreadMessageCount;
