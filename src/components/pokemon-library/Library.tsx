import { useState } from "react"
import { Container, Header } from "./Library.styles"
import LibraryCard from "./LibraryCard"
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { FetchedPokemon } from "src/hooks/usePokemon";

const Library = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<FetchedPokemon | null>(null)

    return (
        <Container>
            <Header>
                <h2>Pokemon Library</h2>
            </Header>
            <br />
            <LibraryCard {...{ setOpenModal, setSelectedPokemon }} />
            {openModal && (
                <Modal {...{selectedPokemon, setOpenModal}} />
            )}
        </Container>
    )
}

export default Library