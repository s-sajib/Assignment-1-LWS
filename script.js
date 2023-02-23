// select dom elements
const addMatchButton = document.querySelector(".lws-addMatch");
addMatchButton.addEventListener("click", addMatch);

// initial state
const initialState = [
  {
    value: 120,
  },
];

// create reducer function
function matchReducer(state = initialState, action) {
  if (action.type === "add") {
    return [...state, { value: 120 }];
  } else if (action.type === "increment") {
    console.log("increment Hit");
    // let duplicateState = [...state];
    // duplicateState[action.payload.index] = {
    //   value: duplicateState[action.payload.index] + 1,
    // };

    // return duplicateState;
  } else if (action.type === "decrement") {
    //   let duplicateState = [...state];
    //   duplicateState[action.payload.index] = {
    //     value: duplicateState[action.payload.index] - 1,
    //   };

    //   return duplicateState;
    console.log("decrement hit");
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(matchReducer);

const renderRows = () => {
  const currentStates = store.getState();
  const matchContainer = document.getElementById("matchContainer");
  const clonedMatch = document.querySelector(".match").cloneNode(true);
  if (currentStates.length === 1) {
    matchContainer.innerHTML = "";
  }

  currentStates.map((state, index) => {
    clonedMatch.querySelector(".lws-matchName").innerText = `Match ${
      index + 1
    }`;
    clonedMatch
      .querySelector(".lws-increment")
      .setAttribute("id", `increment-${index + 1}`);
    clonedMatch
      .querySelector(".lws-decrement")
      .setAttribute("id", `decrement-${index + 1}`);
    clonedMatch.querySelector(".lws-singleResult").innerText = state.value;
    matchContainer.appendChild(clonedMatch);
  });
};
renderRows();
function addMatch() {
  store.dispatch({ type: "add" });
  renderRows();
  // clonedMatch.classList.remove("hidden");

  // matchContainer.appendChild(clonedMatch);

  // console.log(matches[0].setAttribute("id", "match-1"));
  // console.log(
  //   matches[0]
  //     .getElementsByClassName("lws-increment")[0]
  //     .setAttribute("id", "match-1-increment")
  // );

  // matches[0]
  //   .getElementsByClassName("lws-singleResult")[0]
  //   .setAttribute("id", "match-1-result");

  // console.log(
  //   matches[0]
  //     .getElementsByClassName("lws-decrement")[0]
  //     .setAttribute("id", "match-1-decrement")
  // );
}
// const counterEl = document.getElementsByClassName("counter");
// const incrementButton = document.getElementsByClassName("lws-increment");
// const decrementButton = document.getElementsByClassName("lws-decrement");

// // update UI initially
// render();

// store.subscribe(render);

// // button click listeners
// incrementEl.addEventListener("click", () => {
//   store.dispatch({
//     type: "increment",
//   });
// });

// decrementEl.addEventListener("click", () => {
//   store.dispatch({
//     type: "decrement",
//   });
// });
