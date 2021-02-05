import React from "react";

export default React.createContext({
  notes: [],
  fodlers: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
});
