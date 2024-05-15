import { Container } from "@/components/container";
import Image from "next/image";
import userImg from '../../../public/user.png'
import { FaShareAlt } from 'react-icons/fa'
import { FavoriteCard } from "./components/favorite";

export const metadata: Metadata = {
    title: "Meu perfil | Daly Games",
    description: "Perfil Karlos Macêdo | Daly Games",
    keywords: ['games', 'jogos', 'steam'],
    openGraph: {
      images: [`${process.env.PROJECT_URL}/preview.png`]
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true
      }
    }
};

export default function Profile() {
    return (
        <main className="w-full text-black">
            <Container>
                <section
                    className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
                    <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
                        <Image
                            className="rounded-full w-56 h-56 object-cover"
                            src={userImg}
                            alt="Imagem do Usuário"
                        />
                        <h1 className="font-bold text-2xl">Karlos Macêdo</h1>
                    </div>

                    <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
                        <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
                            Configurações
                        </button>
                        <button className="bg-gray-700 px-4 py-3 rounded-lg">
                            <FaShareAlt size={24} color="#fff" />
                        </button>
                    </div>
                </section>
                
                <section className="flex flex-wrap gap-5 flex-col md:flex-row">
                    <FavoriteCard />
                    <FavoriteCard />
                    <FavoriteCard />
                </section>
            </Container>
        </main>
    )
}
