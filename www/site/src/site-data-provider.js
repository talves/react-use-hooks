import { h, createContext } from "preact";
import { useContext, useReducer, useEffect } from "preact/hooks";

const SiteDataStateContext = createContext({});
const SiteDataDispatchContext = createContext();

const sitedataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const data = action.data || {};
      return {
        ...state,
        ...data,
      };
    default:
      throw new Error(
        `Unhandled action type: ${action.type} in sitedataReducer`
      );
  }
};

export const useSiteData = () => {
  const context = useContext(SiteDataStateContext);
  if (context === undefined) {
    throw new Error(
      `Context for useSiteData is missing.\nUse within <SiteDataProvider data={{ optional: { "not required" }}} url="/settings.json">`
    );
  }
  return context;
};

export const SiteDataProvider = ({ url, children }) => {
  const [state, updateContext] = useReducer(sitedataReducer, {});

  useEffect(() => {
    if (!url) return;
    fetch(url).then((response) => {
      response.json().then((data) => {
        updateContext({
          type: "UPDATE",
          data,
        });
      });
    });
  }, [url]);

  return (
    <SiteDataStateContext.Provider value={state}>
      <SiteDataDispatchContext.Provider value={updateContext}>
        {children}
      </SiteDataDispatchContext.Provider>
    </SiteDataStateContext.Provider>
  );
};
