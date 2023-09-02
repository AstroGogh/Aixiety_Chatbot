import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="bg-white h-screen">
        {/* Hero Header Content */}
        <div className="h-full flex flex-col justify-center items-center">
          <Image src="/logo.png" width="250" height="300" objectFit="cover " alt="aixiety" />
          <p className="mt-4 text-md md:text-lg w-2/4 text-center">Sahabat Psikolog AI yang bisa kalian percaya. Aixiety hadir sebagai teman mengobrol ataupun sekedar bercerita soal masalah kehidupan.</p>

          <a className="px-3 py-3 bg-lime-300 hover:bg-lime-100 rounded text-md font-medium md:text-lg my-5" href="/chat">
            Konsultasi Sekarang
          </a>
        </div>
      </div>
    </>
  );
}
