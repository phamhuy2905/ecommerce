import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.tsx";
import AuthProvider from "./context/auth.context.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import LoadingProvider from "./Admin/context/loading.context.tsx";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <LoadingProvider>
            <AuthProvider>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false} />
                        <GlobalStyles>
                            <App />
                        </GlobalStyles>
                    </QueryClientProvider>
                </Provider>
            </AuthProvider>
        </LoadingProvider>
    </BrowserRouter>
    // </React.StrictMode>
);
