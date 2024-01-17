'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import authConfig from '../../auth.config'
import { TypographyH1, TypographyP } from '../../components/atoms/Typography'
import { Button } from '@/components/ui/button'

const Page = () => {
  const { providers } = authConfig
  const { data: session } = useSession()

  if (session) {
    return redirect('/')
  }

  return <div className={'container relative h-dvh flex-col items-center justify-center'}>
    <div className={'lg:p-8 p-2'}>
      <div className={'mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'}>
        <div className="flex flex-col space-y-2 text-center">
          <TypographyH1 className="text-2xl font-semibold tracking-tight" text={'Create an account'}/>
          <TypographyP className="text-sm text-muted-foreground"
                       text={'Enter your email below to create your account'}/>
        </div>
        <div className="grid gap-6">
          <form>
            <div className="grid gap-2">
              <div className="grid gap-1"><label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                htmlFor="email">Email</label><input disabled={true}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="email" placeholder="name@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off"
                type="email"/></div>
              <Button variant={'ghost'}
                className="disabled inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Not available for now
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span
              className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
          </div>
          {providers &&
            // Ripped off from next-auth signin page
            Object.values(providers).map(provider => (
              <div key={provider.name} style={{ marginBottom: 0 }}>
                <Button className={'flex w-full gap-4 border border-input'} variant={'ghost'} onClick={() => signIn(provider({}).id)} >
                  {provider({}).style?.logo && (
                    <img
                      loading="lazy"
                      height={24}
                      width={24}
                      id="provider-logo"
                      src={'https://authjs.dev/img/providers' + provider({}).style?.logo}
                    />
                  )}
                  {provider({}).style?.logoDark && (
                    <img
                      loading="lazy"
                      height={24}
                      width={24}
                      id="provider-logo-dark"
                      src={'https://authjs.dev/img/providers' + provider({}).style?.logoDark}
                    />
                  )}
                  <span>Sign in with {provider({}).name}</span>
                </Button>
              </div>
            ))}
        </div>
        <TypographyP className="px-8 text-center text-sm text-muted-foreground" text={''}>By clicking continue, you
          agree to our <Link
            className="underline underline-offset-4 hover:text-primary" href="/terms">Terms of Service</Link> and <a
            className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy
            Policy</a>.</TypographyP>
      </div>
    </div>
  </div>
}

export default Page
