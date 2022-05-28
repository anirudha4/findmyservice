import { Container, Line, Spaces } from "components/custom";
import CustomSearchAndFilter from "components/CustomSearchAndFilter";
import withGaurd from "components/hoc/withGaurd"
import { useUser } from "contexts/AuthContext";
import styledComponents from "styled-components";

const HomeContainer = styledComponents.div``;
function Home() {
  const { user, logout } = useUser();
  return (
    <HomeContainer>
      <Container>
        <Spaces top="10px" />
        <CustomSearchAndFilter />
      </Container>
      <Spaces top="10px" />
    </HomeContainer>
  )
}
export default withGaurd(Home);