import { Suspense } from "react";
import TargetDetailPage, { LoadingSkeletonDetail } from "app/app/components/target/detail/SectionDetailTarget";

import { apiRequest } from "app/app/components/api/apiRequest";
import { API_ROUTES } from "app/app/components/api/routes";
import { ChartDetailTarget } from "app/app/components/target/detail/ChartDetailTarget";

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
  const detailResponse  = await fetchDataFromServer(id)

  const {title, optimal, tolerable, deficient} = detailResponse.data;

  return (
    <>
      <TargetDetailPage targetData={detailResponse.data} /> 
      <ChartDetailTarget
        id={id}
        title={title}
        optimal={optimal}
        tolerable={tolerable}
        deficient={deficient}
      ></ChartDetailTarget>
    </>
     )
};

export async function fetchDataFromServer(id) {
    return await apiRequest({
      endpoint: API_ROUTES.TARGETS.detail(id), 
      method: "GET",
    });
}





