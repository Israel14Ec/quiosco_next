import OrderSidebar from '@/components/order/OrderSidebar';
import OrderSummary from '@/components/order/OrderSummary';
import ToastNotification from '@/components/ui/ToastNotification';
import React from 'react'

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    
    return (
        <>
            <div className=' md:flex'>
                <OrderSidebar   />
                {/*flex-1 utiliza todo el espacio disponible*/}
                <main className=' md:flex-1 md:h-screen md:overflow-y-scroll p-5'>
                    { children }
                </main>

                <OrderSummary/>
            </div>

            <ToastNotification/>
        </>
    )
  }
  