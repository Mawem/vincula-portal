import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency }  from "../utils/currencyUtils";

interface BalanceProps {
  store_name: string;
  balance: number;
  is_payout_pending: boolean;
}

interface CardBalanceProps {
  balance: BalanceProps;
}

export default function CardBalance({ balance }: CardBalanceProps) {
  return (
    <Card className="w-full m-1 border-2 border-[#804982] bg-[#f6eff8]">
      <CardHeader>
        <CardTitle>{balance.store_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            Balance: {formatCurrency(balance.balance)} Gs.
          </p>
          <p className="text-sm text-right">
            {balance.is_payout_pending ? 'Retiro solicitado' : 'Disponible para retiro'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
