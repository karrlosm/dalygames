import { Container } from "@/components/container"
import { GameCard } from "@/components/game-card"
import { Input } from "@/components/input"
import { GameProps } from "@/utils/types/game"

interface SearchProps {
    params: {
        title: string
    }
}

async function getData(title: string) {
    try {
        const decodeTitle = decodeURI(title)
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
        return res.json()
      } catch (error) {
        throw new Error('Failed to fetch data')
      }
}

export default async function Search({
    params: { title }
}: SearchProps){

    const games: GameProps[] = await getData(title)

    return (
        <main className="w-full text-black">
            <Container>
                <Input />
                <h1 className="font-bold text-xl mt-8 mb-5">
                    Veja o que encontramos na nossa base:
                </h1>

                {!!games ?
                    <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {games.map((item) => (
                            <GameCard data={item} key={item.id} />
                        ))}
                    </section> :
                    <p>Esse jogo não foi encontrado...</p>
                }
            </Container>
        </main>
    )
}
