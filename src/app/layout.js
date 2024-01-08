import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header/page'
import { Nunito } from 'next/font/google'
import { Providers } from './redux/providers'
import PageLoader from './components/PageLoader'


const inter = Inter({ subsets: ['latin'] })

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Blogify homepage',
    template: "%s | blogify"
},
  description: 'blogify tech blogs',
}


export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
      <body className={font.className}>
        <Header/>
        <PageLoader>
        {children}
        </PageLoader>
        </body>
    </html>
    </Providers>
  )
}
