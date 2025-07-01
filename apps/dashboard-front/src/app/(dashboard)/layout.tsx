import { RefreshDashboardButton } from "@/components/RefreshButton";
import ClienteLista from "@/components/ui/ClienteLista";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-4 h-full max-w-[2440px] m-auto flex-col xl:flex-row">
      <section className="flex-3/4 flex flex-col gap-4">
        <div className="card flex items-center justify-between">
            <div>
            <h1 className="text-xl font-bold">
                Bem-vindo(a) de volta!
            </h1>
            <span className="font-medium text-sm text-gray-400">
                Acompanhe de perto o progresso do pedidos
            </span>
            </div>
            <RefreshDashboardButton/>
        </div>
        <div className="card h-full">{children}</div>
      </section>
      <section className="flex-1/4 flex flex-col gap-4">
        <ClienteLista/>
      </section>
    </div>
  );
}
