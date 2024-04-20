import React, { useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../actions/cartAction";
import { Button } from "@mui/material";
import axios from "axios";
import { getProduct } from "src/actions/productAction";
import { useNavigate } from "react-router";

function App() {
  const [data, setData] = React.useState("Not Found");
  const { allProducts } = useSelector((state) => state.products);
  // console.log("all Prods", allProducts);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const addtoCart = () => {
    console.log("data", data);
    dispatch(addItemsToCart(data, 1));
  };

  const getDetails = async () => {
    const product = allProducts.find((item) => item._id === data);
    console.log("showing product details", product);
    Navigate(`/dashboard/requestinventory/inventoryitem/${product.department}/${product._id}`)
  }

  useEffect(() => {
    dispatch(getProduct("sports"));
  },[])

  return (
    <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BarcodeScannerComponent
          // width={500}
          // height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
            else setData("Not Found");
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}> QR code scanned : {data}</div>
      <div style={{display: "flex", justifyContent:"center"}}>
        <Button variant="contained" style={{ backgroundColor: "#ff7600", flex:'1', margin:"5px" }} onClick={getDetails} sx={{ mt: 2 }}>
          Get Product Details
        </Button>

        <Button variant="contained" style={{ backgroundColor: "#ff7600", flex: "1", margin:"5px" }} onClick={addtoCart} sx={{ mt: 2 }}>
          Add to Cart
        </Button>
      </div>

    </div>
  );
}

export default App;
