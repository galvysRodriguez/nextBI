"use client";
import { useRouter, usePathname } from "next/navigation";

export const useParentRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirectToParent = () => {
    const parentPath = pathname.split("/").slice(0, -1).join("/");
    router.push(parentPath);
  };

  return { redirectToParent };
};
