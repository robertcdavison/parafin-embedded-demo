import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ParafinWidget } from "@parafin/react";
import { Header } from "./components/Header.tsx";
import { SideNav } from "./components/SideNav.tsx";

function App() {
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState("capital");

  useEffect(() => {
    // Change to false to use production or sandbox production environment
    const isDevEnvironment = false;

    const fetchToken = async () => {
      // Replace with your own Person ID. It should begin with "person_".
      const personId = "person_a5eb34d5-9e48-4d15-bca2-7b2c872129ba";

      // Fetch Parafin token from server
      const response = await axios.get(
        `/parafin/token/${personId}/${isDevEnvironment}`
      );
      setToken(response.data.parafinToken);
    };

    if (!token) {
      fetchToken();
    }
  });

  const onOptIn = async () => ({
    businessExternalId: "business_b1fab3ad-1026-4134-84e8-13b459066b45",
    legalBusinessName: "Toms Cereal Shack, LLC",
    dbaName: "Toms Cereal Shack",
    ownerFirstName: "Toms",
    ownerLastName: "Taster",
    accountManagers: [
      {
        name: "Tom Taster",
        email: "scootertaster@gmail.com",
      },
    ],
    routingNumber: "021000021",
    accountNumberLastFour: "1234",
    bankAccountCurrencyCode: "USD",
    email: "test2@parafin.com",
    phoneNumber: "3808952442",
    address: {
      addressLine1: "611 Mission St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "USA",
    },
  });

  if (!token) {
    return <LoadingShell>loading...</LoadingShell>;
  }

  return (
    <div>
      <Header />
      <ContentShell>
        <SideNav onClick={(newProduct) => setTab(newProduct)} />
        {tab === "capital" && (
          <PageShell>
            <ParafinWidget
              token={token}
              product="capital"
              // Optional props below, see docs.parafin.com for more information
              externalBusinessId={undefined}
              onOptIn={onOptIn}
            />
          </PageShell>
        )}
        {tab === "analytics" && (
          <PageShell>
            <h2>Analytics</h2>
          </PageShell>
        )}
        {tab === "payouts" && (
          <PageShell>
            <h2>Payouts</h2>
          </PageShell>
        )}
      </ContentShell>
    </div>
  );
}

export default App;

const ContentShell = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoadingShell = styled.div`
  padding: 20px;
`;

const PageShell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  max-width: 1100px;
`;
