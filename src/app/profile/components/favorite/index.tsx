"use client"
import { Metadata } from "next";
import { useState } from "react"
import { FiEdit, FiX } from 'react-icons/fi'

export function FavoriteCard() {
    const [showInput, setShowInput] = useState(false)
    const [input, setInput] = useState("")
    const [gameName, setGameName] = useState("")

    function handleButton() {
        setShowInput(!showInput)
        !!input && setGameName(input)
        setInput("")
    }
    
    return (
        <div className="flex-grow flex-wrap">
            <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
                {showInput ? (
                    <div className="flex items-center justify-center gap-3">
                        <input
                            className="text-black w-full rounded-md h-8 px-2"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text" />
                        <button onClick={() => handleButton()}>
                            <FiX size={24} color="#fff" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleButton}
                        className="self-start hover:scale-110 duration-200 transition-all">
                        <FiEdit size={24} color="#fff" />
                    </button>
                )}

                {!!gameName ? (
                    <div>
                        <span className="text-white">Jogo favorito</span>
                        <p className="font-bold text-white">{gameName}</p>
                    </div>
                ) : (
                    <p className="font-bold text-white">{!!gameName ? gameName : 'Adicionar jogo'}</p>
                )}

            </div>
        </div>
    )
    
}
