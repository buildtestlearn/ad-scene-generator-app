import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ConceptHistoryProps {
  onSelectConcept: (concept: any) => void;
}

export function ConceptHistory({ onSelectConcept }: ConceptHistoryProps) {
  const userConcepts = useQuery(api.adScenes.getUserAdConcepts);

  if (!userConcepts || userConcepts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No previous concepts found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Concepts</h3>
      <div className="space-y-3">
        {userConcepts.map((concept) => (
          <div
            key={concept._id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectConcept(concept)}
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{concept.productName}</h4>
              <p className="text-sm text-gray-600 truncate max-w-md">
                {concept.productDescription}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(concept._creationTime).toLocaleDateString()} • {concept.scenes.length} scenes
              </p>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              View →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
