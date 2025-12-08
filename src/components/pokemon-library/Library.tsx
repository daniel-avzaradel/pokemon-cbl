import { useState } from "react";
import { FetchedPokemon } from "src/hooks/usePokemon";
import { Container, Header } from "./Library.styles";
import LibraryCard from "./LibraryCard";
import LibraryModal from "./Modal";

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
                <LibraryModal {...{selectedPokemon, setOpenModal}} />
            )}
        </Container>
    )
}

export default Library