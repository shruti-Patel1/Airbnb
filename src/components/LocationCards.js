import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CarouselCard from "./CarouselCard";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "./googleSignIn/config";
// const citiesRef = collection(db, "locations");
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const citiesRef = collection(db, "Cabins");

const LocationCards = (props) => {
  const [dataFb, setDataFb] = React.useState("");
  const [logData, setLogData] = React.useState();
  const [citySnapshotData, setCitySnapshotData] = React.useState();

  useEffect(() => {
    getSites();
  }, [logData]);

  const getSites = async () => {
    const details = collection(db, "Sities");
    const data = await getDocs(details);
    setDataFb(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    auth.currentUser.email && setLogData(auth.currentUser.email);
    auth.currentUser.phoneNumber && setLogData(auth.currentUser.phoneNumber);
    logData && fetchData();
  };

  const fetchData = async () => {
    let blankarray = [];
    const citiesRef = collection(db, "Users");
    const citySnapshot = await getDocs(citiesRef);

    let SnapshotData = citySnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((value) => value.id == logData)
      .filter((value) => value)[0].favourite;
    setCitySnapshotData(SnapshotData);
  };

  if (!dataFb.length) {
    return (
      <Grid xs={12} sm={4} md={4} lg={3} xl={2}>
        <Skeleton
          height={250}
          width={260}
          count={12}
          inline="true"
          style={{ marginRight: "1.4rem", marginTop: "2.5rem" }}
          borderRadius={"0.5rem"}
        />
      </Grid>
    );
  }

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {dataFb
          .filter((data) => data.category === props.value)
          .map((location) => {
            return (
              <Grid key={location.id} item xs={12} sm={4} md={4} lg={3} xl={2}>
                <CarouselCard location={location} snapData={citySnapshotData} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default LocationCards;
