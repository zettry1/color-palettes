import React, { useState } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePallete } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
function App() {
  const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
  console.log("savePalettes", savePalettes);

  const [palettes, setPalettes] = useState(savePalettes || seedColors);
  const findPallet = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  const deletePalette = (id) => {
    setPalettes(
      (prevstate) => prevstate.filter((palette) => palette.id !== id),
      syncLocalStorage(palettes)
    );
  };
  const savePalette = (newPalette) => {
    setPalettes((prevPalettes) => [...prevPalettes, newPalette]);
    syncLocalStorage([...palettes, newPalette]);
  };

  const syncLocalStorage = (addedPalettes) => {
    window.localStorage.setItem("palettes", JSON.stringify(addedPalettes));
  };
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              palettes={palettes}
              savePalette={savePalette}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList
              palletes={palettes}
              {...routeProps}
              deletePalette={deletePalette}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePallete(findPallet(routeProps.match.params.id))}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePallete(
                findPallet(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
