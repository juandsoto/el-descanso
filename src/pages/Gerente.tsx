import { UserLayout, UserLayoutLeft, UserLayoutRight } from "../components";

const Gerente = (): JSX.Element => {
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Gerente">gerente</UserLayoutRight>
    </UserLayout>
  );
};

export default Gerente;
