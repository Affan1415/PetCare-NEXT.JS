import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AdoptProvider } from "@/contexts/AdoptContext";

export default function App({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <AdoptProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AdoptProvider>
    </FavoritesProvider>
  );
}
