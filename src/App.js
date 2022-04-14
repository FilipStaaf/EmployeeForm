import React from "react";
import "./App.css";

import { CssBaseline, makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Employees from "./pages/employees/Employees";




/*TODO list

 *Fixa så att Department visas i Table (det kommer up department ID när man inspektar)
 (i Select.js sätter man ID med value propen men då får man numret inte titeln )

 *Fixa så att piliconen ändrar riktning till neråtpil när man sorterar efter EmployeeName (useTable.js line 55)

 *Ändra så att Search Employee är case-sensetive (Employees.js line 133)

 *Hosta till FireBase

 *Försöka att ändra databasen till firebase's istället för localStorage

*/

const themeMod = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateƵ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={themeMod}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <Employees />
      </div>
      <CssBaseline />
     
    </ThemeProvider>
  );
}

export default App;
