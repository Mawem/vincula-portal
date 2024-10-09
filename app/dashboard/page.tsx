'use client'
import { Header } from "@/components/Header"
import { StatCard } from "@/components/StatCard"
import { TransactionsTable } from "@/components/TransactionsTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from 'react';
import apiStore from '@/app/api-service/apiStore';
import { getItem } from '@/utils/storageHandler';
import moment from 'moment';
import apiPayouts from "../api-service/apiPayouts"
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"


export default function Dashboard() {
  /* const session = getSession();
  if (!session) {
    redirect("/login");
  } */
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [closedTransactions, setClosedTransactions] = useState([]);
  const [commerce, setCommerce] = useState<any>();
  const [balance, setBalance] = useState({ balance: 0, is_payout_pending: false });
  const [payoutMtd, setPayoutMtd] = useState('');
  const [payRequested, setPayRequested] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat("es-Cl", {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(value);
  }

  useEffect(() => {
    const fetchBalance = async () => {
      if (!commerce) return;

      try {
        const response = await apiPayouts.getBalance();
        const filteredBalance = response.data.data.filter((it: any) => it.store_id === commerce)[0];
        setPayoutMtd(filteredBalance.payout_mtd);
        setBalance(filteredBalance);
      } catch (error) {
        console.error('Error al obtener el balance:', error);
      }
    };

    fetchBalance();
  }, [commerce, payRequested]);

  useEffect(() => {
    window.addEventListener('storage', () => {
      setCommerce(getItem('current_commerce'));
    })
  }, []);

  useEffect(() => {
    const storedCommerce = getItem('current_commerce');
    if (storedCommerce) {
      setCommerce(storedCommerce);
    }
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!commerce) return;

      try {
        const activeTransactions = await apiStore.listTransactions(commerce, 'active');
        setPendingTransactions(activeTransactions.data.data.pending.map((it: any) => ({
            Fecha: moment(it.inserted_at).format('DD/MM/YYYY'),
            Hora: moment(it.inserted_at).format('HH:mm:ss'),
            Monto: it.total_amount,
            Cobrador: it.collector.full_name,
            Cliente: it.payer.full_name,
            Metodo: it.payment_method.toUpperCase()
          }))
        );

        const availableForPayout = await apiStore.listTransactions(commerce, 'active');
        setAvailableTransactions(availableForPayout.data.data.unwithdrawn.map((it: any) => ({
          Fecha: moment(it.inserted_at).format('DD/MM/YYYY'),
          Hora: moment(it.inserted_at).format('HH:mm:ss'),
          Monto: it.total_amount,
          Cobrador: it.collector.full_name,
          Cliente: it.payer.full_name,
          Medio: it.payment_method.toUpperCase()
        })));

        //TODO: implement pagination
        await fetchClosedTransactions(1);
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    };

    fetchTransactions();
  }, [commerce]);


  const fetchClosedTransactions = async (page: number) => {
    if (!commerce) return;
    try {
      const closedTrans = await apiStore.listClosedTransactions(commerce, '10', ((page - 1) * 10).toString());
      if(closedTrans.data.data.length > 0){
        setClosedTransactions(closedTrans.data.data);
        setTotalPages(Math.ceil(closedTrans.data.total / 10));
      }
    } catch (error) {
      console.error('Error al obtener las transacciones cerradas:', error);
    }
  };

  useEffect(() => {
    fetchClosedTransactions(currentPage);
  }, [commerce, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          <StatCard
            title="Balance"
            value={formatCurrency(balance.balance)}
            commerce={commerce}
            change={balance.is_payout_pending ? 'Retiro solicitado' : 'Disponible para retiro'}
            display_withdraw={true}
            payRequestStatus={balance.is_payout_pending}
            setPayRequested={setPayRequested}
          />

          <StatCard
            title="Total acumulado"
            value={formatCurrency(balance.balance)}
            commerce={commerce}
            change={'Total retirado historicamente'}
            display_withdraw={false}
            payRequestStatus={balance.is_payout_pending}
            setPayRequested={setPayRequested}
          />
        </div>
        <div className="grid gap-2 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
          <Tabs defaultValue="pendientes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
              <TabsTrigger value="disponibles">A Retirar</TabsTrigger>
              <TabsTrigger value="retirados">Retirados</TabsTrigger>
            </TabsList>
            <TabsContent value="pendientes">
              <TransactionsTable title="Pendientes" data={pendingTransactions} />
            </TabsContent>
            <TabsContent value="disponibles">
              <TransactionsTable title="A Retirar" data={availableTransactions} />
            </TabsContent>
            <TabsContent value="retirados">
              <TransactionsTable title="Retirados" data={closedTransactions} pageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
