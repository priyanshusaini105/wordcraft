import { Footer, Navbar } from '@/components'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Poppins } from 'next/font/google'
import Head from 'next/head'
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700','800','500']
})
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito.variable + " font-poppins " + poppins.variable}>
      <Head>
        <title>WordCraft | Create & Connect</title>
      </Head>
      <Navbar/>
      <main className={" pt-[3.32rem] font-poppins text-text "}>
        <Component {...pageProps} />
      </main>
      <Footer/>
    </div>
  )
}
