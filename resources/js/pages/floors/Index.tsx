import { PageProps } from '@inertiajs/core';

interface IndexFloorProps extends PageProps {
    floors: string[];
}

export default function FloorsIndex({floors}: IndexFloorProps) {

  return(
    <section>
    <h1>Buenas tardes</h1>
    <div>
    {floors.map((floor) => {
                return (
            <h1>Este sería un piso</h1>
        )})}
    </div>
    </section>
  )
}
