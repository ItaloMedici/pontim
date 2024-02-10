import Image from "next/image";

export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Image
        src="/logo.svg"
        alt="Pontim Logo"
        width={50}
        height={50}
        className="animate-pulse duration-700 "
      />
    </div>
  );
}
