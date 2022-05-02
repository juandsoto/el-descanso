import { UserLayout, UserLayoutLeft, UserLayoutRight } from "../components";

const Recepcionista = (): JSX.Element => {
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Recepcionista">recepcionista</UserLayoutRight>
    </UserLayout>
  );
};

export default Recepcionista;
