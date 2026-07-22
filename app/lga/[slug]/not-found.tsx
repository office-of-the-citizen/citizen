import Link from "next/link";

import { Icon } from "@/presentation/icons/Icon";

export default function LgaNotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-surface-sunken px-8 pb-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon name="pin" size={26} />
      </span>
      <h1 className="mt-4 text-lg font-bold text-ink">No record at this address</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        This address doesn&rsquo;t match any Local Government in the constitutional record.
      </p>
      <Link
        href="/explore"
        className="mt-5 rounded-chip bg-primary px-5 py-2.5 text-sm font-bold text-white"
      >
        Explore Nigeria
      </Link>
    </div>
  );
}
