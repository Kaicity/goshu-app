import React from "react";
import Link from "next/link";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <h1 className="text-4xl font-bold mb-4 text-foreground">
      404 - Page Not Found
    </h1>
    <p className="mb-6 text-muted-foreground">
      The page you are looking for does not exist.
    </p>
    <Link href="/" passHref>
      <span className="inline-block px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
        Go back home
      </span>
    </Link>
  </div>
);

export default NotFoundPage;
