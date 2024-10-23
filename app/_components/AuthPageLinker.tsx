import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    text: string;
    link: string;
    linkText: string;
}

const AuthPageLinker = ({text, link, linkText}: Props) => {
  return (
    <div className="flex items-center">
      {text}
      <Link href={link}>
        <Button variant={"link"} className="px-1 py-0">
          {linkText}
        </Button>
      </Link>
    </div>
  );
};

export default AuthPageLinker;
