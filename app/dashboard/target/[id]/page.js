import { Suspense } from "react";
import TargetDetailPage, { LoadingSkeletonDetail } from "app/app/components/target/detail/SectionDetailTarget";
import Progress from "app/app/components/utils/Progress";
import { apiRequest } from "app/app/components/api/apiRequest";
import { API_ROUTES } from "app/app/components/api/routes";

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
  const targetData = await fetchDataFromServer(id);
  return <TargetDetailPage targetData={targetData.data} />
};

export async function fetchDataFromServer(id) {
    return apiRequest({
      endpoint: API_ROUTES.TARGETS.detail(id), 
      method: "GET",
    });
}



