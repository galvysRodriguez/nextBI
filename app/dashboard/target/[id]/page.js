import { Suspense } from "react";
import TargetDetailPage, { LoadingSkeletonDetail } from "app/app/components/target/detail/SectionDetailTarget";
import Progress from "app/app/components/utils/Progress";

const ProductReviews = async ({ params }) => {
  const id = (await params).id;
  
  return (
    <Suspense fallback={<LoadingSkeletonDetail />}>
      <TargetDataFetcher id={id} />
    </Suspense>
  );
};

export default ProductReviews;

const TargetDataFetcher = async ({ id }) => {
  const targetData = await fetchTargetId(id);
  return <TargetDetailPage targetData={targetData.data} />
};

async function fetchTargetId(id) {
  if (!id) return null;
  const response = await fetch(`http://localhost:8000/targets/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();

}


