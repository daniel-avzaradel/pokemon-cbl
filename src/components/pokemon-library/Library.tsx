import { useState } from "react"
import { Container, Header } from "./Library.styles"
import LibraryCard from "./LibraryCard"
import Modal from "./Modal";

const Library = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Container>
            <Header>
                <h2>Pokemon Library</h2>
            </Header>
            <br />
            <LibraryCard {...{setOpenModal}} />
            {openModal && (
                <Modal {...{setOpenModal}} />
            )}
        </Container>
    )
}

export default Library