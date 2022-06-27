import { UserLayout, UserLayoutLeft, UserLayoutRight } from "../components";

import Checkout from "../components/Checkout";

const Cajero = (): JSX.Element => {
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Cajero">
        <Checkout />
      </UserLayoutRight>
    </UserLayout>
  );
};

export default Cajero;
