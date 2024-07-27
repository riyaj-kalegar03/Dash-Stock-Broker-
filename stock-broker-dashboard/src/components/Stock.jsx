import "./stock.css";

function Stock({ stock, price }) {
  return (
    <div className="sub-stocks">
      {stock}
      {price ? (
        price > 0 ? (
          <span className="price">${price.toFixed(2)}</span>
        ) : (
          <span className="negative-price">${price.toFixed(2)}</span>
        )
      ) : (
        <span className="price">Loading...</span>
      )}
    </div>
  );
}

export default Stock;
