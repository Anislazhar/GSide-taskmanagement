interface Props {
  birthdate: string;
  setBirthdate: (value: string) => void;
  onSave: () => void;
}

export default function BirthdateForm({
  birthdate,
  setBirthdate,
  onSave,
}: Props) {
  return (
    <div className="mt-6">
      <p className="text-sm text-gray-600 mb-1">
        Update or fulfill the birthdate
      </p>
      <div className="flex gap-3">
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
