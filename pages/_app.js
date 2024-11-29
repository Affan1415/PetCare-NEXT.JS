import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

export default function App({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </FavoritesProvider>
  );
}
