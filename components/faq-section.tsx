import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find answers to common questions about our platform
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                Creating an account is simple. Click on the "Register" button at the top right of the page, fill in your
                details, complete the verification process, and you're ready to start trading.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
              <AccordionContent>
                We accept a variety of payment methods including credit/debit cards, bank transfers, and various
                e-wallets. You can also deposit cryptocurrency directly from another wallet.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How secure is the platform?</AccordionTrigger>
              <AccordionContent>
                Security is our top priority. We employ industry-leading security measures including two-factor
                authentication, cold storage for the majority of assets, regular security audits, and advanced
                encryption protocols.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What are the trading fees?</AccordionTrigger>
              <AccordionContent>
                Our fee structure is competitive and transparent. Trading fees typically range from 0.1% to 0.5%
                depending on your trading volume and the specific market. You can view our complete fee schedule in the
                "Fees" section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I start trading?</AccordionTrigger>
              <AccordionContent>
                After creating and verifying your account, deposit funds using your preferred payment method. Navigate
                to the "Trade" section, select the market you want to trade, and place your order. We offer spot
                trading, margin trading, futures, and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Is my cryptocurrency insured?</AccordionTrigger>
              <AccordionContent>
                We maintain an insurance fund to protect user assets in case of security breaches. However, it's
                important to note that cryptocurrency investments are not typically covered by traditional financial
                insurance schemes like FDIC or SIPC.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
