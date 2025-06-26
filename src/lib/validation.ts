import { z } from "zod";

export const walletSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const validateWalletAddress = (address: string) => {
  return walletSchema.safeParse(address.trim()).success;
};

export type WalletAddress = z.infer<typeof walletSchema>;
