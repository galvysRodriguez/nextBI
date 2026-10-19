import { Suspense, lazy } from "react";
import { TitleBase } from 'app/app/components/container/Title';

const ContainerTargetStatus = lazy(() => import('app/app/components/dashboard/ContainerTargetStatus'));
const ContainerChartDashboard = lazy(() => import('app/app/components/dashboard/ContainerChartDashboard'));

const ObjectivesDashboard = ({ children }) => (
  <div className="max-w-6xl mx-auto pb-8">
    <TitleBase title="Tablero" />
    {children}
  </div>
);

export function TargetStatusSkeleton() {
  return (
    <div className="h-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse mb-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm h-28"
        >
          <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>
          <div className="h-3 w-1/3 bg-gray-300 rounded mb-2"></div>
          <div className="h-2 w-full bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function ChartDashboardSkeleton() {
  return (
    <div className="w-[80%] h-80 border m-auto border-gray-300 rounded-lg bg-gray-50 shadow-sm animate-pulse flex items-center justify-center">
      <div className="w-1/2 h-1/2 bg-gray-300 rounded" />
    </div>
  );
}

export default function Home() {
  return (
    <ObjectivesDashboard>
      <Suspense fallback={<TargetStatusSkeleton />}>
        <ContainerTargetStatus />
      </Suspense>

      <Suspense fallback={<ChartDashboardSkeleton />}>
        <ContainerChartDashboard />
      </Suspense>
    </ObjectivesDashboard>
  );
}

