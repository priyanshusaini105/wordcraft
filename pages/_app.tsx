import { Footer, Navbar } from '@/components'
import { ProfileProvider } from '@/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Poppins, Source_Serif_Pro } from 'next/font/google'
import Head from 'next/head'
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '500']
})
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const sourceSerifPro =Source_Serif_Pro({
  variable: '--font-sourceSerifPro',
  subsets: ['latin'],
  weight: ['200','300','400','600','700','900']
})




export default function App({ Component, pageProps }: AppProps) {

  return (
    <ProfileProvider >
      <div className={`${nunito.variable} font-poppins ${poppins.variable} ${sourceSerifPro.variable}`}>
        <Head>
          <title>WordCraft | Create & Connect</title>
        </Head>
        <Navbar />
        <main className={" pt-[3.32rem] font-poppins text-text "}>
          <ToastContainer
            transition={Flip} position='top-center' autoClose={2000}
          />

          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ProfileProvider>
  )
}
