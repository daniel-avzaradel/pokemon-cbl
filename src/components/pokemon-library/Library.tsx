import { Container, Header } from "./Library.styles"
import LibraryCard from "./LibraryCard"

const Library = () => {
    return (
        <Container>
            <Header>
                <h2>Pokemon Library</h2>
            </Header>
            <br />
            <LibraryCard />
        </Container>
    )
}

export default Library