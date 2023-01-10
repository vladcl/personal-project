import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import ScreenSkeleton from "../../components/ScreenSkeleton";

export default function CatApi() {
  const [httpMethod, setHttpMethod] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    const regex = /blob:/gm;
    const subst = ``;
    fetch(`https://http.cat/${httpMethod}`, {mode: 'no-cors'}).then(response => response.blob()).then(imageBlob => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);

        const result = imageObjectURL.replace(regex, subst)

        setImageLink(result);
    });
  }, [httpMethod]);

  const selectHTTPMethod = async (event: SelectChangeEvent) => {
    setHttpMethod(event.target.value as string);
  };

  return (
    <ScreenSkeleton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "40px",
          width: "100%",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "center",
        }}
      >
        <InputLabel sx={{ color: "black" }}>Escolha o método HTTP</InputLabel>
        <Select value={httpMethod} onChange={selectHTTPMethod}>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={101}>101</MenuItem>
          <MenuItem value={102}>102</MenuItem>
          <MenuItem value={103}>103</MenuItem>
          <MenuItem value={200}>200</MenuItem>
          <MenuItem value={201}>201</MenuItem>
          <MenuItem value={202}>202</MenuItem>
          <MenuItem value={203}>203</MenuItem>
          <MenuItem value={204}>204</MenuItem>
          <MenuItem value={206}>206</MenuItem>
          <MenuItem value={207}>207</MenuItem>
          <MenuItem value={300}>300</MenuItem>
          <MenuItem value={301}>301</MenuItem>
          <MenuItem value={302}>302</MenuItem>
          <MenuItem value={303}>303</MenuItem>
          <MenuItem value={304}>304</MenuItem>
          <MenuItem value={305}>305</MenuItem>
          <MenuItem value={307}>307</MenuItem>
          <MenuItem value={308}>308</MenuItem>
          <MenuItem value={400}>400</MenuItem>
          <MenuItem value={401}>401</MenuItem>
          <MenuItem value={402}>402</MenuItem>
          <MenuItem value={403}>403</MenuItem>
          <MenuItem value={404}>404</MenuItem>
          <MenuItem value={405}>405</MenuItem>
          <MenuItem value={406}>406</MenuItem>
          <MenuItem value={407}>407</MenuItem>
          <MenuItem value={408}>408</MenuItem>
          <MenuItem value={409}>409</MenuItem>
          <MenuItem value={410}>410</MenuItem>
          <MenuItem value={411}>410</MenuItem>
          <MenuItem value={412}>412</MenuItem>
          <MenuItem value={413}>413</MenuItem>
          <MenuItem value={414}>414</MenuItem>
          <MenuItem value={415}>415</MenuItem>
          <MenuItem value={416}>416</MenuItem>
          <MenuItem value={417}>417</MenuItem>
          <MenuItem value={418}>418</MenuItem>
          <MenuItem value={420}>420</MenuItem>
          <MenuItem value={421}>421</MenuItem>
          <MenuItem value={422}>422</MenuItem>
          <MenuItem value={423}>423</MenuItem>
          <MenuItem value={424}>424</MenuItem>
          <MenuItem value={425}>425</MenuItem>
          <MenuItem value={426}>426</MenuItem>
          <MenuItem value={429}>429</MenuItem>
          <MenuItem value={431}>431</MenuItem>
          <MenuItem value={444}>444</MenuItem>
          <MenuItem value={450}>450</MenuItem>
          <MenuItem value={451}>451</MenuItem>
          <MenuItem value={497}>497</MenuItem>
          <MenuItem value={498}>498</MenuItem>
          <MenuItem value={499}>499</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={501}>501</MenuItem>
          <MenuItem value={502}>502</MenuItem>
          <MenuItem value={503}>503</MenuItem>
          <MenuItem value={504}>504</MenuItem>
          <MenuItem value={506}>506</MenuItem>
          <MenuItem value={507}>507</MenuItem>
          <MenuItem value={508}>508</MenuItem>
          <MenuItem value={509}>508</MenuItem>
          <MenuItem value={510}>510</MenuItem>
          <MenuItem value={511}>511</MenuItem>
          <MenuItem value={521}>521</MenuItem>
          <MenuItem value={522}>522</MenuItem>
          <MenuItem value={523}>523</MenuItem>
          <MenuItem value={525}>521</MenuItem>
          <MenuItem value={599}>599</MenuItem>
        </Select>
        <img alt="new-http-cat" src={imageLink} />
      </Box>
    </ScreenSkeleton>
  );
}
