interface Scene {
  id: string;
  title: string;
  description: string;
  cameraAngle: string;
  duration: string;
  beats: string[];
}

interface SceneCardProps {
  scene: Scene;
  index: number;
}

export function SceneCard({ scene, index }: SceneCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold">
            Scene {index + 1}: {scene.title}
          </h4>
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {scene.duration}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Visual Description</h5>
          <p className="text-gray-600 text-sm leading-relaxed">{scene.description}</p>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Camera Angle</h5>
          <p className="text-gray-600 text-sm">{scene.cameraAngle}</p>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Key Beats</h5>
          <ul className="space-y-1">
            {scene.beats.map((beat, beatIndex) => (
              <li key={beatIndex} className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                <span>{beat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
