
import { redirect } from "next/navigation"
import Image from "next/image"
import { GameProps } from "@/utils/types/game"
import { Container } from "@/components/container"
import { Label } from "./components/label"
import { GameCard } from "@/components/game-card"
import { Metadata } from "next"

interface GamePageProps {
    params: {
        id: string
    }
}

async function getGame({ id }: { id: string }) {
    try {
      const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
        cache: 'no-store'
      })
  
      return res.json()
    } catch (error) {
      throw new Error('Failed to fetch data')
    }
}

async function getSortedGame() {
    try {
      const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {
        cache: 'no-store'
      })
  
      return res.json()
    } catch (error) {
      throw new Error('Failed to fetch data')
    }
}

interface GenerateMetadataProps {
    params: {
        id: string
    }
}

export async function generateMetadata({
    params: { id }
}: GenerateMetadataProps):Promise<Metadata> {

    try {
        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
          cache: 'no-store'
        }).then((res) => res.json())
        .catch(() => {
            return {
                title: "Daly Games - Descubra jogos incríveis para se divertir."
            }
        })

        return {
            title: response.title,
            description: `${response.description.slice(0, 100)}...`,
            keywords: ['games', 'jogos', 'steam'],
            openGraph: {
              title: response.title,
              images: [response.image_url]
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

    } catch (error) {
        return {
            title: "Daly Games - Descubra jogos incríveis para se divertir."
        }
    }
}


export default async function Game({ params: { id } }: GamePageProps) {
    const data: GameProps = await getGame({ id: id })
    const sortedGame: GameProps = await getSortedGame()

    if (!data) {
        redirect("/")
    }

    return (
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image
                    priority
                    className="object-cover w-full h-80 sm:h-96 opacity-80 hover:opacity-100 transition-all duration-300"
                    fill={true}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                    src={data.image_url}
                    alt={data.title} />
            </div>
            <Container>
                <h1 className="font-bold text-xl my-4">{data.title}</h1>
                <p>{data.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataforma</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.platforms.map((item) => (
                        <Label
                            key={item}
                            name={item} />
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.categories.map((item) => (
                        <Label
                            key={item}
                            name={item} />
                    ))}
                </div>

                <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {data.release}</p>
                
                <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={sortedGame} />
                    </div>
                </div>
            </Container>
        </main>
    )
}
