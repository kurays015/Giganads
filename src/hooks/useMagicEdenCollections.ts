import { useQuery } from "@tanstack/react-query";
import { Collection } from "@/types/collection";
import axios from "axios";

async function fetchCollections(
  walletAddress: `0x${string}` | undefined
): Promise<Collection[]> {
  if (!walletAddress) return [];
  const response = await axios.get(
    `https://api-mainnet.magiceden.dev/v3/rtp/monad-testnet/users/${walletAddress}/collections/v3?includeTopBid=false&includeLiquidCount=false&offset=0&limit=100`
  );
  return response.data as Collection[];
}

export function useMagicEdenCollections(
  walletAddress: `0x${string}` | undefined
) {
  return useQuery<Collection[], Error>({
    queryKey: ["magicEdenCollections", walletAddress],
    queryFn: () => fetchCollections(walletAddress),
    enabled: !!walletAddress,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });
}
