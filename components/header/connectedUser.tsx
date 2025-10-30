import { User } from "@/lib/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const DivConnectAll = dynamic(() => import("./styled").then((mod) => mod.DivConnectAll));
const ButtonSmsConnect = dynamic(() => import("@/ui/boton").then((mod) => mod.ButtonSmsConnect));
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));

export default function ConnectedUsers({
  allConnectAmigos,
  dataIsConnect,
}: {
  allConnectAmigos: User[];
  dataIsConnect: any;
}) {
  const { push } = useRouter();
  return (
    <>
      <DivConnectAll>
        {allConnectAmigos.length ? (
          allConnectAmigos.map((e, index) => (
            <ButtonSmsConnect
              key={e.id}
              className={index !== allConnectAmigos.length - 1 ? "border-b border-gray-500" : ""}
              onClick={() => push("/chat?" + "id=" + e.id)}
            >
              <FotoPerfil
                img={e.img}
                className='h-[30px] w-[30px]'
                connect={
                  dataIsConnect?.find((eConnect: any) => e.id == eConnect.id)?.connect && true
                }
                title={e.fullName}
              />

              <span className='text-black whitespace-nowrap overflow-hidden text-ellipsis'>
                {e.fullName}
              </span>
            </ButtonSmsConnect>
          ))
        ) : (
          <div className='text-center'>No hay conectados</div>
        )}
      </DivConnectAll>
    </>
  );
}
