"use client"

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { LaserFlow } from "./LaserFlow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}
interface Buttons {
  primary?: Button;
  secondary?: Button;
}

interface HeroBasicProps {
  heading: React.ReactNode;
  description: React.ReactNode;
  buttons?: Buttons;
  image: Image;
  className?: string;
}

interface Hero115Props extends HeroBasicProps { }
type Props = Partial<Hero115Props>;

const defaultProps: Hero115Props = {
  heading: (
    <>
      One Platform for<br />
      Every HR Need
    </>
  ),
  description: (
    <>
      Arcenza brings people, processes, and productivity <br />
      together in one seamless experience.
    </>
  ),
  buttons: {
    primary: {
      text: "Take a Tour",
      url: "https://www.arcenza.com",
    },
    secondary: {
      text: "View GitHub",
      url: "https://www.arcenza.com",
    },
  },
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png",
    srcDark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png",
    alt: "Hero Image Placeholder",
  },
};

const Hero = (props: Props) => {
  const { heading, description, buttons, image, className } = {
    ...defaultProps,
    ...props,
  };

  const revealImgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', '-9999px');
      el.style.setProperty('--my', '-9999px');
    }
  };

  return (
    <section
      className={cn("relative overflow-hidden pt-52 md:pt-48 pb-32", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 -z-10 bg-[#050508] overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-28 md:bottom-36">
          <LaserFlow
            horizontalBeamOffset={0.06}
            verticalBeamOffset={0.015}
            color="#6398f5"
          />
          <img
            ref={revealImgRef}
            src="/hrms-hero.png"
            alt="Reveal effect background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block"
            style={{
              mixBlendMode: "lighten",
              opacity: 0.1,
              "--mx": "-9999px",
              "--my": "-9999px",
              WebkitMaskImage: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 80px, rgba(255,255,255,0.6) 180px, rgba(255,255,255,0.25) 280px, rgba(255,255,255,0) 360px)",
              maskImage: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 80px, rgba(255,255,255,0.6) 180px, rgba(255,255,255,0.25) 280px, rgba(255,255,255,0) 360px)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            } as React.CSSProperties}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col gap-5">
          <div className="relative isolate flex flex-col items-center md:items-start gap-5">
            <h1 className="mx-auto md:mx-0 max-w-xl text-center md:text-left text-5xl font-semibold tracking-tight text-pretty md:text-6xl lg:max-w-3xl lg:text-7xl">
              {heading}
            </h1>
            <p className="mx-auto md:mx-0 max-w-5xl text-center md:text-left text-lg text-balance text-foreground md:text-xl">
              {description}
            </p>
            <div className="flex flex-col items-center md:items-start gap-3 pt-3 pb-28">
              {buttons?.primary && (
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>
                    {buttons.primary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          {image.srcDark ? (
            <>
              <img
                src={image.src}
                alt={image.alt}
                className="mx-auto aspect-3/4 h-full max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top dark:hidden"
              />
              <img
                src={image.srcDark}
                alt={image.alt}
                className="mx-auto hidden aspect-3/4 h-full max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top dark:block"
              />
            </>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              className="mx-auto aspect-3/4 h-full max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top"
            />
          )}

          <div className="mx-auto w-full max-w-5xl mt-12 md:mt-16 flex flex-col gap-3 text-center md:text-left">
            <p className="text-sm md:text-base text-muted-foreground">
              Everything you need to manage your workforce:
            </p>
            {/* Mobile Marquee View */}
            <div className="w-full overflow-hidden relative md:hidden py-1 mask-marquee">
              <div className="flex w-max gap-6 animate-marquee">
                {/* First set */}
                <div className="flex items-center gap-6 text-sm font-semibold text-foreground">
                  <span>Employee Profiles</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Smart Payroll</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Time Tracking</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Leave Management</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Attendance Tracking</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>ATS</span>
                </div>
                {/* Duplicate set for looping */}
                <div className="flex items-center gap-6 text-sm font-semibold text-foreground select-none" aria-hidden="true">
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Employee Profiles</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Smart Payroll</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Time Tracking</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Leave Management</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>Attendance Tracking</span>
                  <span className="text-muted-foreground/30 select-none">·</span>
                  <span>ATS</span>
                </div>
              </div>
            </div>

            {/* Desktop Static List View */}
            <div className="hidden md:flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-sm md:text-base font-semibold text-foreground">
              <span>Employee Profiles</span>
              <span className="text-muted-foreground/30 select-none">·</span>
              <span>Smart Payroll</span>
              <span className="text-muted-foreground/30 select-none">·</span>
              <span>Time Tracking</span>
              <span className="text-muted-foreground/30 select-none">·</span>
              <span>Leave Management</span>
              <span className="text-muted-foreground/30 select-none">·</span>
              <span>Attendance Tracking</span>
              <span className="text-muted-foreground/30 select-none">·</span>
              <span>ATS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
