import { Phone } from "lucide-react";
import { Link } from "react-router";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/TopNav";

/** Sticky tap-to-call bar for phones — visible on every page while scrolling. */
export function BottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1c2620]/12 bg-white/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(28,38,32,.12)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        <a
          href={PHONE_HREF}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-[#175a3b] px-4 text-sm font-bold text-white"
        >
          <Phone className="size-4" />
          Call {PHONE_DISPLAY}
        </a>
        <Link
          to="/get-quote"
          className="flex min-h-12 flex-1 items-center justify-center rounded-md border border-[#175a3b]/35 bg-[#eaf2ed] px-4 text-sm font-bold text-[#14502f]"
        >
          Get My Price
        </Link>
      </div>
    </div>
  );
}
