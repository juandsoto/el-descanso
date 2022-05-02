import { UserLayout, UserLayoutLeft, UserLayoutRight } from "../components";

const Cajero = (): JSX.Element => {
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Cajero">Cajero</UserLayoutRight>
    </UserLayout>
  );
};

export default Cajero;
