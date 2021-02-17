import React from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePallete } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
function App() {
  const findPallet = (id) => {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  };
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palletes={seedColors} {...routeProps} />
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
      </Switch>
    </div>
  );
}

export default App;
