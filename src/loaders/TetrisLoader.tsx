import React, { useEffect, useState } from 'react'

const TetrisLoader: React.FC = () => {
  const [blocks, setBlocks] = useState<number[]>([])
  const totalBlocks = 20

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prevBlocks => {
        if (prevBlocks.length >= totalBlocks) {
          clearInterval(interval)
          return prevBlocks
        }
        return [...prevBlocks, Math.floor(Math.random() * 7)]
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const getBlockColor = (type: number) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ]
    return colors[type]
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Cargando</h2>
        <div className="grid grid-cols-4 gap-1 w-40 mx-auto" role="status" aria-label="Cargando contenido">
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <div
              key={index}
              className={`h-10 w-10 rounded ${
                blocks[index] !== undefined ? getBlockColor(blocks[index]) : 'bg-gray-200'
              } transition-all duration-300 ease-in-out`}
            ></div>
          ))}
        </div>
        <p className="text-gray-600 text-center mt-4">Por favor, espere...</p>
      </div>
    </div>
  )
}

export default TetrisLoader