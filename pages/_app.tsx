import { Navbar } from '@/components'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Poppins } from 'next/font/google'
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin']
})
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className={nunito.variable + " pt-[3.32rem] font-poppins text-text " + poppins.variable}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
