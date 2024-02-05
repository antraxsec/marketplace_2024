import React, { useState } from 'react'
import Checket2 from './item/Checket2'

export default function Cuerpoacordion({ handleCheckboxChange, setSelectedProcessors, selectedProcessors, getFourWords, valor, clave }) {
    const [procesadorCheket, setProcesadorCheket] = useState(true)
    const mostrarProCheket = () => {
        setProcesadorCheket(!procesadorCheket)
    }
    //procesador 
    let procesador = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'ryzen 3', 'Ryzen 5', 'Ryzen 7']
    let Generacionprocesador = ['11ᵃ', '12ᵃ', '13ᵃ', '10ᵃ']
    let Memoriaram = ['8GB', '16GB', '24GB', '32GB']
    let unidadestadoSSD = ['512 GB', '256 GB', '1 TB', '2 TB',]
    // let Pantalla = ['12"', '13,3"', '14"', '14,6"', '15,6"', '16,1"', '17,3"']

    let contenido;

    switch (clave) {
        case 'Procesador':

            contenido = procesadorCheket
                ? procesador.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Procesador'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                ) :
                valor.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Procesador'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                )

            break;
        case 'Generación del procesador (Intel)':
            contenido = procesadorCheket
                ? Generacionprocesador.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Generación del procesador (Intel)'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                ) :
                valor.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Generación del procesador (Intel)'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                )
            break
        case 'Memoria RAM':
            contenido = procesadorCheket
                ? Memoriaram.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Memoria RAM'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                ) :
                valor.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Memoria RAM'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                )
            break
        case 'Unidad de estado solido (SSD)':
            contenido = procesadorCheket
                ? unidadestadoSSD.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador,
                                    'Unidad de estado solido (SSD)'
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                ) :
                valor.map((procesador, indice) => (
                    <small key={procesador} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5"
                            checked={selectedProcessors.includes(procesador)}
                            onChange={() =>
                                handleCheckboxChange(
                                    setSelectedProcessors,
                                    selectedProcessors,
                                    procesador
                                )
                            }
                        />
                        <span className="ml-2 ">

                            {getFourWords(procesador)}
                        </span>
                    </small>
                )
                )
            break
        default:
            contenido = valor.map((procesador, indice) => (
                <small key={procesador} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={selectedProcessors.includes(procesador)}
                        onChange={() =>
                            handleCheckboxChange(
                                setSelectedProcessors,
                                selectedProcessors,
                                procesador,
                                clave
                            )
                        }
                    />
                    <span className="ml-2 ">

                        {getFourWords(procesador)}
                    </span>
                </small>
            )
            )
    }

    return (
        <div className="p-3">
            <Checket2 isChecked={procesadorCheket} mostrarProCheket={mostrarProCheket} />
            {/* {


                procesadorCheket ?
                    procesador.map((procesador, indice) => (
                        <small key={procesador} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedProcessors.includes(procesador)}
                                onChange={() =>
                                    handleCheckboxChange(
                                        setSelectedProcessors,
                                        selectedProcessors,
                                        procesador
                                    )
                                }
                            />
                            <span className="ml-2 ">

                                {getFourWords(procesador)}
                            </span>
                        </small>
                    )
                    )
                    :

                    valor.map((procesador, indice) => (
                        <small key={procesador} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedProcessors.includes(procesador)}
                                onChange={() =>
                                    handleCheckboxChange(
                                        setSelectedProcessors,
                                        selectedProcessors,
                                        procesador
                                    )
                                }
                            />
                            <span className="ml-2 ">

                                {getFourWords(procesador)}
                            </span>
                        </small>
                    )
                    )
            } */}
            {contenido}

        </div>
    )
}
