import { FeeList } from '../../components/fees/FeeList';

export function FeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Fees</h1>
      </div>
      <FeeList />
    </div>
  );
}