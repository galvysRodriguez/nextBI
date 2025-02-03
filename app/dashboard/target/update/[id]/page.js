
const ProductReviews = async ({ params }) => {
    const id = (await params).id;
  
    return (
      <>
        <p>{ id }</p>
      </>
    );
  };
  
  export default ProductReviews;
  