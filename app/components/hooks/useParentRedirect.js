"use client";
import { useRouter, usePathname } from "next/navigation";

export const useParentRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirectToParent = () => {
    const segments = pathname.split("/").filter(Boolean);
    const countBack = segments.includes("update") ? -2 : -1;
    const parentPath = "/" + segments.slice(0, countBack).join("/");
    router.push(parentPath || "/"); 
  };

  return { redirectToParent };
};
