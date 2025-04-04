import { VeltComments, VeltProvider } from "@veltdev/react";
import Header from "./shared/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <VeltProvider apiKey={import.meta.env.VITE_VELT_API_KEY}>
      <Header />
      {children}
      <VeltComments popoverMode={true} popoverTriangleComponent={true} />
    </VeltProvider>
  );
}
