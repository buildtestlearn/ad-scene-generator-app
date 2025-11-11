import { useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { SceneCard } from "./SceneCard";
import { ConceptHistory } from "./ConceptHistory";

export function AdSceneGenerator() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentConcept, setCurrentConcept] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  const generateScenes = useAction(api.adScenes.generateAdScenes);
  const userConcepts = useQuery(api.adScenes.getUserAdConcepts);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName.trim() || !productDescription.trim()) {
      toast.error("Please fill in both product name and description");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateScenes({
        productName: productName.trim(),
        productDescription: productDescription.trim(),
        referenceUrl: referenceUrl.trim() || undefined,
      });
      
      setCurrentConcept(result);
      toast.success("Ad scenes generated successfully!");
    } catch (error) {
      console.error("Error generating scenes:", error);
      toast.error("Failed to generate scenes. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setProductName("");
    setProductDescription("");
    setReferenceUrl("");
    setCurrentConcept(null);
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., AquaFresh"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                disabled={isGenerating}
              />
            </div>

            <div>
              <label htmlFor="referenceUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Reference URL (Optional)
              </label>
              <input
                type="url"
                id="referenceUrl"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                placeholder="https://example.com/inspiration"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                disabled={isGenerating}
              />
            </div>
          </div>

          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Product Description *
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="e.g., Natural spring water in a blue bottle, sourced from mountain springs, eco-friendly packaging"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              disabled={isGenerating}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isGenerating || !productName.trim() || !productDescription.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Scenes...</span>
                </>
              ) : (
                <span>Generate Ad Scenes</span>
              )}
            </button>

            {currentConcept && (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                New Concept
              </button>
            )}

            {userConcepts && userConcepts.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                {showHistory ? "Hide" : "Show"} History
              </button>
            )}
          </div>
        </form>
      </div>

      {/* History */}
      {showHistory && <ConceptHistory onSelectConcept={setCurrentConcept} />}

      {/* Generated Scenes */}
      {currentConcept && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Ad Concept
            </h3>
            <p className="text-gray-600">
              Total Duration: <span className="font-semibold">{currentConcept.totalDuration}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentConcept.scenes.map((scene: any, index: number) => (
              <SceneCard key={scene.id} scene={scene} index={index} />
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Production Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Plan your transitions between scenes for smooth flow</li>
              <li>• Consider lighting consistency across all shots</li>
              <li>• Prepare props and locations in advance</li>
              <li>• Test camera angles before final recording</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
