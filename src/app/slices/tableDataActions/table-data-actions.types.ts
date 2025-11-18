/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { deleteEmptyKeysAndValues } from "../../../components/utilities/delete-empty-kv";
import { TableDataI } from "./table-data-actions.interface";

const tableDataInitialState: TableDataI = {
  data: {},
  click: 0,
  otherData: [],
};

const TableDataSlice = createSlice({
  name: "tableData",
  initialState: tableDataInitialState,
  reducers: {
    setTableData: (state, action) => {
      const payloa: Record<string, any> = action.payload;
     const payload = deleteEmptyKeysAndValues(payloa);
    
      console.log('state.data', state.data, 'action.payload', action.payload)
      for (const [key, value] of Object.entries(payload)) {
        if (typeof value === "object") {
          if (value.$$typeof) {
            delete payload[key];
          }
        }
      }

      //   if (action.payload) {
      //     action.payload.map((d: any) => {
      //       //console.log(d, "d   typeof");
      //       if (typeof d === "symbol") {
      //         delete action.payload[d];
      //       }
      //     });
      //   }
      state.data = action.payload;

    },
    setClickCount: (state, action) => {
      state.click = action.payload;
    },
    setOtherData: (state, action) => {
      state.otherData.push(action.payload);
    },
    clearOtherData: (state) => {
      state.otherData = [];
    },
  },
});

export const { setTableData, setClickCount, clearOtherData, setOtherData } =
  TableDataSlice.actions;
export const TableDataReducer = TableDataSlice.reducer;
