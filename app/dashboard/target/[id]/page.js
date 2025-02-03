
import TargetDetailPage from "app/app/components/target/detail/SectionDetailTarget";

const ProductReviews = async ({ params }) => {
  const id = (await params).id;

  return (
    <>
      <TargetDetailPage id={id} />
    </>
  );
};

export default ProductReviews;
