import { createSlice } from "@reduxjs/toolkit";

const behaviorSlice = createSlice({
  name: "behavior",
  initialState: {
    avoidedBehaviors: {},
  },
  reducers: {
    setAvoidedBehavior: (state, action) => {
      const { taskId, avoided } = action.payload;
      state.avoidedBehaviors[taskId] = avoided;
    },
    resetBehavior: (state) => {
      state.avoidedBehaviors = {};
    },
  },
});

export const { setAvoidedBehavior, resetBehavior } = behaviorSlice.actions;
export default behaviorSlice.reducer;
