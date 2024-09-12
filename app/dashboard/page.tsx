'use client'
import { Header } from "@/components/Header"
import { StatCard } from "@/components/StatCard"
import { TransactionsTable } from "@/components/TransactionsTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from 'react';
import apiStore from '@/app/api-service/apiStore';
import { getItem } from '@/utils/storageHandler';
import apiPayouts from "../api-service/apiPayouts"

export default function Dashboard() {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [closedTransactions, setClosedTransactions] = useState([]);
  const [commerce, setCommerce] = useState<any>();
  const [balance, setBalance] = useState({ amount: 0, is_payout_pending: false });

  useEffect(() => {
    const fetchBalance = async () => {
      if (!commerce) return;

      try {
        const response = await apiPayouts.getBalance();
        const filteredBalance = response.data.data.filter((it: any) => it.store_id === commerce.value)[0];
        setBalance(filteredBalance);
      } catch (error) {
        console.error('Error al obtener el balance:', error);
      }
    };

    fetchBalance();
  }, [commerce]);

  useEffect(() => {
    const storedCommerce = getItem('current_commerce');
    if (storedCommerce) {
      setCommerce(JSON.parse(storedCommerce));
    }
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!commerce) return;

      try {
        const activeTransactions = await apiStore.listTransactions(commerce, 'active');
        setPendingTransactions(activeTransactions.data.data.pending);

        const availableForPayout = await apiStore.listTransactions(commerce, 'available_for_payout');
        setAvailableTransactions(availableForPayout.data.data.unwithdrawn);

        const closedTrans = await apiStore.listClosedTransactions(commerce, '10', '');
        setClosedTransactions(closedTrans.data.data);
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    };

    fetchTransactions();
  }, [commerce]);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          <StatCard
            title="Balance"
            value='Gs. 1.000'
            change={balance.is_payout_pending ? 'Retiro solicitado' : 'Disponible para retiro'}
          />
          {/* <StatCard
            title=""
            value="+2350"
            change="+180.1% from last month"
            icon={Users}
          /> */}
        </div>
        <div className="grid gap-2 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
          <Tabs defaultValue="pendientes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
              <TabsTrigger value="disponibles">Disponibles</TabsTrigger>
              <TabsTrigger value="retirados">Retirados</TabsTrigger>
            </TabsList>
            <TabsContent value="pendientes">
              <TransactionsTable title="Pendientes" data={pendingTransactions} />
            </TabsContent>
            <TabsContent value="disponibles">
              <TransactionsTable title="Disponibles" data={availableTransactions} />
            </TabsContent>
            <TabsContent value="retirados">
              <TransactionsTable title="Retirados" data={closedTransactions} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
