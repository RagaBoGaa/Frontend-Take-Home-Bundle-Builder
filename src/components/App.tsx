import { BundleProvider } from "../context/BundleContext";
import Builder from "./Builder/Builder";
import ReviewPanel from "./ReviewPanel/ReviewPanel";

export default function App() {
  return (
    <BundleProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto lg:px-4 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-start">
            <main role="main" className="flex-1 lg:w-[60%]">
              <Builder />
            </main>

            <div className="w-full lg:w-[40%] lg:max-w-sm">
              <ReviewPanel />
            </div>
          </div>
        </div>
      </div>
    </BundleProvider>
  );
}
