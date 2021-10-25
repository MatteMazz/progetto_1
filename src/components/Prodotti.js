import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Prod from "./Prodotto.js";
import Nav from "./Nav";
import Footer from "./Footer.js";
import { totProds } from "../data/Data";

export default function Prodotti() {
  const [selected, setSelected] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const search = (prod) => {
    const searchName = prod.name.toLowerCase().includes(searchTerm);
    return searchName ? true : false;
  };

  const toggle = (prod) => {
    const inStock = selected === "in" && prod.availability.stock > 0;
    const outStock = selected === "out" && prod.availability.stock <= 0;
    return inStock || outStock || selected === "none" ? true : false;
  };

  return (
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
      <Grid item xs={12}>
        <Nav
          selected={selected}
          setSelected={setSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Grid>
      <Grid flex={1} item xs={12}>
        <Grid
          pt={2}
          pr={2}
          pb={2.5}
          pl={2}
          
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {totProds
            ?.filter(toggle)
            .filter(search)
            .map((prod, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                <Prod prod={prod} det={false} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}