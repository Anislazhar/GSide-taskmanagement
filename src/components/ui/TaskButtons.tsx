interface Props {
  onValidate: () => void;
  onEscalate: () => void;
  onSkip: () => void;
}

export default function TaskButtons({ onValidate, onEscalate, onSkip }: Props) {
  return (
    <div className="mt-6 flex flex-col md:flex-row justify-end gap-3">
      <button
        className="px-6 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 flex-1 md:flex-none transition"
        onClick={onValidate}
      >
        Validate (Done)
      </button>
      <button
        className="px-6 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 flex-1 md:flex-none transition"
        onClick={onEscalate}
      >
        Escalate
      </button>
      <button
        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-400 flex-1 md:flex-none transition"
        onClick={onSkip}
      >
        Skip
      </button>
    </div>
  );
}
