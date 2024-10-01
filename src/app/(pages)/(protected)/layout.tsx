'use client';
import Navbar from '@/app/_components/navbar';
import Sidebar from '@/app/_components/sidebar';
import { persistor, store } from '@/app/_store';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

type TPropsProtectedLayout = Readonly<{
  children: React.ReactNode;
}>;

const ProtectedLayout = (props: TPropsProtectedLayout) => {
  const { children } = props;
  const activeSegment = useSelectedLayoutSegment();

  console.log(' activeSegment: ', activeSegment);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className="w-full flex max-h-screen relative ">
          {activeSegment !== 'profile' && <Sidebar />}
          <div className="flex-grow relative min-h-full ">
            <Navbar />
            <div className="flex-grow min-h-[calc(100%-5rem)] max-h-[calc(100%-5rem)] bg-background p-2 md:p-8  overflow-y-scroll">
              {children}
            </div>
          </div>
        </main>
      </PersistGate>
    </Provider>
  );
};

export default ProtectedLayout;
