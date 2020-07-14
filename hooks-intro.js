// useState > this.setState
// useEffect > componentDidMount
// useContext > redux, access and update global context state
// useReducer > update local component state, but not the global state


const [state, dispatch] = useReducer(importedReduxReducer, importedInitialState)
    //[value, function]

//regular action: 
dispatch(type:'ACTION')

//action creator:
(payload) => dispatch(ACTIONS.create_action(payload))

//read:
<p>{ state.state_property}</p>
