import { contact, navLinks } from "@/lib/data";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Wordmark } from "./Wordmark";

/** Final black band: booking call-to-action flowing into the footer. */
export function CtaFooter() {
  return (
    <div className="bg-ink text-paper">
      <section className="container-page py-28 md:py-44">
        <Reveal>
          <p className="eyebrow text-white/50">Your stay</p>
          <h2 className="mt-8 max-w-[12ch] font-display text-[clamp(3.25rem,9vw,9rem)] font-light leading-[0.9] tracking-[-0.03em]">
            Your next stay starts <em className="italic">here.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.15}
          className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-sm text-base leading-relaxed text-white/65">
            Find a space that fits the way you want to live.
          </p>
          <ButtonLink
            href="#apartments"
            variant="inverse"
            size="lg"
            arrow="right"
            className="self-start md:self-auto"
          >
            Explore apartments
          </ButtonLink>
        </Reveal>
      </section>

      <footer
        id="contact"
        className="container-page border-t border-white/15 pt-16 pb-10 md:pt-20"
      >
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-4xl" />
            <p className="mt-4 text-sm text-white/60">
              Modern apartments in Rwanda.
            </p>
          </div>

          <FooterColumn
            title="Navigate"
            className="md:col-span-2 md:col-start-7"
          >
            {navLinks.map((l) => (
              <li key={l.href}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="md:col-span-2">
            <li>
              <FooterLink href={contact.mapsUrl} external>
                {contact.street}, {contact.area}
                <br />
                {contact.location}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={contact.phoneHref}>
                {contact.phone}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={`mailto:${contact.email}`}>
                {contact.email}
              </FooterLink>
            </li>
          </FooterColumn>

          <FooterColumn title="Follow" className="md:col-span-2">
            <li>
              <FooterLink href={contact.instagram} external>
                Instagram
              </FooterLink>
            </li>
            <li>
              <FooterLink href={contact.whatsapp} external>
                WhatsApp
              </FooterLink>
            </li>
          </FooterColumn>
        </div>

        {/* Oversized wordmark — an editorial sign-off */}
        <p
          aria-hidden
          className="mt-20 select-none font-display text-[clamp(5rem,24vw,22rem)] font-light leading-[0.8] tracking-[-0.05em] text-white/[0.07]"
        >
          5 N<em className="italic">&amp;</em>M
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© 2026 5N&amp;M Apartments. All rights reserved.</p>
          <p>Kigali, Rwanda</p>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="eyebrow text-white/40">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-white/80 underline decoration-white/0 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
    >
      {children}
    </a>
  );
}
