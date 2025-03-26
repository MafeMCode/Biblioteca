interface ZoneDialogProps {
    number?: number;
}

export function ZoneDialog({number} : ZoneDialogProps) {

    return (

        <div>
            <p>Aqui estan los datos de la zona {number}</p>
        </div>
    )
}
