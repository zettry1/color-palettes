import React, { useState } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePallete } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
function App() {
  const [palettes, setPalettes] = useState(seedColors);
  const findPallet = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  const savePalette = (newPalette) => {
    setPalettes((prevPalettes) => [...prevPalettes, newPalette]);
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
            <PaletteList palletes={palettes} {...routeProps} />
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
