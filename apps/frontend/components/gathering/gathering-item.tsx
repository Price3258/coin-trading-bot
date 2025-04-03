import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "~/constants/url";

import { Gathering } from "~/types/gathering";

type Props = {
  item: Gathering;
};

export default function GatheringItem({ item }: Props) {
  const queryClient = useQueryClient();

  const { mutate: removeGathering, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/api/gathering/${item.market}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "제거 실패");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gathering"] });
    },
    onError: (err) => {
      alert("제거 실패: " + err.message);
    },
  });

  return (
    <li className="mb-3 flex items-center justify-between border-b py-2">
      <h3 className="font-medium text-gray-800">{item.market}</h3>
      <button
        onClick={() => removeGathering()}
        disabled={isPending}
        className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 disabled:opacity-50"
      >
        {isPending ? "제거 중..." : "제거"}
      </button>
    </li>
  );
}
