import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const RoomIsFullPage = async ({ params }: { params: { roomId: string } }) => {
  return (
    <main className="mx-auto w-4/12 flex flex-col mt-20 items-center space-y-6 p-6 rounded-2xl border border-gray-200">
      <span className="text-4xl w-full text-center">🙁</span>
      <h1 className="text-lg font-semibold">Sala Cheia</h1>
      <p className="text-gray-700 text-center">
        A sala atingiu sua capacidade máxima. Entre em contato com o
        administrador para aumentar o limite de jogadores.
      </p>
      <div className="flex gap-x-4 mt-6">
        <Link href={"/"} className={cn(buttonVariants({ variant: "ghost" }))}>
          Voltar
        </Link>
        <Link
          href={`/room/${params.roomId}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Tentar novamente
        </Link>
        <Link
          href={"/pricing"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Ver planos
        </Link>
      </div>
    </main>
  );
};

export default RoomIsFullPage;
