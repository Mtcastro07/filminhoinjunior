"use client";
import api from "@/services/api";
import {signOut} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post("/account/logout"),
    onSettled: async () => {
      await signOut({ redirect: false });
      router.push("/");
    },
  });
}
