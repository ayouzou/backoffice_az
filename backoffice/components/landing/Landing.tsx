import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BoltIcon, CoinsIcon, InfoIcon, MountainIcon, ShipIcon, ShoppingCartIcon, StoreIcon, TrendingUpIcon, UsersIcon } from "lucide-react"
const URL_IMAGE ='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlnaXRhbHxlbnwwfHwwfHx8MA%3D%3D'
export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          
          <img className="h-8 w-8" src="https://t4.ftcdn.net/jpg/03/65/41/97/360_F_365419751_lQbtNWpoYErBXjjwJP2ivh5FjvXmO6l0.jpg"/>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-3">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 bg-black text-white px-3 py-2 rounded-md" prefetch={false}>
            Login
          </Link>
          <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4 bg-black text-white px-3 py-2 rounded-md" prefetch={false}>
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Empower Your Business with Our AZ Platform
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your online operations, boost sales, and provide an exceptional customer experience with
                    our comprehensive platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src={URL_IMAGE}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Unlock the Power of Our Platform
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Streamline your online operations, boost sales, and provide an exceptional customer experience with
                  our comprehensive platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <StoreIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Online Store</h3>
                <p className="text-muted-foreground">
                  Easily create and manage your online store with our user-friendly interface.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <ShoppingCartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Inventory Management</h3>
                <p className="text-muted-foreground">
                  Keep track of your inventory and automate fulfillment processes.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <InfoIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Analytics and Reporting</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights into your business performance with our advanced analytics tools.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <ShipIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Shipping and Fulfillment</h3>
                <p className="text-muted-foreground">
                  Streamline your shipping and fulfillment processes with our integrated solutions.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <CoinsIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Payments and Checkout</h3>
                <p className="text-muted-foreground">Offer secure and seamless payment options to your customers.</p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <StoreIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Marketing and Promotions</h3>
                <p className="text-muted-foreground">Leverage our marketing tools to attract and retain customers.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Benefits</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Unlock Your Business Potential
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to help you streamline your operations, boost sales, and provide an
                  exceptional customer experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <BoltIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Increased Efficiency</h3>
                <p className="text-muted-foreground">
                  Streamline your operations and automate repetitive tasks to save time and resources.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <TrendingUpIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Boosted Sales</h3>
                <p className="text-muted-foreground">
                  Leverage our powerful marketing tools to attract and retain customers, driving more sales.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-2 bg-background p-6 rounded-lg shadow-sm">
                <UsersIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Enhanced Customer Experience</h3>
                <p className="text-muted-foreground">
                  Provide your customers with a seamless and engaging shopping experience, leading to increased loyalty
                  and satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Get Started</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Transforming Your Business Today
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up for our platform and unlock the power of e-commerce. Our team is here to guide you every step
                  of the way.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2" prefetch={false}>
                    Terms &amp; Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AZ Platform. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

