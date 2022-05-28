import { Container, Line, Spaces, Title } from "components/custom";
import CustomSearchAndFilter from "components/custom/CustomSearchAndFilter";
import withGaurd from "components/hoc/withGaurd"
import Services from "components/Services";
import { useUser } from "contexts/AuthContext";
import styledComponents from "styled-components";

const HomeContainer = styledComponents.div``;
const data = [
  { id: 5, title: 'Identity Design and Theft Protection from scams and many more Theft Protection from scams and many more.', description: "I'll help you make an online presence with the help of identity design and provide with assets", photoURL: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80' },
  { id: 1, title: 'Website Design.', description: "I'll help you make an online presence with the help of identity design and provide with assets", photoURL: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800' },
  { id: 2, title: 'Website Design.', description: "I'll help you make an online presence with the help of identity design and provide with assets", photoURL: 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800' },
]
function Home() {
  return (
    <HomeContainer>
      <Container>
        <Spaces top="10px" />
        <CustomSearchAndFilter />
      </Container>
      <Container style={{ paddingTop: 20 }}>
        <Title>
          Services
        </Title>
        <Services
          data={data}
        ></Services>
      </Container>
    </HomeContainer>
  )
}
export default withGaurd(Home);