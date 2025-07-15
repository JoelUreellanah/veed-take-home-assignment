import Link from 'next/link';

export default function Video404page() {
  return (
    <div className="p-8 text-center">
      <h1 className="p-4">Video not found.</h1>
      <p className="mt-2">
        Please check your request, it&apos;s possible that video you requested
        was already moved or deleted.
      </p>
      <Link href="/" className="text-accent">
        Return to the main page
      </Link>
    </div>
  );
}
