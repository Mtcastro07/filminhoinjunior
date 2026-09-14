"use client";
import api from "@/services/api";
// import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
// TODO: Replace with signOut from next-auth/react

export default function useLogout() {
  // const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post("/account/logout"),
    onSettled: () => {
      // logout();
      router.push("/");
    },
  });
}
